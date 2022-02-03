import React from "react";
import LoginInsideHeader from "./LoginInsideHeader";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { message } from "antd";
import Support from "./Support";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../Context/UserContext";
import { withTranslation } from "react-i18next";
import firebaseApp from "../Service/firebase";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import Header from "./Header";

const auth = getAuth();
class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pass: "",
      prevPass: "",
      confirmPass: "",
      errors: "",
      secureCurText: true,
      securePassText: true,
      secureConPassText: true,
      notMatch: false,
      otpSent: false,
      otpVerified: false,
      otp: "",
      mobile: "",
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    const { details } = this.context;
    console.log(details.mobile, "detailss");
    this.setState({
      mobile: details.mobile,
      isLoggedIn: details.mobile === undefined ? false : true,
    });
  }

  onFinish = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (this.validate()) {
      if (this.state.isLoggedIn) {
        this.changePassword();
      } else {
        this.forgotPassword();
      }
    } else {
      this.setState({
        notMatch: true,
      });
      message.error("Passwords don't match.");
    }
  };

  changePassword() {
    fetch("http://localhost:3000/change-password", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
        password: this.state.pass,
        prevpass: this.state.prevPass,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.status, "status");
        if (data.status == "ok") {
          message.success("Password successfully updated.");
          window.location.href = "/";
        } else {
          message.error(data.error);
        }
      });
  }

  forgotPassword() {
    fetch("http://localhost:3000/forgot-password", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        mobile: this.state.mobile,
        password: this.state.pass,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.status, "status");
        if (data.status == "ok") {
          message.success("Password successfully updated.");
          window.location.href = "/";
        } else {
          message.error(data.error);
        }
      });
  }

  validate = () => {
    let isValid = true;
    const { pass, confirmPass } = this.state;
    if (typeof pass !== "undefined" && typeof confirmPass !== "undefined") {
      if (pass != confirmPass) {
        isValid = false;
        this.setState(
          {
            errors: "Passwords don't match.",
          },
          () => {
            return isValid;
          }
        );
      }
    }
    return isValid;
  };

  // OTP Verification
  configCaptcha() {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.onSignInSubmit();
        },
        defaultCountry: "IN",
      },
      auth
    );
  }

  onSignInSubmit() {
    this.configCaptcha();
    const phoneNumber = "+91" + this.state.mobile;
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        message.success("OTP has been sent to the registered mobile number.");
        // ...
      })
      .catch((error) => {
        // message.error("Error sending OTP to the registered mobile number.");
        // Error; SMS not sent
        // ...
      });
  }

  sendOTP() {
    if (this.state.isLoggedIn) {
      this.setState(
        {
          otpSent: true,
        },
        function () {
          this.onSignInSubmit();
        }
      );
    } else {
      if (this.state.mobile.length == 10) {
        this.setState(
          {
            otpSent: true,
          },
          function () {
            this.onSignInSubmit();
          }
        );
      } else {
        message.warning(
          "Please enter valid 10 digit registered mobile number."
        );
      }
    }
  }

  verifyOtp(event) {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (this.state.otp.length == 6) {
      window.confirmationResult
        .confirm(this.state.otp)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          this.setState(
            {
              otpVerified: true,
            },
            function () {
              message.success("OTP Verified Successfully.");
            }
          );
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          message.warning("Please input valid OTP.");
        });
    } else {
      message.warning("Please input valid OTP.");
    }
  }

  render() {
    return (
      <>
        {this.state.isLoggedIn ? <LoginInsideHeader /> : <Header />}
        <Container>
          <Row>
            <Col lg={this.state.isLoggedIn ? 9 : 12}>
              <Col className="security-title mt-3" lg={12}>
                Reset Password
              </Col>
              {!this.state.otpVerified ? (
                <Col lg={12} className="mt-3" className="security-cont">
                  <Col>
                    <h3>You have requested to reset your password</h3>
                    <p>
                      We cannot simply send you your old password. Click on the
                      send otp button below and verify the otp to change the
                      password
                    </p>
                    {this.state.otpSent ? (
                      <Form
                        onSubmit={(e) => {
                          this.verifyOtp(e);
                        }}
                      >
                        <div id="sign-in-button"></div>
                        <Form.Group
                          as={Row}
                          controlId="new-pas"
                          className="security-form"
                        >
                          <Col lg="3">
                            <Form.Label className="security-label">
                              Enter OTP
                            </Form.Label>
                          </Col>
                          <Col lg="9" style={{ position: "relative" }}>
                            <Form.Control
                              required
                              type={"number"}
                              placeholder="OTP Number"
                              className="security-input"
                              value={this.state.otp}
                              onChange={(e) =>
                                this.setState({
                                  otp: e.target.value,
                                })
                              }
                            />
                          </Col>
                        </Form.Group>
                        <Button type="submit">Verify OTP</Button>
                      </Form>
                    ) : (
                      <>
                        {this.state.isLoggedIn ? null : (
                          <Form.Group
                            as={Row}
                            controlId="new-pas"
                            className="security-form"
                          >
                            <Col lg="3">
                              <Form.Label className="security-label">
                                Enter Mobile Number
                              </Form.Label>
                            </Col>
                            <Col lg="9" style={{ position: "relative" }}>
                              <Form.Control
                                required
                                type={"number"}
                                placeholder="Mobile Number"
                                className="security-input"
                                maxLength={10}
                                value={this.state.mobile}
                                onChange={(e) =>
                                  this.setState({
                                    mobile: e.target.value,
                                  })
                                }
                              />
                            </Col>
                          </Form.Group>
                        )}
                        <Button type="submit" onClick={() => this.sendOTP()}>
                          Send OTP
                        </Button>
                      </>
                    )}
                  </Col>
                </Col>
              ) : (
                <Col lg={12} className="mt-3" className="security-cont">
                  <Col>
                    <Form
                      onSubmit={(e) => {
                        this.onFinish(e);
                      }}
                    >
                      <Form.Group
                        as={Row}
                        controlId="new-pas"
                        className="security-form"
                      >
                        <Col lg="3">
                          <Form.Label className="security-label">
                            New Password
                          </Form.Label>
                        </Col>
                        <Col lg="9" style={{ position: "relative" }}>
                          <Form.Control
                            required
                            name="password"
                            type={
                              this.state.securePassText ? "password" : "text"
                            }
                            placeholder="New Password"
                            className="security-input"
                            value={this.state.pass}
                            onChange={(e) =>
                              this.setState({
                                pass: e.target.value,
                              })
                            }
                          />
                          <FontAwesomeIcon
                            icon={
                              this.state.securePassText ? faEye : faEyeSlash
                            }
                            className="icon-eye"
                            onClick={() =>
                              this.setState({
                                securePassText: !this.state.securePassText,
                              })
                            }
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        controlId="confirm-pas"
                        className="security-form"
                      >
                        <Col lg="3">
                          <Form.Label className="security-label">
                            Confirm Password
                          </Form.Label>
                        </Col>
                        <Col lg="9" style={{ position: "relative" }}>
                          <Form.Control
                            required
                            type={
                              this.state.secureConPassText ? "password" : "text"
                            }
                            name="confirm_password"
                            placeholder="Confirm Password"
                            className="security-input"
                            value={this.state.confirmPass}
                            onChange={(e) =>
                              this.setState({
                                confirmPass: e.target.value,
                              })
                            }
                          />
                          <FontAwesomeIcon
                            icon={
                              this.state.secureConPassText ? faEye : faEyeSlash
                            }
                            className="icon-eye"
                            onClick={() =>
                              this.setState({
                                secureConPassText:
                                  !this.state.secureConPassText,
                              })
                            }
                          />
                        </Col>
                      </Form.Group>
                      <Button type="submit"> Submit</Button>
                    </Form>
                  </Col>
                </Col>
              )}
            </Col>

            {this.state.isLoggedIn ? (
              <Col lg={3} md={3} sm={12} xs={12} className="mt-3">
                <Support />
              </Col>
            ) : null}
          </Row>
        </Container>
      </>
    );
  }
}
ResetPassword.contextType = UserContext;
export default withTranslation()(ResetPassword);
