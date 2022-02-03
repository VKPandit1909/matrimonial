import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { message } from "antd";

import UserContext from "../Context/UserContext";


class ContactDetails extends React.Component {
  constructor(props) {
    super(props);
    this.changeSection = this.changeSection.bind(this);
    this.state = {
      showForm: false,
      uprirelation:'',
      uprimobile:'',
      upriemail:'',
      usecrelation:'',
      usecmobile:'',
      usecemail:'',
      uterrelation:'',
      utermobile:'',
      uteremail:''
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
          contact: {
           prirelation:this.state.uprirelation,
           primobile:this.state.uprimobile,
           priemail:this.state.upriemail,
           secrelation:this.state.usecrelation,
           secmobile:this.state.usecmobile,
           secemail:this.state.usecemail,
           terrelation:this.state.uterrelation,
           termobile:this.state.utermobile,
           teremail:this.state.uteremail,

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
    const { details, contact } =
      this.context;
      console.log(details.mobile,'mobile')
    if (contact == "" || contact == undefined || contact == null) {
    } else {
      this.setState({
       
        uprirelation: contact.prirelation== undefined ? "" : contact.prirelation,
        uprimobile: details.mobile== undefined ? "" : details.mobile,
        upriemail: details.email==undefined? "":details.email,
        usecrelation: contact.secrelation== undefined ? "" : contact.secrelation,
        usecmobile: contact.secmobile== undefined ? "" : contact.secmobile,
        usecemail: contact.secemail== undefined ? "" : contact.secemail,
        uterrelation: contact.terrelation== undefined ? "" : contact.terrelation,
        utermobile: contact.termobile== undefined ? "" : contact.termobile,
        uteremail: contact.teremail== undefined ? "" : contact.teremail,
      });
     
    }
    console.log(this.state.upriemail,'email')
    console.log(this.state.uprimobile,'email')
  }

  render() {
    const ContactDetails=(
      <Row className="details-sec">
      <Col lg={3} className="details-sec-content">
        <Col className="details-sec-title">Relationship</Col>
        <Col className="details-sec-info"> {this.state.uprirelation == "" ? "-" : this.state.uprirelation}</Col>
      </Col>
      <Col lg={3} className="details-sec-content">
        <Col className="details-sec-title">Mobile</Col>
        <Col className="details-sec-info">{this.context.details.mobile}</Col>
      </Col>
      <Col lg={3} className="details-sec-content">
        <Col className="details-sec-title">E-mail ID</Col>
        <Col className="details-sec-info">{this.state.upriemail == "" ? "-" : this.state.upriemail}</Col>
      </Col>
      <Col lg={3} className="details-sec-content">
        <Col className="details-sec-title"></Col>
        <Col className="details-sec-info"></Col>
      </Col>
      <Col lg={3} className="details-sec-content">
        <Col className="details-sec-title">Relationship</Col>
        <Col className="details-sec-info">{this.state.usecrelation == "" ? "-" : this.state.usecrelation}</Col>
      </Col>
      <Col lg={3} className="details-sec-content">
        <Col className="details-sec-title">Mobile</Col>
        <Col className="details-sec-info">{this.state.usecmobile == "" ? "-" : this.state.usecmobile}</Col>
      </Col>
      <Col lg={3} className="details-sec-content">
        <Col className="details-sec-title">E-mail ID</Col>
        <Col className="details-sec-info">{this.state.usecemail == "" ? "-" : this.state.usecemail}</Col>
      </Col>
      <Col lg={3} className="details-sec-content">
        <Col className="details-sec-title"></Col>
        <Col className="details-sec-info"></Col>
      </Col>
      <Col lg={3} className="details-sec-content">
        <Col className="details-sec-title">Relationship</Col>
        <Col className="details-sec-info">{this.state.uterrelation == "" ? "-" : this.state.uterrelation}</Col>
      </Col>
      <Col lg={3} className="details-sec-content">
        <Col className="details-sec-title">Mobile</Col>
        <Col className="details-sec-info">{this.state.utermobile == "" ? "-" : this.state.utermobile}</Col>
      </Col>
      <Col lg={3} className="details-sec-content">
        <Col className="details-sec-title">E-mail ID</Col>
        <Col className="details-sec-info">{this.state.uteremail == "" ? "-" : this.state.uteremail}</Col>
      </Col>
      <Col lg={3} className="details-sec-content">
        <Col className="details-sec-title"></Col>
        <Col className="details-sec-info"></Col>
      </Col>
    </Row>
  );

    
    const ContactDetailForm = (
      <Form
        className="details-form"
        onSubmit={(e) => {
          this.handleSubmit(e);
        }}
      >
        <Form.Label className='contact-label'>Primary Contact</Form.Label>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="prirelation"
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
            Relationship
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8">
            <Form.Check
              required
              inline
              label="Self"
              name="contactdetails"
              value="Self"
                checked={this.state.uprirelation === "Self"}
                onChange={(e) => {
                  this.setState({ uprirelation: e.target.value });
                }}
              type="radio"
              id={`contact-radio-1`}
              className="details-form-radio"
            />
            <Form.Check
              required
              inline
              label="Father"
              name="contactdetails"
              value="Father"
                checked={this.state.uprirelation === "Father"}
                onChange={(e) => {
                  this.setState({ uprirelation: e.target.value });
                }}
              type="radio"
              id={`contact-radio-2`}
              className="details-form-radio"
            />
            <Form.Check
              required
              inline
              label="Mother"
              name="contactdetails"
              value="Mother"
                checked={this.state.uprirelation === "Mother"}
                onChange={(e) => {
                  this.setState({ uprirelation: e.target.value });
                }}
              type="radio"
              id={`contact-radio-3`}
              className="details-form-radio"
            />
            <Form.Check
              required
              inline
              label="Others"
              name="contactdetails"
              value="Others"
                checked={this.state.uprirelation === "Others"}
                onChange={(e) => {
                  this.setState({ uprirelation: e.target.value });
                }}
              type="radio"
              id={`contact-radio-4`}
              className="details-form-radio"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 input-center" controlId="prmobile">
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Mobile
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8">
            <Form.Control
              className="detail-form-input"
              required
              type="text"
              name="umobiledetail"
              disabled

                value={this.context.details.mobile}
                onChange={(e) => {
                  this.setState({ uprimobile: e.target.value });
                }}
            />
          </Col>
         
        </Form.Group>
        <Form.Group as={Row} className="mb-2 input-center" controlId="premail">
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Email
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8">
            <Form.Control
              className="detail-form-input"
              required
              type="email"
              name="uemaildetail"
              placeholder="Email"
                value={this.state.upriemail}
                onChange={(e) => {
                  this.setState({ upriemail: e.target.value });
                }}
            />
          </Col>
        </Form.Group>
        {/* secondary Contact */}

        <Form.Label className='contact-label'>Secondary Contact</Form.Label>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="secrelation"
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
            Relationship
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8">
            <Form.Check
              required
              inline
              label="Self"
              name="seccontactdetails"
              value="Self"
                checked={this.state.usecrelation === "Self"}
                onChange={(e) => {
                  this.setState({ usecrelation: e.target.value });
                }}
              type="radio"
              id={`seccontact-radio-1`}
              className="details-form-radio"
            />
            <Form.Check
              required
              inline
              label="Father"
              name="seccontactdetails"
              value="Father"
                checked={this.state.usecrelation === "Father"}
                onChange={(e) => {
                  this.setState({ usecrelation: e.target.value });
                }}
              type="radio"
              id={`seccontact-radio-2`}
              className="details-form-radio"
            />
            <Form.Check
              required
              inline
              label="Mother"
              name="seccontactdetails"
              value="Mother"
                checked={this.state.usecrelation === "Mother"}
                onChange={(e) => {
                  this.setState({ usecrelation: e.target.value });
                }}
              type="radio"
              id={`seccontact-radio-3`}
              className="details-form-radio"
            />
            <Form.Check
              required
              inline
              label="Others"
              name="seccontactdetails"
              value="Others"
                checked={this.state.usecrelation === "Others"}
                onChange={(e) => {
                  this.setState({ usecrelation: e.target.value });
                }}
              type="radio"
              id={`seccontact-radio-4`}
              className="details-form-radio"
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="secmobile"
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
            Mobile
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8">
            <Form.Control
              className="detail-form-input"
              required
              type="text"
              name="secumobiledetail"

                value={this.state.usecmobile}
                onChange={(e) => {
                  this.setState({ usecmobile: e.target.value });
                }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 input-center" controlId="secemail">
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Email
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8">
            <Form.Control
              className="detail-form-input"
              required
              type="email"
              name="secemaildetail"
              placeholder="Email"
                value={this.state.usecemail}
                onChange={(e) => {
                  this.setState({ usecemail: e.target.value });
                }}
            />
          </Col>
        </Form.Group>
        {/* Tertiary contact Details */}
        <Form.Label className='contact-label'>Tertiary Contact</Form.Label>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="prirelation"
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
            Relationship
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8">
            <Form.Check
              required
              inline
              label="Self"
              name="tercontactdetails"
              value="Self"
                checked={this.state.uterrelation === "Self"}
                onChange={(e) => {
                  this.setState({ uterrelation: e.target.value });
                }}
              type="radio"
              id={`tercontact-radio-1`}
              className="details-form-radio"
            />
            <Form.Check
              required
              inline
              label="Father"
              name="tercontactdetails"
              value="Father"
                checked={this.state.uterrelation === "Father"}
                onChange={(e) => {
                  this.setState({ uterrelation: e.target.value });
                }}
              type="radio"
              id={`tercontact-radio-2`}
              className="details-form-radio"
            />
            <Form.Check
              required
              inline
              label="Mother"
              name="tercontactdetails"
              value="Mother"
                checked={this.state.uterrelation === "Mother"}
                onChange={(e) => {
                  this.setState({ uterrelation: e.target.value });
                }}
              type="radio"
              id={`tercontact-radio-3`}
              className="details-form-radio"
            />
            <Form.Check
              required
              inline
              label="Others"
              name="tercontactdetails"
              value="Others"
                checked={this.state.uterrelation === "Others"}
                onChange={(e) => {
                  this.setState({ uterrelation: e.target.value });
                }}
              type="radio"
              id={`tercontact-radio-4`}
              className="details-form-radio"
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2 input-center"
          controlId="termobile"
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
            Mobile
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8">
            <Form.Control
              className="detail-form-input"
              required
              type="text"
              name="termobiledetail"

                value={this.state.utermobile}
                onChange={(e) => {
                  this.setState({ utermobile: e.target.value });
                }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 input-center" controlId="teremail">
          <Form.Label
            column
            sm="12"
            lg="4"
            xs="12"
            md="4"
            className="details-form-label"
          >
            <sup>*</sup>
            Email
          </Form.Label>
          <Col sm="12" lg="8" xs="12" md="8">
            <Form.Control
              className="detail-form-input"
              required
              type="email"
              name="teremaildetail"
              placeholder="Email"
                value={this.state.uteremail}
                onChange={(e) => {
                  this.setState({ uteremail: e.target.value });
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
          <Col  lg={10}
            md={8}
            sm={6}
            xs={6}
            align="left"
            className="details-header">
            <FontAwesomeIcon icon={faAddressBook} className="details-icon" />
            <Col className="detail-title">Contact Details</Col>
          </Col>
          <Col  lg={2}
            md={4}
            sm={6}
            xs={6}
            align="right"
            className="details-edit-button">
            <Button
              onClick={() => {
                this.changeSection();
              }}
            >
              Edit
            </Button>
          </Col>
        </Row>
        {this.state.showForm ? ContactDetailForm : ContactDetails}
      </Col>
    );
  }
}
ContactDetails.contextType=UserContext;
export default ContactDetails;
