import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faHeadset } from "@fortawesome/free-solid-svg-icons";
import LoginFirst from "../Components/LoginFirst";

class SeeLifeStyle extends React.Component {
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
            <FontAwesomeIcon icon={faHeadset} className="details-icon" />
            <Col className="detail-title">Life Style</Col>
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
        {this.props.loggedIn ? (
          <Row className="details-sec">
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Hobbies & Interests</Col>
              <Col className="details-sec-info">
                {this.props.details.lifestyle == undefined
                  ? "-"
                  : this.props.details.lifestyle.parthobbies == ""
                  ? "-"
                  : this.props.details.lifestyle.parthobbies.join(", ")}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Sports/Fitness Activities</Col>
              <Col className="details-sec-info">
                {this.props.details.lifestyle == undefined
                  ? "-"
                  : this.props.details.lifestyle.partsports == ""
                  ? "-"
                  : this.props.details.lifestyle.partsports.join(", ")}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Spoken Languages</Col>
              <Col className="details-sec-info">
                {this.props.details.lifestyle == undefined
                  ? "-"
                  : this.props.details.lifestyle.partlanguage == ""
                  ? "-"
                  : this.props.details.lifestyle.partlanguage.join(", ")}
              </Col>
            </Col>
          </Row>
        ) : (
          <LoginFirst />
        )}
      </Col>
    );
  }
}

export default SeeLifeStyle;
