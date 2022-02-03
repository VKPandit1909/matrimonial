import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../Context/UserContext";
import { message } from "antd";

class AboutOurFamily extends React.Component {
  constructor(props) {
    super(props);
    this.changeSection = this.changeSection.bind(this);
    this.state = {
      showForm: false,
      uaboutfamily: "",
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
          aboutfamily: this.state.uaboutfamily,
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
    const { details } = this.context;
    if (details == "" || details == undefined || details == null) {
    } else {
      this.setState({
        uaboutfamily:
          details.aboutfamily == undefined ? "" : details.aboutfamily,
      });
    }
  }

  render() {
    const AboutFamilySection = (
      <Col style={{ height: 40 }}>
        {this.state.uaboutfamily == ''? "-" : this.state.uaboutfamily}
      </Col>
    );
    const AboutFamilyForm = (
      <Form
        className="details-form"
        onSubmit={(e) => {
          this.handleSubmit(e);
        }}
      >
        <Form.Group className="mb-3" controlId="aboutorfamily">
          <Form.Control
            required
            as="textarea"
            rows={3}
            name="uaddress"
            value={this.state.uaboutfamily}
            onChange={(e) => {
              this.setState({ uaboutfamily: e.target.value });
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
            <FontAwesomeIcon icon={faUsers} className="details-icon" />
            <Col className="detail-title">About Our Family</Col>
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

        {this.state.showForm ? AboutFamilyForm : AboutFamilySection}
      </Col>
    );
  }
}
AboutOurFamily.contextType = UserContext;
export default AboutOurFamily;
