import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faUsers } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import UserContext from "../Context/UserContext";
import { message } from "antd";

const ResidingCityList = [
  { label: "Select", value: "" },
  { label: "Chennai", value: "Chennai" },
  { label: "Mumbai", value: "Mumbai" },
  { label: "Srinagar", value: "Srinagar" },
];
const FamilyTypeList = [
  { label: "Select", value: "" },
  { label: "Joint Family", value: "Joint Family" },
  { label: "Nuclear Family", value: "Nuclear Family" },
  { label: "Others", value: "Others" },
];

const FamilyStatusList = [
  { label: "Select", value: "" },
  { label: "Middle Class", value: "Middle Class" },
  { label: "Upper Middle Class", value: "Upper Middle Class" },
  { label: "Rich", value: "Rich" },
  { label: "Affluent", value: "Affluent" },
];
const PAlive = [
  { label: "Select", value: "" },
  { label: "Yes", value: "Yes" },
  { label: "Late", value: "Late" },
];

const AssetsList = [
  { label: "Select", value: "" },
  { label: "less then 1 Crore", value: "1" },
  { label: "1 Crore - 2 Crore", value: "2" },
  { label: "2 Crore - 3 Crore", value: "3" },
  { label: "3 Crore - 4 Crore", value: "4" },
  { label: "4 Crore - 5 Crore", value: "5" },
  { label: "5 Crore - 6 Crore", value: "6" },
  { label: "6 Crore - 7 Crore", value: "7" },
  { label: "7 Crore - 8 Crore", value: "8" },
  { label: "8 Crore - 9 Crore", value: "9" },
  { label: "9 Crore - 10 Crore", value: "10" },
  { label: "10 Crore - 15 Crore", value: "15" },
  { label: "15 Crore - 20 Crore", value: "20" },
  { label: "20 Crore - 25 Crore", value: "25" },
  { label: "25 Crore - 30 Crore", value: "30" },
  { label: "30 Crore - 50 Crore", value: "50" },
  { label: "50 Crore - 75 Crore", value: "75" },
  { label: "75 Crore - 100 Crore", value: "100" },
  { label: "100 Crore - 200 Crore", value: "200" },
  { label: "200 Crore - 500 Crore", value: "500" },
  { label: "500 Crore - 750 Crore", value: "750" },
  { label: "750 Crore - 1000 Crore", value: "1000" },
];

class FamilyDetails extends React.Component {
  constructor(props) {
    super(props);
    this.changeSection = this.changeSection.bind(this);
    this.state = {
      showForm: false,
      ufathername: "",
      ufalive: [""],
      umalive: [""],
      umothername: "",
      ufamilyvalues: "",
      ufamilytype: "",
      ufamilystatus: "",
      uresidingcity: "",
      ufatherstatus: "",
      umotherstatus: "",
      unoofbrother: "",
      ubrothermarried: "",
      unoofsister: "",
      usistermarried: "",
      uownhouse: "",
      uland: "",
      uassets: "",
      uaddress: "",
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
          family: {
            partfathername: this.state.ufathername,
            partmothername: this.state.umothername,
            partfamilyvalue: this.state.ufamilyvalues,
            partfalive: this.state.ufalive,
            partmalive: this.state.umalive,

            partfamilytype: this.state.ufamilytype,
            partfamilystatus: this.state.ufamilystatus,
            partresidingcity: this.state.uresidingcity,
            partfatherstatus: this.state.ufatherstatus,
            partmotherstatus: this.state.umotherstatus,
            partnoofbrother: this.state.unoofbrother,
            partnoofsister: this.state.unoofsister,
            partbrothermarried: this.state.ubrothermarried,
            partsistermarried: this.state.usistermarried,
            partownhouse: this.state.uownhouse,
            partland: this.state.uland,
            partassets: this.state.uassets,
            partaddress: this.state.uaddress,
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
    const { family } = this.context;
    if (family == "" || family == undefined || family == null) {
    } else {
      this.setState({
        ufathername:
          family.partfathername == undefined ? "" : family.partfathername,
        umothername:
          family.partmothername == undefined ? "" : family.partmothername,
        ufalive: family.partfalive == undefined ? "" : family.partfalive,
        umalive: family.partmalive == undefined ? "" : family.partmalive,
        ufamilyvalues:
          family.partfamilyvalue == undefined ? "" : family.partfamilyvalue,
        ufamilytype:
          family.partfamilytype == undefined ? "" : family.partfamilytype,
        ufamilystatus:
          family.partfamilystatus == undefined ? "" : family.partfamilystatus,
        uresidingcity:
          family.partresidingcity == undefined ? "" : family.partresidingcity,
        ufatherstatus:
          family.partfatherstatus == undefined ? "" : family.partfatherstatus,
        umotherstatus:
          family.partmotherstatus == undefined ? "" : family.partmotherstatus,
        unoofbrother:
          family.partnoofbrother == undefined ? "" : family.partnoofbrother,
        unoofsister:
          family.partnoofsister == undefined ? "" : family.partnoofsister,
        ubrothermarried:
          family.partbrothermarried == undefined
            ? ""
            : family.partbrothermarried,
        usistermarried:
          family.partsistermarried == undefined ? "" : family.partsistermarried,
        uownhouse: family.partownhouse == undefined ? "" : family.partownhouse,
        uland: family.partland == undefined ? "" : family.partland,
        uassets: family.partassets == undefined ? "" : family.partassets,
        uaddress: family.partaddress == undefined ? "" : family.partaddress,
      });
    }
  }

  render() {
    // const AssetsList = [];
    // for (let i = 20; i <= 999; i++) {
    //   AssetsList.push({
    //     label: `${i} Lakh`,
    //     value: `${i} Lakh`,
    //   });
    // }
    const FamilyDetailsSection = (
      <Row className="details-sec">
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Father's Name</Col>
          <Col className="details-sec-info">
            {this.state.ufathername == "" ? "-" : this.state.ufathername}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Mother's Name</Col>
          <Col className="details-sec-info">
            {this.state.umothername == "" ? "-" : this.state.umothername}
          </Col>
        </Col>

        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Family Type</Col>
          <Col className="details-sec-info">
            {this.state.ufamilytype == "" ? "-" : this.state.ufamilytype}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Family Status</Col>
          <Col className="details-sec-info">
            {this.state.ufamilystatus == "" ? "-" : this.state.ufamilystatus}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Family Location</Col>
          <Col className="details-sec-info">
            {this.state.uresidingcity == "" ? "-" : this.state.uresidingcity}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">No of Brother(s)</Col>
          <Col className="details-sec-info">
            {this.state.unoofbrother == "" ? "-" : this.state.unoofbrother}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">No of Sister(s)</Col>
          <Col className="details-sec-info">
            {this.state.unoofsister == "" ? "-" : this.state.unoofsister}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Father's Status</Col>
          <Col className="details-sec-info">
            {this.state.ufatherstatus == "" ? "-" : this.state.ufatherstatus}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Mother's Status</Col>
          <Col className="details-sec-info">
            {this.state.umotherstatus == "" ? "-" : this.state.umotherstatus}
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
          <Col className="details-sec-title">Approximate Assets(Lakhs)</Col>
          <Col className="details-sec-info">
            {this.state.uassets == "" ? "-" : this.state.uassets}
          </Col>
        </Col>
        <Col lg={3} className="details-sec-content">
          <Col className="details-sec-title">Address</Col>
          <Col className="details-sec-info">
            {this.state.uaddress == "" ? "-" : this.state.uaddress}
          </Col>
        </Col>
      </Row>
    );
    const FamilyDetailsForm = (
      <Form
        className="details-form"
        onSubmit={(e) => {
          this.handleSubmit(e);
        }}
      >
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="ufathersname"
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
            Father's Name
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8">
            <Form.Control
              className="detail-form-input"
              required
              type="text"
              name="ufathersname"
              placeholder="Father's Name "
              value={this.state.ufathername}
              onChange={(e) => {
                this.setState({ ufathername: e.target.value });
              }}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2 input-center" controlId="ufathers">
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Father(Alive)
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={PAlive}
              isSearchable={true}
              value={PAlive.find((obj) => obj.value == this.state.ufalive)}
              onChange={(e) => {
                this.setState({
                  ufalive: e.value,
                });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="umothersname"
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
            Mother's Name
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8">
            <Form.Control
              className="detail-form-input"
              required
              type="text"
              name="umothersname"
              placeholder="Mother's Name "
              value={this.state.umothername}
              onChange={(e) => {
                this.setState({ umothername: e.target.value });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 input-center" controlId="ufathers">
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Mother(Alive)
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={PAlive}
              isSearchable={true}
              value={PAlive.find((obj) => obj.value == this.state.umalive)}
              onChange={(e) => {
                this.setState({
                  umalive: e.value,
                });
              }}
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="ufamilytype"
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
            Family Type
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={FamilyTypeList}
              isSearchable={true}
              value={FamilyTypeList.find(
                (obj) => obj.value == this.state.ufamilytype
              )}
              onChange={(e) => {
                this.setState({
                  ufamilytype: e.value,
                });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="ufamilystatus"
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
              className="detail-form-input"
              options={FamilyStatusList}
              isSearchable={true}
              value={FamilyStatusList.find(
                (obj) => obj.value == this.state.ufamilystatus
              )}
              onChange={(e) => {
                this.setState({
                  ufamilystatus: e.value,
                });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="uresidingcity"
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
            Residing City/ District
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={ResidingCityList}
              isSearchable={true}
              value={ResidingCityList.find(
                (obj) => obj.value == this.state.uresidingcity
              )}
              onChange={(e) => {
                this.setState({
                  uresidingcity: e.value,
                });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="ufatherstatus"
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
            Father's Status
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8">
            <Form.Control
              className="detail-form-input "
              required
              type="text"
              name="ufatherstatus"
              placeholder="eg. Driver, Business "
              value={this.state.ufatherstatus}
              onChange={(e) => {
                this.setState({ ufatherstatus: e.target.value });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="umotherstatus"
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
            Mother's Status
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8">
            <Form.Control
              className="detail-form-input "
              required
              type="text"
              name="umotherstatus"
              placeholder=" eg. House Wife"
              value={this.state.umotherstatus}
              onChange={(e) => {
                this.setState({ umotherstatus: e.target.value });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="ubrothers"
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
            Brother's
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8">
            <Row>
              <Col>
                <Form.Label className="details-form-label">
                  No Of Brother's
                </Form.Label>
                <Form.Control
                  className="detail-form-input "
                  required
                  type="number"
                  name="unoofbrothers"
                  placeholder=" "
                  value={this.state.unoofbrother}
                  onChange={(e) => {
                    this.setState({ unoofbrother: e.target.value });
                  }}
                />
              </Col>
              <Col>
                <Form.Label className="details-form-label">
                  Brother's Married
                </Form.Label>
                <Form.Control
                  className="detail-form-input"
                  required
                  type="number"
                  name="ubrothermarried"
                  placeholder=" "
                  value={this.state.ubrothermarried}
                  onChange={(e) => {
                    this.setState({ ubrothermarried: e.target.value });
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 input-center" controlId="usister">
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Sister's
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8">
            <Row>
              <Col>
                <Form.Label className="details-form-label">
                  No Of Sister's
                </Form.Label>
                <Form.Control
                  className="detail-form-input "
                  required
                  type="number"
                  name="unoofsisters"
                  placeholder=" "
                  value={this.state.unoofsister}
                  onChange={(e) => {
                    this.setState({ unoofsister: e.target.value });
                  }}
                />
              </Col>
              <Col>
                <Form.Label className="details-form-label">
                  Sister's Married
                </Form.Label>
                <Form.Control
                  className="detail-form-input"
                  required
                  type="number"
                  name="usistermarried"
                  placeholder=" "
                  value={this.state.usistermarried}
                  onChange={(e) => {
                    this.setState({ usistermarried: e.target.value });
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 input-center" controlId="uhouse">
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
          <Col sm="12" lg="8" xs="12" md="8" className="detail-radio-btn">
            <Form.Check
              required
              inline
              label="Yes"
              name="uhouse"
              value="Yes"
              checked={this.state.uownhouse === "Yes"}
              onChange={(e) => {
                this.setState({ uownhouse: e.target.value });
              }}
              type="radio"
              id={`house-radio-1`}
              className="details-form-radio"
            />
            <Form.Check
              required
              inline
              label="No"
              name="uhouse"
              value="No"
              checked={this.state.uownhouse === "No"}
              onChange={(e) => {
                this.setState({ uownhouse: e.target.value });
              }}
              type="radio"
              id={`house-radio-2`}
              className="details-form-radio"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 input-center" controlId="uland">
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
              name="uland"
              placeholder=" "
              value={this.state.uland}
              onChange={(e) => {
                this.setState({ uland: e.target.value });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 input-center" controlId="uassets">
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Approximate Assets(in Lakhs)
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8" className="details-select">
            <Select
              className="detail-form-input"
              options={AssetsList}
              placeholder="eg. 10 Lakh"
              isSearchable={true}
              value={AssetsList.find((obj) => obj.value == this.state.uassets)}
              onChange={(e) => {
                this.setState({ uassets: e.label });
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
              name="uaddress"
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
            <FontAwesomeIcon icon={faUsers} className="details-icon" />
            <Col className="detail-title">Family Details</Col>
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
        {this.state.showForm ? FamilyDetailsForm : FamilyDetailsSection}
      </Col>
    );
  }
}
FamilyDetails.contextType = UserContext;
export default FamilyDetails;
