import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarOfDavid } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../Context/UserContext";
import { message } from "antd";
import Select from "react-select";

const astrologyList = [
  {
    label: "Pure Horoscope",
    value: "Pure Horoscope",
  },
  {
    label: "Mars Horoscope",
    value: "Mars Horoscope",
  },
  {
    label: "Rahu Ketu Horoscope",
    value: "Rahu Ketu Horoscope",
  },
  {
    label: "Rahu Ketu Mars Horoscope",
    value: "Rahu Ketu Mars Horoscope",
  },
];
const padham1 = [
  { label: "Suriyan", value: "Suriyan" },
  { label: "Santhiran", value: "Santhiran" },
  { label: "Sevvai", value: "Sevvai" },
  { label: "Puthan", value: "Puthan" },
  { label: "Kuru", value: "Kuru" },
  { label: "Sukran", value: "Sukran" },
  { label: "Sani", value: "Sani" },
  { label: "Raagu", value: "Raagu" },
  { label: "Kethu", value: "Kethu" },
];
class Horoscope extends React.Component {
  constructor(props) {
    super(props);
    this.changeSection = this.changeSection.bind(this);
    // this.onChange=this.onChange.bind(this);

    this.state = {
      showForm: false,
      ubirthtime: null,
      ubirthplace: null,
      urashi: null,
      value: "",
      uastrology: [''],
      upadham1: [],
      upadham2: [],
      upadham3: [],
      upadham4: [],
      yearList: [],
      monthList:[],
      dayList:[]
    };
  }
  changeSection() {
    this.setState({ showForm: !this.state.showForm });
    console.log("clicked");
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
          horoscope: {
            birthtime: this.state.ubirthtime,
            birthplace: this.state.ubirthplace,
            birthastrology: this.state.uastrology,
            padham1:this.state.upadham1,
            padham2:this.state.upadham2,
            padham3:this.state.upadham3,
            padham4:this.state.upadham4,
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
    const yearList = [];
    for (let i = 1947; i <= new Date().getFullYear(); i++) {
      yearList.push({
        label: i,
        value: i,
      });
    }
    const monthList=[];
    for (let i = 1; i <= 1000; i++) {
      monthList.push({
        label: i,
        value: i,
      });
    }
    const dayList=[];
    for (let i = 1; i <= 31; i++) {
      dayList.push({
        label: i,
        value: i,
      });
    }



    this.setState({
      yearList: yearList,
      monthList:monthList,
      dayList:dayList
    });
    const { details, basic, horoscope } = this.context;
    if (horoscope == "" || horoscope == null || horoscope == undefined) {
    } else {
      this.setState({
        ubirthtime: horoscope.birthtime == undefined ? "" : horoscope.birthtime,
        ubirthplace:
          horoscope.birthplace == undefined ? "" : horoscope.birthplace,
        uastrology:
          horoscope.birthastrology == undefined ? "" : horoscope.birthastrology,
          upadham1:
          horoscope.padham1 == undefined ? "" : horoscope.padham1,
          upadham2:
          horoscope.padham2 == undefined ? "" : horoscope.padham2,
          upadham3:
          horoscope.padham3 == undefined ? "" : horoscope.padham3,
          upadham4:
          horoscope.padham4 == undefined ? "" : horoscope.padham4,
      });
    }
  }

  render() {
    const onChange = (time) => {
      console.log(time, "hiii");
      this.setState({
        value: time,
      });
      console.log(this.state.value, "value");
    };
    const HoroscopeForm = (
      <Form
        className="details-form"
        onSubmit={(e) => {
          this.handleSubmit(e);
        }}
      >
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="ubirthtime"
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
            Birth Time
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8">
            <Form.Control
              className="detail-form-input"
              required
              type="time"
              name="ubirthtime"
              placeholder="Birth Time"
              value={this.state.ubirthtime}
              onChange={(e) => {
                this.setState({ ubirthtime: e.target.value });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="ubirthplace"
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
            Birth Place
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8">
            <Form.Control
              className="detail-form-input"
              required
              type="text"
              name="ubirthplace"
              placeholder="Birth Place"
              value={this.state.ubirthplace}
              onChange={(e) => {
                this.setState({ ubirthplace: e.target.value });
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
            Astrology
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={astrologyList}
              placeholder=""
              isSearchable={true}
              value={astrologyList.find(
                (obj) => obj.value == this.state.uastrology
              )}
              onChange={(e) => {
                this.setState({ uastrology: e.value });
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
            Direction
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={padham1}
              placeholder=""
              isSearchable={true}
              value={padham1.find((obj) => obj.value == this.state.upadham1)}
              onChange={(e) => {
                this.setState({ upadham1: e.value });
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
            Year
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={this.state.monthList}
              placeholder=""
              isSearchable={true}
              value={this.state.monthList.find(
                (obj) => obj.value == this.state.upadham2
              )}
              onChange={(e) => {
                this.setState({ upadham2: e.value });
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
            Month
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={this.state.monthList}
              placeholder=""
              isSearchable={true}
              value={this.state.monthList.find(
                (obj) => obj.value == this.state.upadham3
              )}
              onChange={(e) => {
                this.setState({ upadham3: e.value });
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
            Date
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={this.state.monthList}
              placeholder=""
              isSearchable={true}
              value={this.state.monthList.find(
                (obj) => obj.value == this.state.upadham4
              )}
              onChange={(e) => {
                this.setState({ upadham4: e.value });
              }}
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
      // const difference = ;

    // console.log(difference, "listabc");
    // this.setState({
    //   list: this.state.list.filter((x) => !el.includes(x.label)),
    // });


    const HoroscopeDetails = (
      <Row className="details-sec">
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Birth Time</Col>
          <Col className="details-sec-info">
            {this.state.ubirthtime == undefined ? "-" : this.state.ubirthtime}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Birth Place</Col>
          <Col className="details-sec-info">
            {this.state.ubirthplace == undefined ? "-" : this.state.ubirthplace}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Horoscope</Col>
          <Col className="details-sec-info">
            {this.state.uastrology == "" ? "-" : this.state.uastrology}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Direction</Col>
          <Col className="details-sec-info">
            {this.state.upadham1 == "" ? "-" : this.state.upadham1}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Year</Col>
          <Col className="details-sec-info">
            {this.state.upadham2 == "" ? "-" : this.state.upadham2}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Month</Col>
          <Col className="details-sec-info">
            {this.state.upadham3 == "" ? "-" : this.state.upadham3}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Date</Col>
          <Col className="details-sec-info">
            {this.state.upadham4 == "" ? "-" : this.state.upadham4}
          </Col>
        </Col>
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
            <FontAwesomeIcon icon={faStarOfDavid} className="details-icon" />
            <Col className="detail-title">Horoscope</Col>
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
        {this.state.showForm ? HoroscopeForm : HoroscopeDetails}
      </Col>
    );
  }
}
Horoscope.contextType = UserContext;
export default Horoscope;
