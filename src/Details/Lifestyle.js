import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faHeadset } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import UserContext from "../Context/UserContext";
import { message } from "antd";

const HobbiesList = [
  { label: "Cooking", value: "Cooking" },
  { label: "Painting", value: "Painting" },
  { label: "Dancing", value: "Dancing" },
  { label: "Singing", value: "Singing" },
  { label: "Nature", value: "Nature" },
  { label: "Photography", value: "Photography" },
];
const SportsList = [
  { label: "Chess", value: "Chess" },
  { label: "Carrom", value: "Carrom" },
  { label: "Cricket", value: "Cricket" },
  { label: "Badminton", value: "Badminton" },
  { label: "Football", value: "Football" },
];
const LanguageList = [
  { label: "Hindi", value: "Hindi" },
  { label: "English", value: "English" },
  { label: "Tamil", value: "Tamil" },
  { label: "Malyalam", value: "Malyalam" },
  { label: "kanad", value: "kanad" },
];

class LifeStyle extends React.Component {
  constructor(props) {
    super(props);
    this.changeSection = this.changeSection.bind(this);
    this.state = {
      showForm: false,
      uhobbies: [""],
      usports: [""],
      ulanguage: [""],
    };
  }
  changeSection() {
    this.setState({ showForm: !this.state.showForm });
    console.log("clicked");
  }
  handleChange = (e) => {
    this.setState({
      uhobbies: Array.isArray(e) ? e.map((x) => x.value) : [],
    });
  };
  handleChange2 = (e) => {
    this.setState({
      usports: Array.isArray(e) ? e.map((x) => x.value) : [],
    });
  };
  handleChange3 = (e) => {
    this.setState({
      ulanguage: Array.isArray(e) ? e.map((x) => x.value) : [],
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
          lifestyle: {
            parthobbies: this.state.uhobbies,
            partsports: this.state.usports,
            partlanguage: this.state.ulanguage,
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
    const { lifestyle } = this.context;
    if (lifestyle == "" || lifestyle == null || lifestyle == undefined) {
    } else {
      this.setState({
        uhobbies:
          lifestyle.parthobbies == undefined ? "" : lifestyle.parthobbies,
        usports: lifestyle.partsports == undefined ? "" : lifestyle.partsports,
        ulanguage:
          lifestyle.partlanguage == undefined ? "" : lifestyle.partlanguage,
      });
    }
  }

  render() {
    const LifeStyleSection = (
      <Row className="details-sec">
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Hobbies & Interests</Col>
          <Col className="details-sec-info">
            {this.state.uhobbies == "" ? "-" : this.state.uhobbies.join(", ")}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Sports/Fitness Activities</Col>
          <Col className="details-sec-info">
            {this.state.usports == "" ? "-" : this.state.usports.join(", ")}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Spoken Languages</Col>
          <Col className="details-sec-info">
            {this.state.ulanguage == "" ? "-" : this.state.ulanguage.join(", ")}
          </Col>
        </Col>
      </Row>
    );
    const LifeStyleForm = (
      <Form
        className="details-form"
        onSubmit={(e) => {
          this.handleSubmit(e);
        }}
      >
        <Form.Group as={Row} className="mb-2 input-center" controlId="uhobbies">
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Hobbies & Interests
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-multiselect-input"
              options={HobbiesList}
              isSearchable={true}
              isMulti
              value={HobbiesList.filter((obj) =>
                this.state.uhobbies.includes(obj.value)
              )}
              onChange={this.handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 input-center" controlId="usports">
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Sports Activities
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              isMulti
              className="detail-multiselect-input"
              options={SportsList}
              isSearchable={true}
              value={SportsList.filter((obj) =>
                this.state.usports.includes(obj.value)
              )}
              onChange={this.handleChange2}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="ulanguages"
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
            Spoken Languages
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              isMulti
              className="detail-multiselect-input"
              options={LanguageList}
              isSearchable={true}
              value={LanguageList.filter((obj) =>
                this.state.ulanguage.includes(obj.value)
              )}
              onChange={this.handleChange3}
            />
          </Col>
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
            <FontAwesomeIcon icon={faHeadset} className="details-icon" />
            <Col className="detail-title">Life Style</Col>
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
        {this.state.showForm ? LifeStyleForm : LifeStyleSection}
      </Col>
    );
  }
}
LifeStyle.contextType = UserContext;
export default LifeStyle;
