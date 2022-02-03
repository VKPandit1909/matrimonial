import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../Context/UserContext";
import { message } from "antd";

class AboutU extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.changeSection = this.changeSection.bind(this);
    this.state = {
      showForm: false,
      about: null,
      validated: false,
    };
  }
  changeSection() {
    this.setState({ showForm: !this.state.showForm });
    console.log("clicked");
  }

  handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      this.setState({ validated: true });
    } else {
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
            about: this.state.about,
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          message.success("Data Saved Successfully.");

          this.changeSection();
        });
    }
  };
  componentDidMount() {
    const { details } = this.context;
    console.log(details, "compound");
    if (details == "" || details == null || details == undefined) {
    } else {
      this.setState({
        about: details.about == undefined ? "" : details.about,
      });
    }
  }

  render() {
    const AbouSection = (
      <Col className="about_text">
        {this.state.about == "" ? "-" : this.state.about}
      </Col>
    );
    const AboutForm = (
      <Form
        className="details-form"
        noValidate
        validated={this.state.validated}
        onSubmit={(e) => {
          this.handleSubmit(e);
        }}
      >
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            required
            as="textarea"
            rows={3}
            value={this.state.about}
            onChange={(e) => {
              this.setState({ about: e.target.value });
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
            <FontAwesomeIcon icon={faUserTie} className="details-icon" />
            <Col className="detail-title">About You</Col>
          </Col>
          <Col
            lg={2}
            md={4}
            sm={6}
            xs={6}
            align="right"
            className="details-edit-button"
          >
            <Button
              onClick={() => {
                this.changeSection();
              }}
            >
              Edit
            </Button>
          </Col>
        </Row>

        {this.state.showForm ? AboutForm : AbouSection}
      </Col>
    );
  }
}
AboutU.contextType = UserContext;
export default AboutU;
