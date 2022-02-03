import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../Context/UserContext";
import Select from "react-select";
import { message } from "antd";

const ResidingCity = [
  { label: "Mumbai", value: "Mumbai" },
  { label: "Chennai", value: "Chennai" },
  { label: "Hyderabad", value: "Hyderabad" },
];
class LocationPref extends React.Component {
  constructor(props) {
    super(props);
    this.changeSection = this.changeSection.bind(this);
    this.state = {
      showForm: false,
      upartcountry: [""],
      upartstate: [""],
      upartcity: [""],
    };
  }
  changeSection() {
    this.setState({ showForm: !this.state.showForm });
    console.log("clicked");
  }

  handleCity = (e) => {
    this.setState({
      upartcity: Array.isArray(e) ? e.map((x) => x.value) : [],
    });
  };

  handleSubmit = (event) => {
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
          locationprefer: {
            partcountry: this.state.upartcountry,
            partstate: this.state.upartstate,
            partcity: this.state.upartcity,
          },
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        message.success("Data Saved Successfully.");
        console.log(data, "data");
        this.changeSection();
      });
  };

  componentDidMount() {
    const { locationPrefer } = this.context;
    if (
      locationPrefer == "" ||
      locationPrefer == null ||
      locationPrefer == undefined
    ) {
    } else {
      this.setState({
        upartcountry:
          locationPrefer.partcountry == undefined
            ? ""
            : locationPrefer.partcountry,
        upartstate:
          locationPrefer.partstate == undefined ? "" : locationPrefer.partstate,
        upartcity:
          locationPrefer.partcity == undefined ? "" : locationPrefer.partcity,
      });
    }
  }

  render() {
    const LocationpreferDetails = (
      <Row className="details-sec">
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Country</Col>
          <Col className="details-sec-info">
            {this.state.upartcountry == "" ? "-" : this.state.upartcountry}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Residing State</Col>
          <Col className="details-sec-info">
            {this.state.upartstate == "" ? "-" : this.state.upartstate}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Residing City / District</Col>
          <Col className="details-sec-info">
            {this.state.upartcity == "" ? "-" : this.state.upartcity.join(", ")}
          </Col>
        </Col>
      </Row>
    );
    const LocationpreferForm = (
      <Form
        className="details-form"
        onSubmit={(e) => {
          this.handleSubmit(e);
        }}
      >
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="upartcountry"
        >
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Country
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8">
            <Form.Control
              className="detail-form-input "
              required
              type="text"
              name="upartcontrol"
              placeholder=" Country"
              value={this.state.upartcountry}
              onChange={(e) => {
                this.setState({ upartcountry: e.target.value });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="upartstate"
        >
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Partner State
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8">
            <Form.Control
              className="detail-form-input "
              required
              type="text"
              name="upartstate"
              placeholder="State "
              value={this.state.upartstate}
              onChange={(e) => {
                this.setState({ upartstate: e.target.value });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="upartcity"
        >
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Parter City/District
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8">
            <Select
              isMulti
              className="detail-multiselect-input2"
              options={ResidingCity}
              isSearchable={true}
              value={ResidingCity.filter((obj) =>
                this.state.upartcity.includes(obj.value)
              )}
              onChange={this.handleCity}
            />
          </Col>
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
        </Form.Group>
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
            <FontAwesomeIcon icon={faMapMarkerAlt} className="details-icon" />
            <Col className="detail-title">Location Preference</Col>
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
        {this.state.showForm ? LocationpreferForm : LocationpreferDetails}
      </Col>
    );
  }
}
LocationPref.contextType = UserContext;
export default LocationPref;
