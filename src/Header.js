import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      password: "",
      validated: false,
    };
  }

  handleSubmit = (event) => {
    const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
    // }
    this.setState({ validated: true });
  };

  render() {
    return (
      <Container className="p-3">
        <Row>
          <Col>
            <div align="left">
              <h1>
                Matrimonial
                <span className="lang_text">Tamil</span>
                <span className="lang_text">English</span>
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
                <Form.Group controlId="validationFormikMobile" className="mr-10">
                  <Form.Control
                    required
                    type="text"
                    aria-required="hello"
                    placeholder="Mobile"
                    value={this.state.mobile}
                    onChange={(e) => {
                      this.setState({ mobile: e.target.value });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter Mobile
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationFormikPassword" className="mr-10">
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={(e) => {
                      this.setState({ password: e.target.value });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter Password
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationFormikSubmit">
                  <Button type="submit">Login</Button>
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Header;
