import React from "react";
import { Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  
  faUserLock,
} from "@fortawesome/free-solid-svg-icons";

class LoginFirst extends React.Component {
  render() {
    return (
      <Col>
        <Col
          style={{ display: "flex", justifyContent: "center", paddingTop: 10 }}
        > <a href="/">
          <FontAwesomeIcon
            icon={faUserLock}
            style={{ fontSize: 60, color: "#0095ff" }}
          />
          </a>
        </Col>
        <Col
          style={{ display: "flex", justifyContent: "center", paddingTop: 10 }}
        >
          <a href="/">Register / Login to view details </a>
        </Col>
      </Col>
    );
  }
}

export default LoginFirst;
