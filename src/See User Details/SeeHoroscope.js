import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarOfDavid } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../Context/UserContext";
import { message } from "antd";
import LoginFirst from "../Components/LoginFirst";

class SeeHoroscope extends React.Component {
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
            <FontAwesomeIcon icon={faStarOfDavid} className="details-icon" />
            <Col className="detail-title">Horoscope</Col>
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
              <Col className="details-sec-title">Birth Time</Col>
              <Col className="details-sec-info">
                {this.props.details.horoscope == undefined
                  ? "-"
                  : this.props.details.horoscope.birthtime == ""
                  ? "-"
                  : this.props.details.horoscope.birthtime}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Birth Place</Col>
              <Col className="details-sec-info">
                {this.props.details.horoscope == undefined
                  ? "-"
                  : this.props.details.horoscope.birthplace == ""
                  ? "-"
                  : this.props.details.horoscope.birthplace}
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

export default SeeHoroscope;
