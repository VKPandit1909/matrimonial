import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { message, DatePicker } from "antd";

import UserContext from "../Context/UserContext";

const marritalStatusList = [
  { label: "Single", value: "Single" },
  { label: "Married", value: "Married" },
  { label: "Unmarried", value: "Unmarried" },
  { label: "Divorced", value: "Divorced" },
  { label: "Widowed", value: "Widowed" },
];
const motherTongueList = [
  { label: "Tamil", value: "Tamil" },
  { label: "Hindi", value: "Hindi" },
  { label: "Malyalam", value: "Malyalam" },
];
const bodyTypeList = [
  { label: "Slim", value: "Slim" },
  { label: "Average", value: "Average" },
  { label: "Heavy", value: "Heavy" },
];
const complexionTypeList = [
  { label: "Fair", value: "Fair" },
  { label: "Very Fair", value: "Very Fair" },
  { label: "Wheatish", value: "Wheatish" },
  { label: "Dark", value: "Dark" },
];
const physicalTypeList = [
  { label: "Normal", value: "Normal" },

  { label: "Differently Abled", value: "Differently Abled" },
];
const eatingTypeList = [
  { label: "Vegetarian", value: "Vegetarian" },
  { label: "Non-Vegetarian", value: "Non-Vegetarian" },
  { label: "Eggetarian", value: "Eggetarian" },
];
const bloodGroupList = [
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },

  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
];
const dayList = [
  {
    label: "Sunday",
    value: "Sunday",
  },
  {
    label: "Monday",
    value: "Monday",
  },
  {
    label: "Tuesday",
    value: "Tuesday",
  },
  {
    label: "Wednesday",
    value: "Wednesday",
  },
  {
    label: "Thursday",
    value: "Thursday",
  },
  {
    label: "Friday",
    value: "Friday",
  },
  {
    label: "Saturday",
    value: "Saturday",
  },
];

const heightList = [
  { label: "140 cm ( 4ft 7in )", value: "4.7" },
  { label: "141 cm ( 4ft 8in )", value: "4.80" },
  { label: "142 cm ( 4ft 8in )", value: "4.81" },
  { label: "143 cm ( 4ft 8in )", value: "4.82" },
  { label: "144 cm ( 4ft 9in )", value: "4.90" },
  { label: "145 cm ( 4ft 9in )", value: "4.91" },
  { label: "146 cm ( 4ft 9in )", value: "4.92" },
  { label: "147 cm ( 4ft 10in )", value: "4.100" },
  { label: "148 cm ( 4ft 10in )", value: "4.101" },
  { label: "149 cm ( 4ft 11in )", value: "4.110" },
  { label: "150 cm ( 4ft 11in )", value: "4.111" },
  { label: "151 cm ( 4ft 11in )", value: "4.112" },
  { label: "152 cm ( 5ft )", value: "5.01" },
  { label: "153 cm ( 5ft  )", value: "5.02" },
  { label: "154 cm ( 5ft 1in )", value: "5.10" },
  { label: "155 cm ( 5ft 1in )", value: "5.11" },
  { label: "156 cm ( 5ft 1in )", value: "5.12" },
  { label: "157 cm ( 5ft 2in )", value: "5.20" },
  { label: "158 cm ( 5ft 2in )", value: "5.21" },
  { label: "159 cm ( 5ft 3in )", value: "5.30" },
  { label: "160 cm ( 5ft 3in )", value: "5.31" },
  { label: "161 cm ( 5ft 3in )", value: "5.32" },
  { label: "162 cm ( 5ft 4in )", value: "5.40" },
  { label: "163 cm ( 5ft 4in )", value: "5.41" },
  { label: "164 cm ( 5ft 5in )", value: "5.50" },
  { label: "165 cm ( 5ft 5in )", value: "5.51" },
  { label: "166 cm ( 5ft 5in )", value: "5.52" },
  { label: "167 cm ( 5ft 6in )", value: "5.60" },
  { label: "168 cm ( 5ft 6in )", value: "5.61" },
  { label: "169 cm ( 5ft 6in )", value: "5.62" },
  { label: "170 cm ( 5ft 7in )", value: "5.70" },
  { label: "171 cm ( 5ft 7in )", value: "5.71" },
  { label: "172 cm ( 5ft 8in )", value: "5.80" },
  { label: "173 cm ( 5ft 8in )", value: "5.81" },
  { label: "174 cm ( 5ft 9in )", value: "5.90" },
  { label: "175 cm ( 5ft 9in )", value: "5.91" },
  { label: "176 cm ( 5ft 9in )", value: "5.92" },
  { label: "177 cm ( 5ft 10in )", value: "5.100" },
  { label: "178 cm ( 5ft 10in )", value: "5.101" },
  { label: "179 cm ( 5ft 10in )", value: "5.101" },
  { label: "180 cm ( 5ft 11in )", value: "5.110" },
  { label: "181 cm ( 5ft 11in )", value: "5.111" },
  { label: "182 cm ( 6ft )", value: "6.01" },
  { label: "183 cm ( 6ft )", value: "6.02" },
  { label: "184 cm ( 6ft  )", value: "6.03" },
  { label: "185 cm ( 6ft 1in )", value: "6.10" },
  { label: "186 cm ( 6ft 1in )", value: "6.11" },
  { label: "187 cm ( 6ft 2in )", value: "6.20" },
  { label: "188 cm ( 6ft 2in )", value: "6.21" },
  { label: "189 cm ( 6ft 2in )", value: "6.22" },
  { label: "190 cm ( 6ft 3in )", value: "6.30" },
  { label: "191 cm ( 6ft 3in )", value: "6.31" },
  { label: "192 cm ( 6ft 4in )", value: "6.41" },
  { label: "193 cm ( 6ft 4in )", value: "6.42" },
  { label: "194 cm ( 6ft 4in )", value: "6.43" },
  { label: "195 cm ( 6ft 5in )", value: "6.50" },
];

class BasicDetails extends React.Component {
  constructor(props) {
    super(props);
    this.changeSection = this.changeSection.bind(this);

    this.state = {
      showForm: false,
      uname: "",
      ugender: "",
      udob: "",
      udayofbirth: [""],
      ublood: [""],
      uage: "",
      uheight: "",
      uheightVal: "",
      uweight: "",
      umarried: "",
      umtongue: "",
      ubtype: "",
      ucomplexion: "",
      uphysicalstat: "",
      ueating: "",
      udrinking: "",
      usmoking: "",
      value: "",
    };
  }
  changeSection() {
    this.setState({ showForm: !this.state.showForm });
    console.log("clicked");
  }

  ageCount(e) {
    const birthday = e.target.value;

    let today = new Date(),
      //birthay has 'Dec 25 1998'
      dob = new Date(birthday),
      //difference in milliseconds
      diff = today.getTime() - dob.getTime(),
      //convert milliseconds into years
      years = Math.floor(diff / 31556736000),
      //1 day has 86400000 milliseconds
      days_diff = Math.floor((diff % 31556736000) / 86400000),
      //1 month has 30.4167 days
      months = Math.floor(days_diff / 30.4167),
      days = Math.floor(days_diff % 30.4167);

    console.log(`${years} years ${months} months ${days} days`, "hiiiii");
    const ageY = `${years} years ${months} months`;
    this.setState({ udob: e.target.value, uage: ageY });
  }

  componentDidMount() {
    const { details, basic } = this.context;
    console.log(details.name, "name");
    this.setState({
      uname: details.name == undefined ? "" : details.name,
      ugender: details.gender == undefined ? "" : details.gender,
    });
    if (basic == "" || basic == null || basic == undefined) {
    } else {
      this.setState(
        {
          udob: basic.dob == undefined ? "" : basic.dob,
          udayofbirth: basic.dayOfBirth == undefined ? "" : basic.dayOfBirth,
          uage: basic.age == undefined ? "" : basic.age,
          ublood: basic.bloodGroup == undefined ? "" : basic.bloodGroup,
          uheight: basic.height == undefined ? "" : basic.height,
          uweight: basic.weight == undefined ? "" : basic.weight,
          umarried: basic.married == undefined ? "" : basic.married,
          umtongue: basic.mtongue == undefined ? "" : basic.mtongue,
          ubtype: basic.btype == undefined ? "" : basic.btype,
          ucomplexion: basic.complexion == undefined ? "" : basic.complexion,
          uphysicalstat:
            basic.physicalstatus == undefined ? "" : basic.physicalstatus,
          ueating: basic.eating == undefined ? "" : basic.eating,
          udrinking: basic.drinking == undefined ? "" : basic.drinking,
          usmoking: basic.smoking == undefined ? "" : basic.smoking,
        },
        function () {
          console.log(this.state.uname, "name12");
        }
      );
    }
  }
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
          name: this.state.uname,
          gender: this.state.ugender,

          basic: {
            age: this.state.uage,
            dob: this.state.udob,
            dayOfBirth: this.state.udayofbirth,
            height: this.state.uheight,
            bloodGroup: this.state.ublood,
            heightVal: this.state.uheightVal,
            weight: this.state.uweight,
            married: this.state.umarried,
            mtongue: this.state.umtongue,
            btype: this.state.ubtype,
            complexion: this.state.ucomplexion,
            physicalstatus: this.state.uphysicalstat,
            eating: this.state.ueating,
            drinking: this.state.udrinking,
            smoking: this.state.usmoking,
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

  render() {
    const weightList = [];
    for (let i = 30; i <= 150; i++) {
      weightList.push({
        label: `${i} Kg`,
        value: `${i} Kg`,
      });
    }

    const BasicDetailsForm = (
      <Form
        className="details-form"
        onSubmit={(e) => {
          this.handleSubmit(e);
        }}
      >
        <Form.Group as={Row} className="mb-2 input-center" controlId="uname">
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Name
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8">
            <Form.Control
              className="detail-form-input"
              required
              type="text"
              name="uname"
              placeholder="Name"
              value={this.state.uname}
              onChange={(e) => {
                this.setState({ uname: e.target.value });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 input-center" controlId="ugender">
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Gender
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8">
            <Form.Check
              required
              inline
              label="Male"
              name="ugender"
              value="Male"
              checked={this.state.ugender === "Male"}
              onChange={(e) => {
                this.setState({ ugender: e.target.value });
              }}
              type="radio"
              id={`details-radio-1`}
              className="details-form-radio"
            />
            <Form.Check
              required
              inline
              label="Female"
              name="ugender"
              value="Female"
              checked={this.state.ugender === "Female"}
              onChange={(e) => {
                this.setState({ ugender: e.target.value });
              }}
              type="radio"
              id={`details-radio-2`}
              className="details-form-radio"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 input-center" controlId="udob">
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Date of Birth
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8">
            <Form.Control
              className="detail-form-input"
              required
              type="date"
              name="udob"
              placeholder="DD/MM/YY"
              value={this.state.udob}
              onChange={(e) => {
                this.setState({ udob: e.target.value });
              }}
              onChange={(e) => this.ageCount(e)}

              // ref={(r) => this.state.udob = r}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 input-center">
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Day Of Birth
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={dayList}
              placeholder=""
              isSearchable={true}
              value={dayList.find((obj) => obj.value == this.state.udayofbirth)}
              onChange={(e) => {
                this.setState({ udayofbirth: e.value });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 input-center">
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Blood Group
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={bloodGroupList}
              placeholder=""
              isSearchable={true}
              value={bloodGroupList.find(
                (obj) => obj.value == this.state.ublood
              )}
              onChange={(e) => {
                this.setState({ ublood: e.value });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 input-center" controlId="uheight">
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Height
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={heightList}
              placeholder="From"
              isSearchable={true}
              value={heightList.find((obj) => obj.label == this.state.uheight)}
              onChange={(e) => {
                this.setState({ uheight: e.label, uheightVal: e.value });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 input-center" controlId="uweight">
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Weight
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={weightList}
              placeholder="eg. 70 Kg"
              isSearchable={true}
              value={weightList.find((obj) => obj.value == this.state.uweight)}
              onChange={(e) => {
                this.setState({ uweight: e.value });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 input-center" controlId="umarried">
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Marital Status
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={marritalStatusList}
              isSearchable={true}
              value={marritalStatusList.find(
                (obj) => obj.value == this.state.umarried
              )}
              onChange={(e) => {
                this.setState({
                  umarried: e.value,
                });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 input-center" controlId="umtongue">
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Mother Tongue
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={motherTongueList}
              isSearchable={true}
              value={motherTongueList.find(
                (obj) => obj.value == this.state.umtongue
              )}
              onChange={(e) => {
                this.setState({
                  umtongue: e.value,
                });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 input-center" controlId="ubtype">
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Body Type
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={bodyTypeList}
              isSearchable={true}
              value={bodyTypeList.find((obj) => obj.value == this.state.ubtype)}
              onChange={(e) => {
                this.setState({
                  ubtype: e.value,
                });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="ucomplexion"
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
            Complexion
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={complexionTypeList}
              isSearchable={true}
              value={complexionTypeList.find(
                (obj) => obj.value == this.state.ucomplexion
              )}
              onChange={(e) => {
                this.setState({
                  ucomplexion: e.value,
                });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="uphysicalstat"
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
            Physical Status
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={physicalTypeList}
              isSearchable={true}
              value={physicalTypeList.find(
                (obj) => obj.value == this.state.uphysicalstat
              )}
              onChange={(e) => {
                this.setState({
                  uphysicalstat: e.value,
                });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 input-center" controlId="ueating">
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Eating Habits
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={eatingTypeList}
              isSearchable={true}
              value={eatingTypeList.find(
                (obj) => obj.value == this.state.ueating
              )}
              onChange={(e) => {
                this.setState({
                  ueating: e.value,
                });
              }}
            />
          </Col>
        </Form.Group>

        <Col>
          <Row className="form-bottom-button">
            <Button type="submit">Save</Button>
            <Button className="cancel-btn" onClick={() => this.changeSection()}>
              Cancel
            </Button>
          </Row>
        </Col>
      </Form>
    );

    // console.log(this.context,'context')
    const DetailsSection = (
      <Row className="details-sec">
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Name</Col>
          <Col className="details-sec-info">
            {this.state.uname == "" ? "-" : this.state.uname}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Gender</Col>
          <Col className="details-sec-info">
            {this.state.ugender == "" ? "-" : this.state.ugender}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Blood Group</Col>
          <Col className="details-sec-info">
            {this.state.ublood == "" ? "-" : this.state.ublood}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Date Of Birth/ Day</Col>
          <Col className="details-sec-info">
            {this.state.udob == "" ? "-" : this.state.udob}{" "}
            {this.state.udayofbirth == "" ? "" : this.state.udayofbirth}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Body Type</Col>
          <Col className="details-sec-info">
            {this.state.ubtype == "" ? "-" : this.state.ubtype}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Age</Col>
          <Col className="details-sec-info">
            {/* {this.state.udob == "" ? "-" : this.state.udob} */}
            {this.state.uage == "" ? "-" : this.state.uage}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Complexion</Col>
          <Col className="details-sec-info">
            {this.state.ucomplexion == "" ? "-" : this.state.ucomplexion}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Height</Col>
          <Col className="details-sec-info">
            {this.state.uheight == "" ? "-" : this.state.uheight}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Weight</Col>
          <Col className="details-sec-info">
            {this.state.uweight == "" ? "-" : this.state.uweight}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Physical Status</Col>
          <Col className="details-sec-info">
            {this.state.uphysicalstat == "" ? "-" : this.state.uphysicalstat}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Eating Habits</Col>
          <Col className="details-sec-info">
            {this.state.ueating == "" ? "-" : this.state.ueating}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Mother Tongue</Col>
          <Col className="details-sec-info">
            {this.state.umtongue == "" ? "-" : this.state.umtongue}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Marital Status</Col>
          <Col className="details-sec-info">
            {this.state.umarried == "" ? "-" : this.state.umarried}
          </Col>
        </Col>
        {/* <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Drinking Habits</Col>
          <Col className="details-sec-info">
            {this.state.udrinking == "" ? "-" : this.state.udrinking}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Smoking Habits</Col>
          <Col className="details-sec-info">
            {this.state.usmoking == "" ? "-" : this.state.usmoking}
          </Col>
        </Col> */}
      </Row>
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
        {this.state.showForm ? BasicDetailsForm : DetailsSection}
      </Col>
    );
  }
}
BasicDetails.contextType = UserContext;

export default BasicDetails;
