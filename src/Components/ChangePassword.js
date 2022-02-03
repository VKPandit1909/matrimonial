import React from "react";
import LoginInsideHeader from "./LoginInsideHeader";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { message } from "antd";
import Support from "./Support";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

class ChangePassword extends React.Component {
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
    };
  }
  onFinish = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (this.validate()) {
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
    } else {
      this.setState({
        notMatch: true,
      });
      message.error("Passwords don't match.");
    }
  };

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

  render() {
    return (
      <>
        <LoginInsideHeader />
        <Container>
          <Row>
            <Col lg={9}>
              <Col className="security-title mt-3" lg={12}>
                Change Password
              </Col>
              <Col lg={12} className="mt-3" className="security-cont">
                <Col>
                  <Form
                    onSubmit={(e) => {
                      this.onFinish(e);
                    }}
                  >
                    <Form.Group
                      as={Row}
                      controlId="cur-pas"
                      className="security-form"
                    >
                      <Col lg="3">
                        <Form.Label className="security-label">
                          Current Password
                        </Form.Label>
                      </Col>
                      <Col lg="9" style={{ position: "relative" }}>
                        <Form.Control
                          lg="8"
                          required
                          type={this.state.secureCurText ? "password" : "text"}
                          placeholder="Current Password"
                          className="security-input"
                          value={this.state.prevPass}
                          onChange={(e) =>
                            this.setState({
                              prevPass: e.target.value,
                            })
                          }
                        />
                        <FontAwesomeIcon
                          icon={this.state.secureCurText ? faEye : faEyeSlash}
                          className="icon-eye"
                          onClick={() =>
                            this.setState({
                              secureCurText: !this.state.secureCurText,
                            })
                          }
                        />
                      </Col>
                    </Form.Group>
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
                          type={this.state.securePassText ? "password" : "text"}
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
                          icon={this.state.securePassText ? faEye : faEyeSlash}
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
                              secureConPassText: !this.state.secureConPassText,
                            })
                          }
                        />
                      </Col>
                    </Form.Group>
                    <Button type="submit"> Submit</Button>
                  </Form>
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
export default ChangePassword;
