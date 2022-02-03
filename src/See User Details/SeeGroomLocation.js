import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import LoginFirst from "../Components/LoginFirst";

class SeeGroomLocation extends React.Component {
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
            <FontAwesomeIcon icon={faMapMarkerAlt} className="details-icon" />
            <Col className="detail-title">Groom Location</Col>
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
              <Col className="details-sec-title">Country</Col>
              <Col className="details-sec-info">
                {this.props.details.location == undefined
                  ? "-"
                  : this.props.details.location.partcountry == ""
                  ? "-"
                  : this.props.details.location.partcountry}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">State</Col>
              <Col className="details-sec-info">
                {this.props.details.location == undefined
                  ? "-"
                  : this.props.details.location.partstate == ""
                  ? "-"
                  : this.props.details.location.partstate}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">City</Col>
              <Col className="details-sec-info">
                {this.props.details.location == undefined
                  ? "-"
                  : this.props.details.location.partcity == ""
                  ? "-"
                  : this.props.details.location.partcity}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Address</Col>
              <Col className="details-sec-info">
                {this.props.details.location == undefined
                  ? "-"
                  : this.props.details.location.partaddress == ""
                  ? "-"
                  : this.props.details.location.partaddress}
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

export default SeeGroomLocation;
