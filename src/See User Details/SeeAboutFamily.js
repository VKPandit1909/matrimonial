import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../Context/UserContext";
import { message } from "antd";
import LoginFirst from "../Components/LoginFirst";

class SeeAboutFamily extends React.Component {
  render() {
    console.log(this.props.details.aboutfamily, "family");

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
            <Col className="detail-title">About Our Family</Col>
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

        <Col>
          {this.props.loggedIn ? (
            this.props.details.aboutfamily === undefined ? (
              "-"
            ) : (
              this.props.details.aboutfamily
            )
          ) : (
            <LoginFirst />
          )}
        </Col>
      </Col>
    );
  }
}

export default SeeAboutFamily;
