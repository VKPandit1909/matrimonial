import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { message } from "antd";

class SeeBasicDetails extends React.Component {
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
            <FontAwesomeIcon icon={faIdCard} className="details-icon" />
            <Col className="detail-title">Basic Details</Col>
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
        <Row className="details-sec">
          <Col lg={3} className="details-sec-content">
            <Col className="details-sec-title">Name</Col>
            <Col className="details-sec-info">
              {this.props.details.name == "" ? "-" : this.props.details.name}
            </Col>
          </Col>
          <Col lg={3} className="details-sec-content">
            <Col className="details-sec-title">Body Type</Col>
            <Col className="details-sec-info">
              {this.props.details.basic == undefined
                ? "-"
                : this.props.details.basic.btype == ""
                ? "-"
                : this.props.details.basic.btype}
            </Col>
          </Col>
          <Col lg={3} className="details-sec-content">
            <Col className="details-sec-title">Age</Col>
            <Col className="details-sec-info">
              {/* {this.state.udob == "" ? "-" : this.state.udob} */}
              {this.props.details.basic == undefined
                ? "-"
                : this.props.details.basic.age == ""
                ? "-"
                : this.props.details.basic.age}
            </Col>
          </Col>
          <Col lg={3} className="details-sec-content">
            <Col className="details-sec-title">Complexion</Col>
            <Col className="details-sec-info">
              {this.props.details.basic == undefined
                ? "-"
                : this.props.details.basic.complexion == ""
                ? "-"
                : this.props.details.basic.complexion}
            </Col>
          </Col>
          <Col lg={3} className="details-sec-content">
            <Col className="details-sec-title">Height</Col>
            <Col className="details-sec-info">
              {this.props.details.basic == undefined
                ? "-"
                : this.props.details.basic.height == ""
                ? "-"
                : this.props.details.basic.height}
            </Col>
          </Col>
          <Col lg={3} className="details-sec-content">
            <Col className="details-sec-title">Weight</Col>
            <Col className="details-sec-info">
              {this.props.details.basic == undefined
                ? "-"
                : this.props.details.basic.weight == ""
                ? "-"
                : this.props.details.basic.weight}
            </Col>
          </Col>
          <Col lg={3} className="details-sec-content">
            <Col className="details-sec-title">Physical Status</Col>
            <Col className="details-sec-info">
              {this.props.details.basic == undefined
                ? "-"
                : this.props.details.basic.physicalstatus == ""
                ? "-"
                : this.props.details.basic.physicalstatus}
            </Col>
          </Col>
          <Col lg={3} className="details-sec-content">
            <Col className="details-sec-title">Eating Habits</Col>
            <Col className="details-sec-info">
              {this.props.details.basic == undefined
                ? "-"
                : this.props.details.basic.eating == ""
                ? "-"
                : this.props.details.basic.eating}
            </Col>
          </Col>
          <Col lg={3} className="details-sec-content">
            <Col className="details-sec-title">Mother Tongue</Col>
            <Col className="details-sec-info">
              {this.props.details.basic == undefined
                ? "-"
                : this.props.details.basic.mtongue == ""
                ? "-"
                : this.props.details.basic.mtongue}
            </Col>
          </Col>
          <Col lg={3} className="details-sec-content">
            <Col className="details-sec-title">Marital Status</Col>
            <Col className="details-sec-info">
              {this.props.details.basic == undefined
                ? "-"
                : this.props.details.basic.married == ""
                ? "-"
                : this.props.details.basic.married}
            </Col>
          </Col>
          <Col lg={3} className="details-sec-content">
            <Col className="details-sec-title">Drinking Habits</Col>
            <Col className="details-sec-info">
              {this.props.details.basic == undefined
                ? "-"
                : this.props.details.basic.drinking == ""
                ? "-"
                : this.props.details.basic.drinking}
            </Col>
          </Col>
          <Col lg={3} className="details-sec-content">
            <Col className="details-sec-title">Smoking Habits</Col>
            <Col className="details-sec-info">
              {this.props.details.basic == undefined
                ? "-"
                : this.props.details.basic.smoking == ""
                ? "-"
                : this.props.details.basic.smoking}
            </Col>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default SeeBasicDetails;
