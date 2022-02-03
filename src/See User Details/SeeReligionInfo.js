import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk } from "@fortawesome/free-solid-svg-icons";
import LoginFirst from "../Components/LoginFirst";

class SeeReligionInfo extends React.Component {
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
            <FontAwesomeIcon icon={faAsterisk} className="details-icon" />
            <Col className="detail-title">Religion Information</Col>
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
              <Col className="details-sec-title">Religion</Col>
              <Col className="details-sec-info">
                {this.props.details.religion == undefined
                  ? "-"
                  : this.props.details.religion.partreligion == ""
                  ? "-"
                  : this.props.details.religion.partreligion}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Caste/Division</Col>
              <Col className="details-sec-info">
                {this.props.details.religion == undefined
                  ? "-"
                  : this.props.details.religion.partcaste == ""
                  ? "-"
                  : this.props.details.religion.partcaste}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Sub Caste</Col>
              <Col className="details-sec-info">
                {this.props.details.religion == undefined
                  ? "-"
                  : this.props.details.religion.partsubcaste == ""
                  ? "-"
                  : this.props.details.religion.partsubcaste}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Gothra(m)</Col>
              <Col className="details-sec-info">
                {this.props.details.religion == undefined
                  ? "-"
                  : this.props.details.religion.partgothram == ""
                  ? "-"
                  : this.props.details.religion.partgothram}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Nakshatram / Star</Col>
              <Col className="details-sec-info">
                {this.props.details.religion == undefined
                  ? "-"
                  : this.props.details.religion.partnakshatram == ""
                  ? "-"
                  : this.props.details.religion.partnakshatram}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Raasi</Col>
              <Col className="details-sec-info">
                {this.props.details.religion == undefined
                  ? "-"
                  : this.props.details.religion.partrassi == ""
                  ? "-"
                  : this.props.details.religion.partrassi}
              </Col>
            </Col>

            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Kulam Temple</Col>
              <Col className="details-sec-info">
                {this.props.details.religion == undefined
                  ? "-"
                  : this.props.details.religion.partkulamtemple == ""
                  ? "-"
                  : this.props.details.religion.partkulamtemple}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Have Dosham</Col>
              <Col className="details-sec-info">
                {this.props.details.religion == undefined
                  ? "-"
                  : this.props.details.religion.parthavedosham == ""
                  ? "-"
                  : this.props.details.religion.parthavedosham}
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

export default SeeReligionInfo;
