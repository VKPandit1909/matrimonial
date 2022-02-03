import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faUsers } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import UserContext from "../Context/UserContext";
import { message } from "antd";
import LoginFirst from "../Components/LoginFirst";

class SeeFamilyDetails extends React.Component {
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
            <FontAwesomeIcon icon={faUsers} className="details-icon" />
            <Col className="detail-title">Family Details</Col>
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
              <Col className="details-sec-title">Father's Name</Col>
              <Col className="details-sec-info">
                {this.props.details.family == undefined
                  ? "-"
                  : this.props.details.family.partfathername == ""
                  ? "-"
                  : this.props.details.family.partfathername}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Mother's Name</Col>
              <Col className="details-sec-info">
                {this.props.details.family == undefined
                  ? "-"
                  : this.props.details.family.partmothername == ""
                  ? "-"
                  : this.props.details.family.partmothername}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Family Values</Col>
              <Col className="details-sec-info">
                {this.props.details.family == undefined
                  ? "-"
                  : this.props.details.family.partfamilyvalues == ""
                  ? "-"
                  : this.props.details.family.partfamilyvalues}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Family Type</Col>
              <Col className="details-sec-info">
                {this.props.details.family == undefined
                  ? "-"
                  : this.props.details.family.partfamilytype == ""
                  ? "-"
                  : this.props.details.family.partfamilytype}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Family Status</Col>
              <Col className="details-sec-info">
                {this.props.details.family == undefined
                  ? "-"
                  : this.props.details.family.partfamilystatus == ""
                  ? "-"
                  : this.props.details.family.partfamilystatus}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Family Location</Col>
              <Col className="details-sec-info">
                {this.props.details.family == undefined
                  ? "-"
                  : this.props.details.family.partresidingcity == ""
                  ? "-"
                  : this.props.details.family.partresidingcity}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">No of Brother(s)</Col>
              <Col className="details-sec-info">
                {this.props.details.family == undefined
                  ? "-"
                  : this.props.details.family.partnoofbrother == ""
                  ? "-"
                  : this.props.details.family.partnoofbrother}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">No of Sister(s)</Col>
              <Col className="details-sec-info">
                {this.props.details.family == undefined
                  ? "-"
                  : this.props.details.family.partnoofsister == ""
                  ? "-"
                  : this.props.details.family.partnoofsister}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Father's Status</Col>
              <Col className="details-sec-info">
                {this.props.details.family == undefined
                  ? "-"
                  : this.props.details.family.partfatherstatus == ""
                  ? "-"
                  : this.props.details.family.partfatherstatus}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Mother's Status</Col>
              <Col className="details-sec-info">
                {this.props.details.family == undefined
                  ? "-"
                  : this.props.details.family.partmotherstatus == ""
                  ? "-"
                  : this.props.details.family.partmotherstatus}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Own House</Col>
              <Col className="details-sec-info">
                {this.props.details.family == undefined
                  ? "-"
                  : this.props.details.family.partownhouse == ""
                  ? "-"
                  : this.props.details.family.partownhouse}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Land(Acres)</Col>
              <Col className="details-sec-info">
                {this.props.details.family == undefined
                  ? "-"
                  : this.props.details.family.partland == ""
                  ? "-"
                  : this.props.details.family.partland}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Approximate Assets(Lakhs)</Col>
              <Col className="details-sec-info">
                {this.props.details.family == undefined
                  ? "-"
                  : this.props.details.family.partassets == ""
                  ? "-"
                  : this.props.details.family.partassets}
              </Col>
            </Col>
            <Col lg={3} className="details-sec-content">
              <Col className="details-sec-title">Address</Col>
              <Col className="details-sec-info">
                {this.props.details.family == undefined
                  ? "-"
                  : this.props.details.family.partaddress == ""
                  ? "-"
                  : this.props.details.family.partaddress}
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

export default SeeFamilyDetails;
