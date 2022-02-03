import React from "react";
import "../App.css";
import { Container, Col } from "react-bootstrap";
import LoginInsideHeader from "./LoginInsideHeader";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretRight,
  faEnvelope,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";

class ContactUs extends React.Component {
  render() {
    return (
      <>
        <LoginInsideHeader />
        <Container>
          <Col className="about-title">Contact Us</Col>
          <Col className="contact-con">
            Customer support is our top priority. Our dedicated support team is
            striving to offer the best Quality, Value and Service to meet our
            customers needs.
          </Col>
          <Col className="con-div">
            <Col className="contactUs-div">
              <Col className="con-inner">
                <Col className="con-in-title">
                  {" "}
                  <FontAwesomeIcon
                    icon={faPhoneAlt}
                    className="con-icon"
                  />{" "}
                  Call Us
                </Col>
                <Col className="con-in">+91-7449060000</Col>
                <Col className="con-sup">
                  (Customer Support - 9.30 am to 06.30 pm IST)
                </Col>
              </Col>
            </Col>
            <Col className="con-inner1">
              <Col className="con-inner">
                <Col className="con-in-title">
                  {" "}
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="con-icon"
                  />{" "}
                  Mail Us
                </Col>
                <Col className="con-mail">gkmatrimonytup@gmail.com</Col>
              </Col>
            </Col>
          </Col>
        </Container>
        <Col style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <Footer />
        </Col>
      </>
    );
  }
}

export default ContactUs;
