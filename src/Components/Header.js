import React, { Component } from "react";
import "../App.css";
import logo from "../logo.png.png";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { message } from "antd";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      password: "",
      validated: false,
      loggedIn: false,
      data: [],
    };
  }

  handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      this.setState({ validated: true });
    } else {
      fetch("http://localhost:3000/login", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          mobile: this.state.mobile,
          password: this.state.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "any");
          console.log(data.status, "status");
          if (data.status == "ok") {
            window.localStorage.setItem("token", data.data);
            window.localStorage.setItem("isLoggedIn", true);
            message.success("Login Successful");
            window.location.href = "/userprofile";
            // this.props.history.push("/content");
          } else if(data.status == "warning") {
            console.log(data.data);
            message.warning(
              "Registration Completed. Contact admin for further more process"
            );
          } else {
            message.error("Invalid Mobile/Password.");
          }
        });
    }
  };

  componentDidMount() {
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
    window.googleTranslateElementInit = this.googleTranslateElementInit;
  }

  googleTranslateElementInit() {
    /* eslint-disable no-new */
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        layout: window.google.translate.TranslateElement.FloatPosition.TOP_LEFT,
      },
      "google_translate_element"
    );
    var flags = document.getElementsByClassName("flag_link");

    Array.prototype.forEach.call(flags, function (e) {
      e.addEventListener("click", function () {
        var lang = e.getAttribute("data-lang");
        var languageSelect = document.querySelector("select.goog-te-combo");
        languageSelect.value = lang;
        languageSelect.dispatchEvent(new Event("change"));
        window.localStorage.setItem("localLang",lang);
      });
    });
  }

  render() {
    return (
      // <div>
      <div className="header">
        <Container className="p-3">
          <Row>
            <Col>
              <div id="google_translate_element"></div>
              <div align="left" className="flag">
                <h1>
                  <img src={logo} height="40" width="65" />
                  <div className="flag" style={{ display: "inline-block" }}>
                    <a href="#" className="flag_link en" data-lang="en">
                      <span className="lang_text"> English</span>
                    </a>

                    <a
                      href="#"
                      className="flag_link ta"
                      data-lang="ta"
                      id="myCheck"
                    >
                      <span className="lang_text"> Tamil</span>
                    </a>
                  </div>
                </h1>
              </div>
            </Col>
            <Col className="flex_center">
              <div align="right">
                <Form
                  className="flex_center"
                  noValidate
                  validated={this.state.validated}
                  onSubmit={(e) => {
                    this.handleSubmit(e);
                  }}
                >
                  <Form.Group
                    controlId="validationFormikMobile"
                    className="mr-10"
                  >
                    <Form.Control
                      required
                      type="text"
                      aria-required="mobile"
                      placeholder="Mobile"
                      value={this.state.mobile}
                      onChange={(e) => {
                        this.setState({ mobile: e.target.value });
                      }}
                    />
                    {/* <Form.Control.Feedback tooltip>
                        Please Enter Mobile
                      </Form.Control.Feedback> */}
                  </Form.Group>
                  <Form.Group
                    controlId="validationFormikPassword"
                    className="mr-10"
                  >
                    <Form.Control
                      required
                      type="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={(e) => {
                        this.setState({ password: e.target.value });
                      }}
                    />
                    {/* <Form.Control.Feedback tooltip>
                        Please Enter Password
                      </Form.Control.Feedback> */}
                  </Form.Group>
                  <Form.Group controlId="validationFormikSubmit">
                    <Button type="submit">Login</Button>
                  </Form.Group>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      //   <Form2 />
      //   <Content />
      // </div>
    );
  }
}

export default Header;
