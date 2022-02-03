import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import LoginFirst from "../Components/LoginFirst";

class SeeAboutU extends React.Component {
  render() {
    return (
      <Col className="details-main mt-4">
        <Row className="details-head">
          <Col
            lg={10}
            md={8}
            sm={6}
            xs={6}
            align="left"
            className="details-header"
          >
            <FontAwesomeIcon icon={faUserTie} className="details-icon" />
            <Col className="detail-title">About You</Col>
          </Col>
          <Col
            lg={2}
            md={4}
            sm={6}
            xs={6}
            align="right"
            className="details-edit-button"
          ></Col>
        </Row>

        <Col className="about_text">
          {this.props.loggedIn ? (
            this.props.details.about == "" ||
            this.props.details.about == undefined ? (
              "-"
            ) : (
              this.props.details.about
            )
          ) : (
            <LoginFirst />
          )}
        </Col>
      </Col>
    );
  }
}

export default SeeAboutU;
