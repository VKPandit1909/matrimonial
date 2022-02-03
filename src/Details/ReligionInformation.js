import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk } from "@fortawesome/free-solid-svg-icons";
import MySelect from "../Components/MySelect";

import Select from "react-select";
import UserContext from "../Context/UserContext";
import { message } from "antd";

const religionList = [
  { label: "Hindu", value: "Hindu" },
  { label: "Muslim", value: "Muslim" },
  { label: "Christian", value: "Christian" },
];
const casteList = [{ label: "Kovandar", value: "Kovandar" }];
const subCasteList = [{ label: "Kongu Vellar", value: "Kongu Vellar" }];
const gothramList = [
  { label: "Aatharvas", value: "Aatharvas" },
  { label: "Agasthi", value: "Agasthi" },
  { label: "Airan", value: "Airan" },
  { label: "Birthare", value: "Birthare" },
];
const nakshatramList = [
  { label: "Ashwini", value: "Ashwini" },
  { label: "Bharani", value: "Bharani" },
  { label: "Karthigai", value: "Karthigai" },
  { label: "Rohini", value: "Rohini" },
  { label: "Mirigasirisham", value: "Mirigasirisham" },
  { label: "Thiruvathirai", value: "Thiruvathirai" },
  { label: "Punarpoosam", value: "Punarpoosam" },
  { label: "Poosam", value: "Poosam" },
  { label: "Ayilyam", value: "Ayilyam" },
  { label: "Makam", value: "Makam" },
  { label: "Pooram", value: "Pooram" },
  { label: "Uthiram", value: "Uthiram" },
  { label: "Hastham", value: "Hastham" },
  { label: "Chithirai", value: "Chithirai" },
  { label: "Swathi", value: "Swathi" },
  { label: "Visakam", value: "Visakam" },
  { label: "Anusham", value: "Anusham" },
  { label: "Kettai", value: "Kettai" },
  { label: "Moolam", value: "Moolam" },
  { label: "Pooradam", value: "Pooradam" },
  { label: "Uthradam", value: "Uthradam" },
  { label: "Thiruvonam", value: "Thiruvonam" },
  { label: "Avittam", value: "Avittam" },
  { label: "Sadhayam", value: "Sadhayam" },
  { label: "Puratathi", value: "Puratathi" },
  { label: "Uthirattathi", value: "Uthirattathi" },
  { label: "Revathi", value: "Revathi" },
];
const rassiList = [
  { label: "Aries", value: "Aries" },
  { label: "Taurus", value: "Taurus" },
  { label: "Gemini", value: "Gemini" },
  { label: "Katakam", value: "Katakam" },
  { label: "Lion", value: "Lion" },
  { label: "Virgo", value: "Virgo" },
  { label: "Libra", value: "Libra" },
  { label: "Scorpio", value: "Scorpio" },
  { label: "Sagittarius", value: "Sagittarius" },
  { label: "Capricorn", value: "Capricorn" },
  { label: "Aquarius", value: "Aquarius" },
  { label: "Pisces", value: "Pisces" },
];

const KulamList = [
  { label: "Mesham", value: "Mesham" },
  { label: "Tula", value: "Tula" },
  { label: "Dhanus", value: "Dhanus" },
];
const doshamList = [
  { label: "Don't Know", value: "Don't Know" },
  { label: "No", value: "No" },
  { label: "Chevvai", value: "Chevvai" },
  { label: "Rahu & Kethu", value: "Rahu & Kethu" },
  { label: "Parikara Chevvai", value: "Parikara Chevvai" },
];
class ReligionInformation extends React.Component {
  constructor(props) {
    super(props);
    this.changeSection = this.changeSection.bind(this);

    this.state = {
      showForm: false,
      ureligion: "",
      ucaste: "",
      usubcaste: "",
      ugothram: "",
      unakshatram: "",
      urassi: "",
      ukulamtemple: "",
      uhavedosham: [],
    };
  }
  changeSection() {
    this.setState({ showForm: !this.state.showForm });
    console.log("clicked");
  }
  handleChange3 = (e) => {
    this.setState({ ureligion: e.value });
  };
  handleSubmit = (event) => {
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
          religion: {
            partreligion: this.state.ureligion,
            partcaste: this.state.ucaste,
            partsubcaste: this.state.usubcaste,
            partgothram: this.state.ugothram,
            partnakshatram: this.state.unakshatram,
            partrassi: this.state.urassi,
            partkulamtemple: this.state.ukulamtemple,
            parthavedosham: this.state.uhavedosham,
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
  handleDosham = (e) => {
    this.setState({
      uhavedosham: Array.isArray(e) ? e.map((x) => x.value) : [],
    });
  };

  componentDidMount() {
    const { religion } = this.context;
    if (religion == "" || religion == undefined || religion == null) {
    } else {
      this.setState({
        ureligion:
          religion.partreligion == undefined ? "" : religion.partreligion,
        ucaste: religion.partcaste == undefined ? "" : religion.partcaste,
        usubcaste:
          religion.partsubcaste == undefined ? "" : religion.partsubcaste,
        ugothram: religion.partgothram == undefined ? "" : religion.partgothram,
        unakshatram:
          religion.partnakshatram == undefined ? "" : religion.partnakshatram,
        urassi: religion.partrassi == undefined ? "" : religion.partrassi,
        ukulamtemple:
          religion.partkulamtemple == undefined ? "" : religion.partkulamtemple,
        uhavedosham:
          religion.parthavedosham == undefined ? "" : religion.parthavedosham,
      });
    }
  }
  render() {
    const DetailsSection = (
      <Row className="details-sec">
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Religion</Col>
          <Col className="details-sec-info">
            {this.state.ureligion == "" ? "-" : this.state.ureligion}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Caste/Division</Col>
          <Col className="details-sec-info">
            {this.state.ucaste == "" ? "-" : this.state.ucaste}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Sub Caste</Col>
          <Col className="details-sec-info">
            {this.state.usubcaste == "" ? "-" : this.state.usubcaste}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Gothra(m)</Col>
          <Col className="details-sec-info">
            {this.state.ugothram == "" ? "-" : this.state.ugothram}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Nakshatram / Star</Col>
          <Col className="details-sec-info">
            {this.state.unakshatram == "" ? "-" : this.state.unakshatram}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Raasi</Col>
          <Col className="details-sec-info">
            {this.state.urassi == "" ? "-" : this.state.urassi}
          </Col>
        </Col>

        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Kulam Temple</Col>
          <Col className="details-sec-info">
            {this.state.ukulamtemple == "" ? "-" : this.state.ukulamtemple}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Have Dosham</Col>
          <Col className="details-sec-info">
            {this.state.uhavedosham == ""
              ? "-"
              : this.state.uhavedosham.join(", ")}
          </Col>
        </Col>
      </Row>
    );

    const ReligionInformationForm = (
      <Form
        className="details-form"
        onSubmit={(e) => {
          this.handleSubmit(e);
        }}
      >
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="ureligion"
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
            Religion
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={religionList}
              isSearchable={true}
              value={religionList.find(
                (obj) => obj.value == this.state.ureligion
              )}
              onChange={(e) => {
                this.setState({
                  ureligion: e.value,
                });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 input-center" controlId="ucaste">
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Caste / Division
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={casteList}
              isSearchable={true}
              value={casteList.find((obj) => obj.value == this.state.ucaste)}
              onChange={(e) => {
                this.setState({
                  ucaste: e.value,
                });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="usubcaste"
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
            Sub Caste
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={subCasteList}
              isSearchable={true}
              value={subCasteList.find(
                (obj) => obj.value == this.state.usubcaste
              )}
              onChange={(e) => {
                this.setState({
                  usubcaste: e.value,
                });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 input-center" controlId="ugothra">
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Gothra(m)
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={gothramList}
              isSearchable={true}
              value={gothramList.find(
                (obj) => obj.value == this.state.ugothram
              )}
              onChange={(e) => {
                this.setState({
                  ugothram: e.value,
                });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="unakshatram"
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
            Nakshatram / Star
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={nakshatramList}
              isSearchable={true}
              value={nakshatramList.find(
                (obj) => obj.value == this.state.unakshatram
              )}
              onChange={(e) => {
                this.setState({
                  unakshatram: e.value,
                });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 input-center" controlId="uraasi">
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Rassi / Moon Sign
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              required
              className="detail-form-input"
              options={rassiList}
              isSearchable={true}
              value={rassiList.find((obj) => obj.value == this.state.urassi)}
              onChange={(e) => {
                this.setState({
                  urassi: e.value,
                });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="ukulamtemple"
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
            Kulam Temple
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={KulamList}
              isSearchable={true}
              value={KulamList.find(
                (obj) => obj.value == this.state.ukulamtemple
              )}
              onChange={(e) => {
                this.setState({
                  ukulamtemple: e.value,
                });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="uhavedosham"
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
            Have Dosham
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            {/* <Select
              isMulti
              className="detail-multiselect-input"
              options={doshamList}
              isSearchable={true}
              value={doshamList.filter((obj) =>
                this.state.uhavedosham.includes(obj.value)
              )}
              onChange={this.handleDosham}
            /> */}
            <MySelect
              options={doshamList}
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              onChange={this.handleDosham}
              allowSelectAll={true}
              value={doshamList.filter((obj) =>
                this.state.uhavedosham.includes(obj.value)
              )}
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
            <FontAwesomeIcon icon={faAsterisk} className="details-icon" />
            <Col className="detail-title">Religion Information</Col>
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
        {this.state.showForm ? ReligionInformationForm : DetailsSection}
      </Col>
    );
  }
}
ReligionInformation.contextType = UserContext;
export default ReligionInformation;
