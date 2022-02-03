import React from "react";
import LoginInsideHeader from "./LoginInsideHeader";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { message } from "antd";
import Support from "./Support";
import UserContext from "../Context/UserContext";
import { withTranslation } from "react-i18next";
import firebaseApp from "../Service/firebase";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const auth = getAuth();
class OTPVerification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otpSent: false,
      otp: "",
      mobile: "",
    };
  }

  componentDidMount() {
    const { details } = this.context;
    console.log(details, "detailss");
    this.setState({
      mobile: "+91" + details.mobile,
    });
  }

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
    const phoneNumber = this.state.mobile;
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
    this.setState(
      {
        otpSent: true,
      },
      function () {
        this.onSignInSubmit();
      }
    );
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
          this.setState({}, function () {
            message.success("OTP Verified Successfully.");
          });
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
        {/* <LoginInsideHeader /> */}
        <Container>
          <Row>
            <Col lg={9}>
              <Col className="security-title mt-3" lg={12}>
                Verify OTP
              </Col>
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
                    <Button type="submit" onClick={() => this.sendOTP()}>
                      Send OTP
                    </Button>
                  )}
                </Col>
              </Col>
            </Col>

            <Col lg={3} md={3} sm={12} xs={12} className="mt-3">
              <Support />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
OTPVerification.contextType = UserContext;
export default withTranslation()(OTPVerification);
