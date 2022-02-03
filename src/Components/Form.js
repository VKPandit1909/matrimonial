import "../App.css";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Col, Card, Button } from "react-bootstrap";
import { message } from "antd";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      gender: "",
      caste: "Kurumbhar",
      email: "",
      mobile: "",
      password: "",
      validated: false,
      loggedIn: false,
      data: null,
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/")
      .then((res) => res.json())
      .then((results) => {
        this.setState({
          data: results,
        });
        console.log(this.state.data, "cons");
      });
  }

  handleRegiser = (event) => {
    const form = event.currentTarget;
    console.log(this.state.gender);
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      this.setState({ validated: true });
    } else {
      fetch("http://localhost:3000/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name: this.state.name,
          gender: this.state.gender,
          caste: this.state.caste,
          email: this.state.email,
          password: this.state.password,
          mobile: this.state.mobile,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "ok") {
            alert("Registered Successfully.");
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
                  window.localStorage.setItem("isLoggedIn", true);
                  window.localStorage.setItem("token", data.data);
                  fetch("http://localhost:3000/user-details", {
                    method: "POST",
                    crossDomain: true,
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json",
                      "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({
                      token: window.localStorage.getItem("token"),
                    }),
                  })
                    .then((res) => res.json())
                    .then((results) => {
                      console.log(results, "res");

                      console.log(this.state.data, "hiii");
                      if (results.data.type == "free") {
                        message.success(
                          "Registration Completed. Contact admin for further more process"
                        );
                      } else {
                        message.success("Login Successful");
                        window.location.href = "/userprofile";
                      }
                    });
                } else {
                  console.log("hlo");
                }
              });
          } else {
            alert(data.error);
          }
        });
    }
  };

  validatePhoneNumber(input_str) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(input_str);
  }

  render() {
    return (
      <Row className="bg_img">
        <Col md={6}></Col>
        <Col md={5}>
          <Card className="register_card">
            <Form
              id="id_form"
              validated={this.state.validated}
              onSubmit={(e) => {
                this.handleRegiser(e);
              }}
            >
              <Form.Group as={Row} className="mb-3" controlId="name">
                <Form.Label column sm="4" align="right">
                  Name
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    required
                    type="text"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={(e) => {
                      this.setState({ name: e.target.value });
                    }}
                    pattern="^[A-Za-z -]+$"
                    title="Only alphabates allowed."
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="gender">
                <Form.Label column sm="4" align="right">
                  Gender
                </Form.Label>
                <Col sm="8">
                  <Form.Check
                    required
                    inline
                    label="Male"
                    name="group1"
                    value="Male"
                    onChange={(e) => {
                      this.setState({ gender: e.target.value });
                    }}
                    type="radio"
                    id={`inline-radio-1`}
                  />
                  <Form.Check
                    required
                    inline
                    label="Female"
                    name="group1"
                    value="Female"
                    onChange={(e) => {
                      this.setState({ gender: e.target.value });
                    }}
                    type="radio"
                    id={`inline-radio-2`}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="caste">
                <Form.Label column sm="4" align="right">
                  Caste/Division
                </Form.Label>
                <Col sm="8">
                  <Form.Select
                    aria-label="Default select example"
                    required
                    value={this.state.caste}
                    onChange={(e) => {
                      this.setState({ caste: e.target.value });
                    }}
                  >
                    <option value="Kurumbhar">Kurumbhar</option>
                    <option value="Kurumbhar-2">Kurumbhar-2</option>
                    <option value="Kurumbhar-3">Kurumbhar-3</option>
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="email">
                <Form.Label column sm="4" align="right">
                  Email
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    required
                    type="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={(e) => {
                      this.setState({ email: e.target.value });
                    }}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Enter Valid Email Address"
                  />
                </Col>
              </Form.Group>
              <Form.Group controlId="mobile" as={Row} className="mb-3">
                <Form.Label column sm="4" align="right">
                  Mobile
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    required
                    placeholder="Mobile"
                    value={this.state.mobile}
                    onChange={(e) => {
                      this.setState({ mobile: e.target.value });
                    }}
                    pattern="[2-9]{1}[0-9]{9}"
                    title="Phone number with 2-9 and remaing 9 digit with 0-9"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="password">
                <Form.Label column sm="4" align="right">
                  Password
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={(e) => {
                      this.setState({ password: e.target.value });
                    }}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                  />
                </Col>
              </Form.Group>
              <Form.Group controlId="submit" align="right">
                <Button type="submit">Register Free</Button>
                <div className="policy">
                  By clicking register, I agree to the
                  <a href="terms-cond" className="mr-5" target="_blank">
                    T&amp;C
                  </a>{" "}
                  and
                  <a href="privacy-policy" className="mr-5" target="_blank">
                    Privacy Policy
                  </a>
                </div>
              </Form.Group>
            </Form>
          </Card>
        </Col>
        <Col md={1}></Col>
      </Row>
    );
  }
}
export default Register;
