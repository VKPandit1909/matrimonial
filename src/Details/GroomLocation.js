import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import UserContext from "../Context/UserContext";
import { message } from "antd";
import { Country, State, City } from "country-state-city";

const CountryList = [
  { label: "India", value: "India" },
  { label: "Pakistan", value: "Pakistan" },
  { label: "China", value: "China" },
];
class GroomLocation extends React.Component {
  constructor(props) {
    super(props);
    this.changeSection = this.changeSection.bind(this);
    this.state = {
      showForm: false,
      ucountry: "",
      ustate: "",
      ucity: "",
      uaddress: "",
      tamil: "",
      initialValues: {
        country: "",
        state: null,
        city: null,
        countryCode: "",
        stateCode: "",
      },
    };
  }
  changeSection() {
    this.setState({ showForm: !this.state.showForm });
    console.log("clicked");
  }
  handleSubmit = (event) => {
    console.log(this.state.initialValues.country, "con");
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
          location: {
            partcountry: this.state.initialValues.country,
            partstate: this.state.initialValues.state,
            partcitytamil: this.state.tamil,
            partcity: this.state.initialValues.city,
            partaddress: this.state.uaddress,
            partcountrycode: this.state.initialValues.countryCode,
            partstatecode: this.state.initialValues.stateCode,
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
    const { location } = this.context;
    if (location == "" || location == undefined || location == null) {
    } else {
      this.setState({
        initialValues: {
          country:
            location.partcountry == undefined ? "" : location.partcountry,
          state: location.partstate == undefined ? "" : location.partstate,
          city: location.partcity == undefined ? "" : location.partcity,
          countryCode:
            location.partcountrycode == undefined
              ? ""
              : location.partcountrycode,
          stateCode:
            location.partstatecode == undefined ? "" : location.partstatecode,
        },
        uaddress: location.partaddress == undefined ? "" : location.partaddress,
        tamil:
          location.partcitytamil == undefined ? "" : location.partcitytamil,
      });
    }
  }

  countries = Country.getAllCountries();

  updatedCountries = this.countries.map((country) => ({
    label: country.name,
    value: country.isoCode,
    ...country,
  }));

  updatedStates = (countryId) =>
    State.getStatesOfCountry(countryId).map((state) => ({
      label: state.name,
      value: state.name,
      ...state,
    }));
  updatedCities = (countryId, stateId) =>
    City.getCitiesOfState(countryId, stateId).map((city) => ({
      label: city.name,
      value: city.name,

      ...city,
    }));
  render() {
    console.log(this.state.initialValues, "val");
    const GroomDetailsSection = (
      <Row className="details-sec">
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Country</Col>
          <Col className="details-sec-info">
            {" "}
            {this.state.initialValues.country == "" ||
            this.state.initialValues.country == null ||
            this.state.initialValues.country == undefined
              ? "-"
              : this.state.initialValues.country}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">State</Col>
          <Col className="details-sec-info">
            {" "}
            {this.state.initialValues.state == "" ||
            this.state.initialValues.state == null ||
            this.state.initialValues.state == undefined
              ? "-"
              : this.state.initialValues.state}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">City</Col>
          <Col className="details-sec-info">
            {" "}
            {this.state.initialValues.state == "Tamil Nadu"
              ? this.state.tamil
              : this.state.initialValues.city == "" ||
                this.state.initialValues.city == null ||
                this.state.initialValues.city == undefined
              ? "-"
              : this.state.initialValues.city}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Address</Col>
          <Col className="details-sec-info">
            {" "}
            {this.state.uaddress == "" ? "-" : this.state.uaddress}
          </Col>
        </Col>
      </Row>
    );
    const GroomLocationForm = (
      <Form
        className="details-form"
        onSubmit={(e) => {
          this.handleSubmit(e);
        }}
      >
        <Form.Group as={Row} className="mb-2 input-center" controlId="ucountry">
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Country Living in
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              value={this.updatedCountries.find(
                (obj) => obj.label == this.state.initialValues.country
              )}
              options={this.updatedCountries}
              onChange={(e) => {
                console.log(e, "e");
                this.setState(
                  {
                    initialValues: {
                      country: e.name,
                      state: null,
                      city: null,
                      countryCode: e.isoCode,
                    },
                  },
                  function () {
                    console.log(this.state.initialValues);
                  }
                );
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 input-center" controlId="ustate">
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Residing State
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={this.updatedStates(
                this.state.initialValues.country
                  ? this.state.initialValues.countryCode
                  : null
              )}
              value={this.updatedStates(
                this.state.initialValues.countryCode
              ).find((obj) => obj.label == this.state.initialValues.state)}
              onChange={(e) => {
                console.log(e, "e");
                this.setState(
                  {
                    initialValues: {
                      country: this.state.initialValues.country,
                      state: e.name,
                      city: null,
                      stateCode: e.isoCode,
                      countryCode: this.state.initialValues.countryCode,
                    },
                  },
                  function () {
                    console.log(this.state.initialValues);
                  }
                );
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 input-center" controlId="ucity">
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Residing City/ District
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={
                this.state.initialValues.state == "Tamil Nadu"
                  ? CountryList
                  : this.updatedCities(
                      this.state.initialValues.state
                        ? this.state.initialValues.countryCode
                        : null,
                      this.state.initialValues.state
                        ? this.state.initialValues.stateCode
                        : null
                    )
              }
              value={
                this.state.initialValues.state == "Tamil Nadu"
                  ? CountryList.find((obj) => obj.value == this.state.tamil)
                  : this.updatedCities(
                      this.state.initialValues.countryCode,
                      this.state.initialValues.stateCode
                    ).find((obj) => obj.label == this.state.initialValues.city)
              }
              onChange={(e) => {
                console.log(e, "e");
                this.setState(
                  {
                    tamil: e.value,
                    initialValues: {
                      country: this.state.initialValues.country,
                      state: this.state.initialValues.state,
                      city: e.name,
                      stateCode: this.state.initialValues.stateCode,
                      countryCode: this.state.initialValues.countryCode,
                    },
                  },
                  function () {
                    console.log(this.state.tamil, "ta");
                  }
                );
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 input-center" controlId="uaddress">
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Address
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="address-text">
            <Form.Control
              required
              as="textarea"
              rows={3}
              value={this.state.uaddress}
              onChange={(e) => {
                this.setState({ uaddress: e.target.value });
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
          <Col
            lg={10}
            md={8}
            sm={6}
            xs={6}
            align="left"
            className="details-header"
          >
            <FontAwesomeIcon icon={faMapMarkerAlt} className="details-icon" />
            <Col className="detail-title">Groom Location</Col>
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
        {this.state.showForm ? GroomLocationForm : GroomDetailsSection}
      </Col>
    );
  }
}
GroomLocation.contextType = UserContext;
export default GroomLocation;
