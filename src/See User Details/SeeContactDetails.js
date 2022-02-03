import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { message } from "antd";

import UserContext from "../Context/UserContext";
import LoginFirst from "../Components/LoginFirst";

class SeeContactDetails extends React.Component {
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
            <FontAwesomeIcon icon={faAddressBook} className="details-icon" />
            <Col className="detail-title">Contact Details</Col>
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
              <Col className="details-sec-title">Relationship</Col>
              <Col className="details-sec-info">
                {" "}
                {this.props.details.contact == undefined
                  ? "-"
                  : this.props.details.contact.prirelation == ""
                  ? "-"
                  : this.props.details.contact.prirelation}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Mobile</Col>
              <Col className="details-sec-info">
                {this.props.details.mobile == ""
                  ? "-"
                  : this.props.details.mobile}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">E-mail ID</Col>
              <Col className="details-sec-info">
                {this.props.details.contact == undefined
                  ? "-"
                  : this.props.details.contact.priemail == ""
                  ? "-"
                  : this.props.details.contact.priemail}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title"></Col>
              <Col className="details-sec-info"></Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Relationship</Col>
              <Col className="details-sec-info">
                {this.props.details.contact == undefined
                  ? "-"
                  : this.props.details.contact.secrelation == ""
                  ? "-"
                  : this.props.details.contact.secrelation}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Mobile</Col>
              <Col className="details-sec-info">
                {this.props.details.contact == undefined
                  ? "-"
                  : this.props.details.contact.secmobile == ""
                  ? "-"
                  : this.props.details.contact.secmobile}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">E-mail ID</Col>
              <Col className="details-sec-info">
                {this.props.details.contact == undefined
                  ? "-"
                  : this.props.details.contact.secemail == ""
                  ? "-"
                  : this.props.details.contact.secemail}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title"></Col>
              <Col className="details-sec-info"></Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Relationship</Col>
              <Col className="details-sec-info">
                {this.props.details.contact == undefined
                  ? "-"
                  : this.props.details.contact.terrelation == ""
                  ? "-"
                  : this.props.details.contact.terrelation}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Mobile</Col>
              <Col className="details-sec-info">
                {this.props.details.contact == undefined
                  ? "-"
                  : this.props.details.contact.termobile == ""
                  ? "-"
                  : this.props.details.contact.termobile}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">E-mail ID</Col>
              <Col className="details-sec-info">
                {this.props.details.contact == undefined
                  ? "-"
                  : this.props.details.contact.teremail == ""
                  ? "-"
                  : this.props.details.contact.teremail}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title"></Col>
              <Col className="details-sec-info"></Col>
            </Col>
          </Row>
        ) : (
          <LoginFirst />
        )}
      </Col>
    );
  }
}

export default SeeContactDetails;
