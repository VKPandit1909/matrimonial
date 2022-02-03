import React, { Component } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Button, Form, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faSearch,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Select from "react-select";
import { connect } from "react-redux";
import { filterValues, fetchUsers } from "../Service/Actions/Actions";
import { Tab, Tabs } from "react-bootstrap";

const raasiList = [
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
const doshamList = [
  { label: "Don't Know", value: "Don't Know" },
  { label: "No", value: "No" },
  { label: "Chevvai", value: "Chevvai" },
  { label: "Rahu & Kethu", value: "Rahu & Kethu" },
  { label: "Parikara Chevvai", value: "Parikara Chevvai" },
];
const KulamList = [
  { label: "Mesham", value: "Mesham" },
  { label: "Tula", value: "Tula" },
  { label: "Dhanus", value: "Dhanus" },
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
class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lgender: "Male",
      lkulam: "",
      lrassi: "",
      ldosham: "",
      validated: false,
      loggedIn: false,
      lhoroscope: "",
      uid: [],
      lunique: "",
    };
  }
  onSubmit(e) {
    e.preventDefault();
  }
  componentDidMount() {
    console.log(this.props.userData, "Unique");
    // setTimeout(() => {
    const a = this.props.userData.map((item) => item._id);

    const uidList = [];
    for (let i = 0; i <= a.length; i++) {
      uidList.push({
        label: a[i],
        value: a[i],
      });
    }

    this.setState({
      uid: uidList,
    });
    // }, 1000);
  }
  render() {
    return (
      <div>
        <div className="check-eligible">
          <Row className="mb-3">
            <Col md={3}></Col>
            <Col md={6}>
              <h2 align="center">
                Are you very serious about Marriage? Join our 100% Guarantee
                Program
              </h2>
            </Col>
            <Col md={3}></Col>
          </Row>
          <Row>
            <Col md={3}></Col>
            <Col md={6} align="center">
              <Button
                type="submit"
                onClick={() => {
                  window.location.href = "/register";
                }}
              >
                Check Eligibility
              </Button>
            </Col>
            <Col md={3}></Col>
          </Row>
        </div>
        <div className="right-search">
          <Row>
            <Col className="mb-3">
              <h2 align="center">Life starts with the right search...</h2>
            </Col>
            <Tabs
              defaultActiveKey="AllSearch"
              id="uncontrolled-tab-example"
              className="mb-3 content-tab"
            >
              <Tab
                eventKey="AllSearch"
                title="Search By Details"
                className="tab-btn"
              >
                <Form onSubmit={this.onSubmit}>
                  <Row className="mb-3 content-form">
                    <Col lg={4}>
                      <Form.Group as={Col} controlId="lookGender">
                        <Form.Label>I'm looking for a</Form.Label>
                        <Form.Select
                          defaultValue="Male"
                          placeholder="select"
                          onChange={(e) => {
                            this.setState({ lgender: e.target.value });
                          }}
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col lg={4}>
                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Horoscope</Form.Label>
                        <Select
                          options={astrologyList}
                          isSearchable={true}
                          isMulti
                          value={astrologyList.filter((obj) =>
                            this.state.lhoroscope.includes(obj.value)
                          )}
                          onChange={(e) =>
                            this.setState({
                              lhoroscope: Array.isArray(e)
                                ? e.map((x) => x.value)
                                : [],
                            })
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Raasi</Form.Label>
                        <Select
                          options={raasiList}
                          isSearchable={true}
                          isMulti
                          value={raasiList.filter((obj) =>
                            this.state.lrassi.includes(obj.value)
                          )}
                          onChange={(e) =>
                            this.setState({
                              lrassi: Array.isArray(e)
                                ? e.map((x) => x.value)
                                : [],
                            })
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4} style={{ marginTop: 10 }}>
                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Dosham</Form.Label>
                        <Select
                          options={doshamList}
                          isSearchable={true}
                          isMulti
                          value={doshamList.filter((obj) =>
                            this.state.ldosham.includes(obj.value)
                          )}
                          onChange={(e) =>
                            this.setState({
                              ldosham: Array.isArray(e)
                                ? e.map((x) => x.value)
                                : [],
                            })
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4} style={{ marginTop: 10 }}>
                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Kulam Temple</Form.Label>
                        <Select
                          options={KulamList}
                          isSearchable={true}
                          isMulti
                          value={KulamList.filter((obj) =>
                            this.state.lkulam.includes(obj.value)
                          )}
                          onChange={(e) =>
                            this.setState({
                              lkulam: Array.isArray(e)
                                ? e.map((x) => x.value)
                                : [],
                            })
                          }
                        />
                      </Form.Group>
                    </Col>

                    <Col lg={4}></Col>
                    <Col lg={4}></Col>
                    <Col lg={4}>
                      <Form.Group
                        as={Col}
                        className="content-form-btn"
                        controlId="formGridPassword"
                      >
                        <Link
                          className="content-form-btn1"
                          to={{
                            pathname: "./content",
                            state: {
                              gender: this.state.lgender,
                              raasi: this.state.lrassi,
                              dosham: this.state.ldosham,
                              kulam: this.state.lkulam,
                              horo: this.state.lhoroscope,
                              uniqueID: this.state.lunique,
                            },
                          }}
                        >
                          <Button
                            type="submit"
                            className="mt_30 "
                            style={{ width: "100%" }}
                          >
                            Let's Begin
                          </Button>
                        </Link>
                      </Form.Group>
                    </Col>
                    <Col lg={4}></Col>
                  </Row>
                </Form>
              </Tab>
              <Tab eventKey="SearchByID" title="Search By Unique Id">
                <Form onSubmit={this.onSubmit}>
                  <Row className="mb-3 content-form">
                    <Col lg={4}>
                      <Form.Group as={Col} controlId="lookGender">
                        <Form.Label>I'm looking for a</Form.Label>
                        <Form.Select
                          defaultValue="Male"
                          placeholder="select"
                          onChange={(e) => {
                            this.setState({ lgender: e.target.value });
                          }}
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Search By Unique Id</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter unique id"
                          name="uid"
                          value={this.state.lunique}
                          onChange={(e) =>
                            this.setState({ lunique: e.target.value })
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group
                        as={Col}
                        className="content-form-btn"
                        controlId="formGridPassword"
                      >
                        <Link
                          className="content-form-btn1"
                          to={{
                            pathname: "./content",
                            state: {
                              gender: this.state.lgender,
                              uniqueID: this.state.lunique,
                            },
                          }}
                        >
                          <Button
                            type="submit"
                            className="mt_30 "
                            style={{ width: "100%" }}
                          >
                            Let's Begin
                          </Button>
                        </Link>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Tab>
            </Tabs>
          </Row>
        </div>
        <div className="find-someone">
          <Row className="mb-3">
            <Col md={12}>
              <h2 align="center" className="white_clr">
                Get Married in 3 easy steps
              </h2>
            </Col>
          </Row>
          <Row align="center">
            <Col md={4}>
              <FontAwesomeIcon icon={faUserPlus} className="mb-3 icon" />
              <h3 className="white_clr">Sign Up</h3>
              <p className="white_clr">Register for free and get verified</p>
            </Col>
            <Col md={4}>
              <FontAwesomeIcon icon={faSearch} className="mb-3 icon" />
              <h3 className="white_clr">Discover</h3>
              <p className="white_clr">Look for the love of your life</p>
            </Col>
            <Col md={4}>
              <FontAwesomeIcon icon={faComment} className="mb-3 icon" />
              <h3 className="white_clr">Connect</h3>
              <p className="white_clr">Communicate with the Matches you like</p>
            </Col>
          </Row>
        </div>
        <div className="above_foot">
          <Container>
            <h5 className="mb-3">
              Ganeshkongumatrimony helps you to connect with the perfect life
              partner
            </h5>
            <p>
              <strong>
                Ganeshkongumatrimony is free to register. It's fast and easy. It
                offers unmatched experience in finding the perfect life partner.
              </strong>
            </p>
            <p>
              <strong>
                We offer superior service and customer satisfaction. Our firm
                commitment towards building and maintaining strong customer
                relationship has resulted in our position as one of the fastest
                growing online matrimonial service provider.
              </strong>
            </p>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.user.filteredVals, "statecompx");
  return { userData: state.user.users };
};
const mapDispatchToProps = (dispatch) => {
  return {
    filterValues: (value) => dispatch(filterValues(value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Content);
