import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRestroom, faUserTie } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../Context/UserContext";

class WhatLooking extends React.Component {
  constructor(props) {
    super(props);
    this.changeSection = this.changeSection.bind(this);
    this.state = {
      showForm: false,
      ulookingfor: "",
    };
  }
  changeSection() {
    this.setState({ showForm: !this.state.showForm });
    console.log("clicked");
  }

  handleSubmit = (event) => {
    alert("Clicked");
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    fetch("http://localhost:3000/set-details", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
        fields: {
          lookingfor: this.state.ulookingfor,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "data");
        this.changeSection();
      });
  };

  componentDidMount() {
    const { details, basic, horoscope } = this.context;
    if (details == "" || details == null || details == undefined) {
    } else {
      this.setState({
        ulookingfor: details.lookingfor == undefined ? "" : details.lookingfor,
      });
    }
  }

  render() {
    const LookingforForm = (
      <Form
        className="details-form"
        onSubmit={(e) => {
          this.handleSubmit(e);
        }}
      >
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            rows={3}
            value={this.state.ulookingfor}
            onChange={(e) => {
              this.setState({ ulookingfor: e.target.value });
            }}
          />
        </Form.Group>
        <Col>
          <Row className="form-bottom-button">
            <Button type="submit">Save</Button>
            <Button
              className="cancel-btn"
              onClick={() => {
                this.changeSection();
              }}
            >
              Cancel
            </Button>
          </Row>
        </Col>
      </Form>
    );
    const LookingDetails = (
      <Col className="about_text">
        {this.state.ulookingfor == "" ? "-" : this.state.ulookingfor}
      </Col>
    );
    return (
      <Col className="details-main mt-4">
        <Row className="details-head">
          <Col lg={10} className="details-header">
            <FontAwesomeIcon icon={faRestroom} className="details-icon" />
            <Col className="detail-title">What I am looking for</Col>
          </Col>
          <Col lg={2} className="details-edit-button">
            <Button
              onClick={() => {
                this.changeSection();
              }}
            >
              Edit
            </Button>
          </Col>
        </Row>

        {this.state.showForm ? LookingforForm : LookingDetails}
      </Col>
    );
  }
}
WhatLooking.contextType = UserContext;
export default WhatLooking;
