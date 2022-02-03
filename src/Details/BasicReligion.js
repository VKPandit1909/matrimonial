import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAtom, faIdCard } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import UserContext from "../Context/UserContext";
import { message } from "antd";

const religionList = [
  { label: "Hindu", value: "Hindu" },
  { label: "Muslim", value: "Muslim" },
  { label: "Christian", value: "Christian" },
];
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

const nakshatramList = [
  { label: "Ashwini", value: "Ashwini" },
  { label: "Bharani", value: "Bharani" },
  { label: "Rohini", value: "Rohini" },
];
const houseList = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
  { label: "Doesn't Matter", value: "Doesn't Matter" },
];
const marritalStatusList = [
  { label: "Single", value: "Single" },
  { label: "Married", value: "Married" },
  { label: "Unmarried", value: "Unmarried" },
  { label: "Divorced", value: "Divorced" },
  { label: "Widowed", value: "Widowed" },
  { label: "Doesn't Matter", value: "Doesn't Matter" },
];
const eatingTypeList = [
  { label: "Vegetarian", value: "Vegetarian" },
  { label: "Non-Vegetarian", value: "Non-Vegetarian" },
  { label: "Eggetarian", value: "Eggetarian" },
  { label: "Doesn't Matter", value: "Doesn't Matter" },
];
const FamilyStatusList = [
  { label: "Middle Class", value: "Middle Class" },
  { label: "Upper Middle Class", value: "Upper Middle Class" },
  { label: "Rich", value: "Rich" },
  { label: "Affluent", value: "Affluent" },
  { label: "Doesn't Matter", value: "Doesn't Matter" },
];
const doshamList = [
  { label: "Don't Know", value: "Don't Know" },
  { label: "No", value: "No" },
  { label: "Chevvai", value: "Chevvai" },
  { label: "Rahu & Kethu", value: "Rahu & Kethu" },
  { label: "Parikara Chevvai", value: "Parikara Chevvai" },
  { label: "Doesn't Matter", value: "Doesn't Matter" },
];
const complexionTypeList = [
  { label: "Fair", value: "Fair" },
  { label: "Very Fair", value: "Very Fair" },
  { label: "Wheatish", value: "Wheatish" },
  { label: "Dark", value: "Dark" },
  { label: "Doesn't Matter", value: "Doesn't Matter" },
];
const physicalTypeList = [
  { label: "Normal", value: "Normal" },

  { label: "Differently Abled", value: "Differently Abled" },
  { label: "Doesn't Matter", value: "Doesn't Matter" },
];
class BasicReligion extends React.Component {
  constructor(props) {
    super(props);
    this.changeSection = this.changeSection.bind(this);
    this.state = {
      showForm: false,
      uagefrom: "",
      ageTo: [""],
      ageFrom: [""],
      uageto: "",
      uheightfrom: "",
      uheightto: "",
      uphysical: [""],
      ucomplexion: [""],
      udrinking: "",
      usmoking: "",
      ureligion: "",
      umothertongue: [""],
      ucaste: [""],
      unakshatra: [""],
      uownhouse: "",
      uastrology: [""],
      uland: "",
      ufamily: [""],
      uassets: "",
      umarrital: [""],
      married: [""],
      uprefdosham: [""],
      ueatinghabits: [""],
      heightToList: [],
      heightFromList: [],
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
          partnerpreference: {
            partagefrom: this.state.uagefrom,
            partageto: this.state.uageto,
            partheightfrom: this.state.uheightfrom,
            partheightto: this.state.uheightto,
            partphysical: this.state.uphysical,
            partcomplexion: this.state.ucomplexion,
            partdrinking: this.state.udrinking,
            partsmoking: this.state.usmoking,
            partreligion: this.state.ureligion,
            partastrology: this.state.uastrology,
            partmothertongue: this.state.umothertongue,
            partcaste: this.state.ucaste,
            partnakshatra: this.state.unakshatra,
            partownhouse: this.state.uownhouse,
            partland: this.state.uland,
            partfamily: this.state.ufamily,
            partassets: this.state.uassets,
            partmarrital: this.state.umarrital,
            partmarriedstatus: this.state.married,
            parteatinghabits: this.state.ueatinghabits,
            partdosham: this.state.uprefdosham,
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
    const heightList = [
      { label: "4'1\"", value: "4.1" },
      { label: "4'2\"", value: "4.2" },
      { label: "4'3\"", value: "4.3" },
      { label: "4'4\"", value: "4.4" },
      { label: "4'5\"", value: "4.5" },
      { label: "4'6\"", value: "4.6" },
      { label: "4'7\"", value: "4.7" },
      { label: "4'8\"", value: "4.8" },
      { label: "4'9\"", value: "4.9" },
      { label: "4'10\"", value: "4.10" },
      { label: "4'11\"", value: "4.11" },
      { label: "5'0\"", value: "5.0" },
      { label: "5'1\"", value: "5.1" },
      { label: "5'2\"", value: "5.2" },
      { label: "5'3\"", value: "5.3" },
      { label: "5'4\"", value: "5.4" },
      { label: "5'5\"", value: "5.5" },
      { label: "5'6\"", value: "5.6" },
      { label: "5'7\"", value: "5.7" },
      { label: "5'8\"", value: "5.8" },
      { label: "5'9\"", value: "5.9" },
      { label: "5'10\"", value: "5.10" },
      { label: "5'11\"", value: "5.11" },
      { label: "6'0\"", value: "6.0" },
      { label: "6'1\"", value: "6.1" },
      { label: "6'2\"", value: "6.2" },
      { label: "6'3\"", value: "6.3" },
      { label: "6'4\"", value: "6.4" },
      { label: "6'5\"", value: "6.5" },
      { label: "6'6\"", value: "6.6" },
      { label: "6'7\"", value: "6.7" },
      { label: "6'8\"", value: "6.8" },
      { label: "6'9\"", value: "6.9" },
      { label: "6'10\"", value: "6.10" },
      { label: "6'11\"", value: "6.11" },
      { label: "7'0\"", value: "7.0" },
    ];
    const heightFromList = [{ label: "From", value: null }, ...heightList];
    const heightToList = [{ label: "To", value: null }, ...heightList];
    this.setState({
      heightToList,
      heightFromList,
    });
    const ageList = [];
    for (let i = 18; i < 66; i++) {
      ageList.push({
        label: i,
        value: i,
      });
    }

    const ageFromLists = [{ label: "From", value: null }, ...ageList];
    const ageToList = [{ label: "To", value: null }, ...ageList];
    this.setState({
      ageTo: ageToList,
      ageFrom: ageFromLists,
    });
    const { partnerpreference } = this.context;
    if (
      partnerpreference == "" ||
      partnerpreference == undefined ||
      partnerpreference == null
    ) {
    } else {
      this.setState({
        uagefrom:
          partnerpreference.partagefrom == undefined
            ? ""
            : partnerpreference.partagefrom,
        uageto:
          partnerpreference.partageto == undefined
            ? ""
            : partnerpreference.partageto,
        uheightfrom:
          partnerpreference.partheightfrom == undefined
            ? ""
            : partnerpreference.partheightfrom,
        uheightto:
          partnerpreference.partheightto == undefined
            ? ""
            : partnerpreference.partheightto,
        uphysical:
          partnerpreference.partphysical == undefined
            ? ""
            : partnerpreference.partphysical,
        ucomplexion:
          partnerpreference.partcomplexion == undefined
            ? ""
            : partnerpreference.partcomplexion,
        udrinking:
          partnerpreference.partdrinking == undefined
            ? ""
            : partnerpreference.partdrinking,
        uastrology:
          partnerpreference.partastrology == undefined
            ? ""
            : partnerpreference.partastrology,
        usmoking:
          partnerpreference.partsmoking == undefined
            ? ""
            : partnerpreference.partsmoking,
        ureligion:
          partnerpreference.partreligion == undefined
            ? ""
            : partnerpreference.partreligion,
        umothertongue:
          partnerpreference.partmothertongue == undefined
            ? ""
            : partnerpreference.partmothertongue,
        ucaste:
          partnerpreference.partcaste == undefined
            ? ""
            : partnerpreference.partcaste,
        unakshatra:
          partnerpreference.partnakshatra == undefined
            ? ""
            : partnerpreference.partnakshatra,
        uownhouse:
          partnerpreference.partownhouse == undefined
            ? ""
            : partnerpreference.partownhouse,
        uland:
          partnerpreference.partland == undefined
            ? ""
            : partnerpreference.partland,
        ufamily:
          partnerpreference.partfamily == undefined
            ? ""
            : partnerpreference.partfamily,
        uassets:
          partnerpreference.partassets == undefined
            ? ""
            : partnerpreference.partassets,
        umarrital:
          partnerpreference.partmarrital == undefined
            ? ""
            : partnerpreference.partmarrital,
        married:
          partnerpreference.partmarriedstatus == undefined
            ? ""
            : partnerpreference.partmarriedstatus,
        ueatinghabits:
          partnerpreference.parteatinghabits == undefined
            ? ""
            : partnerpreference.parteatinghabits,
        uprefdosham:
          partnerpreference.partdosham == undefined
            ? ""
            : partnerpreference.partdosham,
      });
    }
  }
  handleMotherTongue = (e) => {
    this.setState({
      umothertongue: Array.isArray(e) ? e.map((x) => x.value) : [],
    });
  };
  handleCaste = (e) => {
    this.setState({
      ucaste: Array.isArray(e) ? e.map((x) => x.value) : [],
    });
  };
  handleNakshatram = (e) => {
    this.setState({
      unakshatra: Array.isArray(e) ? e.map((x) => x.value) : [],
    });
  };
  handleMarital = (e) => {
    this.setState({
      umarrital: Array.isArray(e) ? e.map((x) => x.value) : [],
    });
  };
  handleHouse = (e) => {
    this.setState({
      uownhouse: Array.isArray(e) ? e.map((x) => x.value) : [],
    });
  };
  handleAstrology = (e) => {
    this.setState({
      uastrology: Array.isArray(e) ? e.map((x) => x.value) : [],
    });
  };
  handleDosham = (e) => {
    this.setState({
      uprefdosham: Array.isArray(e) ? e.map((x) => x.value) : [],
    });
  };
  handleeating = (e) => {
    this.setState({
      ueatinghabits: Array.isArray(e) ? e.map((x) => x.value) : [],
    });
  };
  handleFamily = (e) => {
    this.setState({
      ufamily: Array.isArray(e) ? e.map((x) => x.value) : [],
    });
  };
  handleEating = (e) => {
    this.setState({
      umarrital: Array.isArray(e) ? e.map((x) => x.value) : [],
    });
  };
  handlePhysical = (e) => {
    this.setState({
      uphysical: Array.isArray(e) ? e.map((x) => x.value) : [],
    });
  };

  handleComplexion = (e) => {
    this.setState({
      ucomplexion: Array.isArray(e) ? e.map((x) => x.value) : [],
    });
  };
  render() {
    const AssetsList = [];
    for (let i = 1; i <= 999; i++) {
      AssetsList.push({
        label: `${i} Lakh`,
        value: `${i} Lakh`,
      });
    }
    const BasicReligionDetails = (
      <Row className="details-sec">
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Age</Col>
          <Col className="details-sec-info">
            {this.state.uagefrom == "" ? "" : this.state.uagefrom}-
            {this.state.uageto == "" ? "" : this.state.uageto}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Height</Col>
          <Col className="details-sec-info">
            {this.state.uheightfrom == "" ? "" : this.state.uheightfrom}-
            {this.state.uheightto == "" ? "" : this.state.uheightto}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Marital Status</Col>
          <Col className="details-sec-info">
            {" "}
            {this.state.umarrital == "" ? "-" : this.state.umarrital.join(", ")}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Physical Status</Col>
          <Col className="details-sec-info">
            {this.state.uphysical == "" ? "-" : this.state.uphysical.join(", ")}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Eating Habits</Col>
          <Col className="details-sec-info">
            {" "}
            {this.state.ueatinghabits == ""
              ? "-"
              : this.state.ueatinghabits.join(", ")}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Horoscope</Col>
          <Col className="details-sec-info">
            {" "}
            {this.state.uastrology == ""
              ? "-"
              : this.state.uastrology.join(", ")}
          </Col>
        </Col>

        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Religion</Col>
          <Col className="details-sec-info">
            {this.state.ureligion == "" ? "-" : this.state.ureligion}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Mother Tongue</Col>
          <Col className="details-sec-info">
            {" "}
            {this.state.umothertongue == "" ? "-" : this.state.umothertongue}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Caste / Division</Col>
          <Col className="details-sec-info">
            {" "}
            {this.state.ucaste == "" ? "-" : this.state.ucaste}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Nakshatram / Star</Col>
          <Col className="details-sec-info">
            {this.state.unakshatra == ""
              ? "-"
              : this.state.unakshatra.join(", ")}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Dosham</Col>
          <Col className="details-sec-info">
            {" "}
            {this.state.uprefdosham == ""
              ? "-"
              : this.state.uprefdosham.join(", ")}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Own House</Col>
          <Col className="details-sec-info">
            {this.state.uownhouse == "" ? "-" : this.state.uownhouse}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Land(Acres)</Col>
          <Col className="details-sec-info">
            {this.state.uland == "" ? "-" : this.state.uland}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Approximate Assets</Col>
          <Col className="details-sec-info">
            {this.state.uassets == "" ? "-" : this.state.uassets}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Complexion</Col>
          <Col className="details-sec-info">
            {this.state.ucomplexion == ""
              ? "-"
              : this.state.ucomplexion.join(", ")}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Family Status</Col>
          <Col className="details-sec-info">
            {this.state.ufamily == "" ? "-" : this.state.ufamily}
          </Col>
        </Col>
      </Row>
    );
    const BaiscReligionPrefForm = (
      <Form
        className="details-form"
        onSubmit={(e) => {
          this.handleSubmit(e);
        }}
      >
        <Form.Group as={Row} className="mb-2 input-center" controlId="uprefage">
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Preferred Age
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8">
            <Row>
              <Col className="details-select">
                <Select
                  className="detail-form-input"
                  placeholder="From"
                  options={this.state.ageFrom}
                  isSearchable={true}
                  value={this.state.ageFrom.find(
                    (obj) => obj.value == this.state.uagefrom
                  )}
                  onChange={(e) => {
                    this.setState({
                      uagefrom: e.value,
                    });
                  }}
                />
              </Col>
              <Col>
                <Select
                  className="detail-form-input"
                  options={this.state.ageTo}
                  placeholder="To"
                  isSearchable={true}
                  value={this.state.ageFrom.find(
                    (obj) => obj.value == this.state.uageto
                  )}
                  onChange={(e) => {
                    this.setState({
                      uageto: e.value,
                    });
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="uprefmarrital"
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
            Marrital Status
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              isMulti
              className="detail-multiselect-input"
              options={marritalStatusList}
              isSearchable={true}
              value={marritalStatusList.filter((obj) =>
                this.state.umarrital.includes(obj.value)
              )}
              onChange={this.handleMarital}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="uprefheight"
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
            Height(in inches)
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8">
            <Row>
              <Col className="details-select">
                <Select
                  className="detail-form-input"
                  options={this.state.heightFromList}
                  placeholder="From"
                  isSearchable={true}
                  value={this.state.heightFromList.find(
                    (obj) => obj.value == this.state.uheightfrom
                  )}
                  onChange={(e) => {
                    this.setState({
                      uheightfrom: e.value,
                    });
                  }}
                />
              </Col>
              <Col className="details-select">
                <Select
                  className="detail-form-input"
                  options={this.state.heightToList}
                  placeholder="From"
                  isSearchable={true}
                  value={this.state.heightToList.find(
                    (obj) => obj.value == this.state.uheightto
                  )}
                  onChange={(e) => {
                    this.setState({
                      uheightto: e.value,
                    });
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="uprefphysical"
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
              isMulti
              className="detail-multiselect-input"
              options={physicalTypeList}
              isSearchable={true}
              value={physicalTypeList.filter((obj) =>
                this.state.uphysical.includes(obj.value)
              )}
              onChange={this.handlePhysical}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="uprefphysical"
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
            Horoscope
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              isMulti
              className="detail-multiselect-input"
              options={astrologyList}
              isSearchable={true}
              value={astrologyList.filter((obj) =>
                this.state.uastrology.includes(obj.value)
              )}
              onChange={this.handleAstrology}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="uprefcomplexion"
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
              isMulti
              className="detail-multiselect-input"
              options={complexionTypeList}
              isSearchable={true}
              value={complexionTypeList.filter((obj) =>
                this.state.ucomplexion.includes(obj.value)
              )}
              onChange={this.handleComplexion}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="uprefeating"
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
            Eating Habits
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              isMulti
              className="detail-multiselect-input"
              options={eatingTypeList}
              isSearchable={true}
              value={eatingTypeList.filter((obj) =>
                this.state.ueatinghabits.includes(obj.value)
              )}
              onChange={this.handleeating}
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="ureligionpref"
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
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="umothertongue"
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
            Mother Tongue
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8">
            <Form.Control
              className="detail-form-input "
              required
              type="text"
              name="upartmother"
              placeholder="Hindi, Tamil... "
              value={this.state.umothertongue}
              onChange={(e) => {
                this.setState({ umothertongue: e.target.value });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="ucastepref"
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
            Caste / Division
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8">
            <Form.Control
              className="detail-form-input "
              required
              type="text"
              name="upartcaste"
              placeholder=" "
              value={this.state.ucaste}
              onChange={(e) => {
                this.setState({ ucaste: e.target.value });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="uprefdosham"
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
            Dosham
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              isMulti
              className="detail-multiselect-input"
              options={doshamList}
              isSearchable={true}
              value={doshamList.filter((obj) =>
                this.state.uprefdosham.includes(obj.value)
              )}
              onChange={this.handleDosham}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="unakshatrampref"
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
            Nakshatram
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              isMulti
              className="detail-multiselect-input"
              options={nakshatramList}
              isSearchable={true}
              value={nakshatramList.filter((obj) =>
                this.state.unakshatra.includes(obj.value)
              )}
              onChange={this.handleNakshatram}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="uhousepref"
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
            Own House
          </Form.Label>

          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={houseList}
              isSearchable={true}
              value={houseList.find((obj) => obj.value == this.state.uownhouse)}
              onChange={(e) => {
                this.setState({
                  uownhouse: e.value,
                });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="uprefland"
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
            Land (in Acres)
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8">
            <Form.Control
              className="detail-form-input "
              required
              type="number"
              name="uprefland"
              placeholder=" "
              value={this.state.uland}
              onChange={(e) => {
                this.setState({ uland: e.target.value });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group
          required
          as={Row}
          className="mb-2 input-center"
          controlId="upreffamilystatus"
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
            Family Status
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              isMulti
              className="detail-multiselect-input"
              options={FamilyStatusList}
              isSearchable={true}
              value={FamilyStatusList.filter((obj) =>
                this.state.ufamily.includes(obj.value)
              )}
              onChange={this.handleFamily}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="uprefassets"
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
            Approximate Assets (In Lakh)
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={AssetsList}
              placeholder="eg. 10 Lakh"
              isSearchable={true}
              value={AssetsList.find((obj) => obj.value == this.state.uassets)}
              onChange={(e) => {
                this.setState({ uassets: e.value });
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
    return (
      <Col className="details-main mt-4">
        <Row className="details-head">
          <Col lg={10} className="details-header">
            <FontAwesomeIcon icon={faAtom} className="details-icon" />
            <Col className="detail-title">Basic & Religion Preference</Col>
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
        {this.state.showForm ? BaiscReligionPrefForm : BasicReligionDetails}
      </Col>
    );
  }
}
BasicReligion.contextType = UserContext;
export default BasicReligion;
