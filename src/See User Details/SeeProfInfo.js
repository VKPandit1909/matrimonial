import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import LoginFirst from "../Components/LoginFirst";

class SeeProfInfo extends React.Component {
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
            <FontAwesomeIcon icon={faGraduationCap} className="details-icon" />
            <Col className="detail-title">Professional Information</Col>
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
              <Col className="details-sec-title">Education</Col>
              <Col className="details-sec-info">
                {this.props.details.professional == undefined
                  ? "-"
                  : this.props.details.professional.parteducation == ""
                  ? "-"
                  : this.props.details.professional.parteducation}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">College</Col>
              <Col className="details-sec-info">
                {this.props.details.professional == undefined
                  ? "-"
                  : this.props.details.professional.partspecialization == ""
                  ? "-"
                  : this.props.details.professional.partspecialization}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Educational Details</Col>
              <Col className="details-sec-info">
                {this.props.details.professional == undefined
                  ? "-"
                  : this.props.details.professional.parteducationaldetails == ""
                  ? "-"
                  : this.props.details.professional.parteducationaldetails}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Sector</Col>
              <Col className="details-sec-info">
                {this.props.details.professional == undefined
                  ? "-"
                  : this.props.details.professional.partsector == ""
                  ? "-"
                  : this.props.details.professional.partsector}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Industry</Col>
              <Col className="details-sec-info">
                {this.props.details.professional == undefined
                  ? "-"
                  : this.props.details.professional.partindustry == ""
                  ? "-"
                  : this.props.details.professional.partindustry}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Job Title</Col>
              <Col className="details-sec-info">
                {this.props.details.professional == undefined
                  ? "-"
                  : this.props.details.professional.partjobtitle == ""
                  ? "-"
                  : this.props.details.professional.partjobtitle}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Annual Income</Col>
              <Col className="details-sec-info">
                {this.props.details.professional == undefined
                  ? "-"
                  : this.props.details.professional.partincome == ""
                  ? "-"
                  : this.props.details.professional.partincome}
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

export default SeeProfInfo;
