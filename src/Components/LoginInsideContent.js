import "../App.css";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import Dosham from "../Filters/Dosham";
import ShowOnly from "../Filters/ShowOnly";
import MaritalStatus from "../Filters/MaritalStatus";
import DontShow from "../Filters/DontShow";
import Education from "../Filters/Education";
import Sector from "../Filters/Sector";
import PhysicalStatus from "../Filters/PhysicalStatus";
import Reservation from "../Filters/Horoscopic";
import Age from "../Filters/Age";
import Height from "../Filters/Height";
import Nakshatra from "../Filters/Nakshatra";
import Country from "../Filters/Country";
import State from "../Filters/State";
import District from "../Filters/District";
import Industry from "../Filters/Industry";
import Income from "../Filters/Income";
import Complexion from "../Filters/Complexion";
import BodyType from "../Filters/BodyType";
import EatingHabits from "../Filters/EatingHabits";
import OwnHouse from "../Filters/OwnHouse";
import MarriageInfo from "./MarriageInfo";
import Support from "./Support";
import LoginInsideHeader from "./LoginInsideHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

import Header from "./Header";
import Name from "../Filters/Name";
import Footer from "./Footer";
import Gender from "../Filters/Gender";
import Raasi from "../Filters/Raasi";
import Kulam from "../Filters/Kulam";
import UniqueId from "../Filters/UniqueId";
import Horo from "../Filters/Horo";

class LoginInsideContent extends Component {
  constructor(props) {
    super(props);
    this.myFunction = this.myFunction.bind(this);
  }
  loggedIn = window.localStorage.getItem("isLoggedIn");
  userType = window.localStorage.getItem("UserType");

  y = window.matchMedia("(max-width: 991px)");
  myFunction() {
    console.log("clicked");
    var x = document.getElementById("myDIV");
    if (this.y.matches) {
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    } else {
      console.log("error");
    }
  }

  render() {
    let stateGender = this.props.location.state;
    console.log(stateGender, "gen");

    console.log(this.userType, "user");
    const handleFilters = (filters, category) => {
      console.log(filters, "log-filter");
    };

    return (
      <div>
        {this.loggedIn ? <LoginInsideHeader /> : <Header />}
        {this.userType == "paid" ? (
          <Container style={{ marginBottom: 20 }}>
            <Row className="main-container">
              <Col lg={3} sm={12} className="main-left-cont">
                <Col className="filter">
                  <div
                    style={{ fontSize: 18, fontWeight: 500, letterSpacing: 1 }}
                  >
                    Filters
                  </div>
                </Col>
                <Col
                  className="filter-1"
                  style={{ display: "none" }}
                  onClick={() => this.myFunction()}
                >
                  <div
                    className="icon-div-filter"
                    onClick={() => console.log("right")}
                  >
                    <FontAwesomeIcon
                      icon={faCaretRight}
                      className="icon-down"
                    />
                  </div>
                  <div
                    style={{ fontSize: 18, fontWeight: 500, letterSpacing: 1 }}
                  >
                    Filters
                  </div>
                </Col>
                <div className="filter-sec" id="myDIV">
                  {this.loggedIn ? (
                    ""
                  ) : (
                    <Gender Ugender={this.props.location.state.gender} />
                  )}
                  <UniqueId
                    uniqueID={
                      this.props.location.state == undefined
                        ? ""
                        : this.props.location.state.uniqueID
                    }
                  />
                  <Name />
                  <Dosham
                    dosham={
                      this.props.location.state == undefined
                        ? ""
                        : this.props.location.state.dosham
                    }
                  />
                  <Horo
                    horo={
                      this.props.location.state == undefined
                        ? ""
                        : this.props.location.state.horo
                    }
                  />
                  {/* <Reservation /> */}
                  <Age />
                  <Height />

                  <ShowOnly />
                  <Raasi
                    raasi={
                      this.props.location.state == undefined
                        ? ""
                        : this.props.location.state.raasi
                    }
                  />
                  <Kulam
                    kulam={
                      this.props.location.state == undefined
                        ? ""
                        : this.props.location.state.kulam
                    }
                  />
                  <Nakshatra />
                  <Industry />
                  <Income />
                  <Country />

                  <MaritalStatus />
                  <DontShow />
                  <Education />
                  <Sector />
                  <PhysicalStatus />
                  <Complexion
                    handleFilters={(filters) =>
                      handleFilters(filters, "complexion")
                    }
                  />
                  <BodyType />
                  <EatingHabits />
                  <OwnHouse />
                </div>
              </Col>

              <Col lg={9} sm={12} className="main-center-cont">
                <MarriageInfo />
              </Col>
            </Row>
          </Container>
        ) : (
          <Container style={{ marginBottom: 20 }}>
            <Row className="main-container">
              <Col lg={3} sm={12} className="main-left-cont">
                <Col className="filter">
                  <div
                    style={{ fontSize: 18, fontWeight: 500, letterSpacing: 1 }}
                  >
                    Filters
                  </div>
                </Col>
                <Col
                  className="filter-1"
                  style={{ display: "none" }}
                  onClick={() => this.myFunction()}
                >
                  <div
                    className="icon-div-filter"
                    onClick={() => console.log("right")}
                  >
                    <FontAwesomeIcon
                      icon={faCaretRight}
                      className="icon-down"
                    />
                  </div>
                  <div
                    style={{ fontSize: 18, fontWeight: 500, letterSpacing: 1 }}
                  >
                    Filters
                  </div>
                </Col>
                <div className="filter-sec" id="myDIV">
                  {this.loggedIn ? (
                    ""
                  ) : (
                    <Gender Ugender={this.props.location.state.gender} />
                  )}
                  <Name />
                  <UniqueId
                    uniqueID={
                      this.props.location.state == undefined
                        ? ""
                        : this.props.location.state.uniqueID
                    }
                  />
                  <Dosham
                    dosham={
                      this.props.location.state == undefined
                        ? ""
                        : this.props.location.state.dosham
                    }
                  />
                  <Horo
                    horo={
                      this.props.location.state == undefined
                        ? ""
                        : this.props.location.state.horo
                    }
                  />
                  {/* <Reservation /> */}
                  <Age />
                  <Height />
                  <ShowOnly />
                  <Raasi
                    raasi={
                      this.props.location.state == undefined
                        ? ""
                        : this.props.location.state.raasi
                    }
                  />
                  <Kulam
                    kulam={
                      this.props.location.state == undefined
                        ? ""
                        : this.props.location.state.kulam
                    }
                  />
                  <Nakshatra />
                  <Industry />
                  <Income />
                  <Country />

                  <MaritalStatus />
                  <DontShow />
                  <Education />
                  <Sector />
                  <PhysicalStatus />
                  <Complexion
                    handleFilters={(filters) =>
                      handleFilters(filters, "complexion")
                    }
                  />
                  <BodyType />
                  <EatingHabits />
                  <OwnHouse />
                </div>
              </Col>

              <Col lg={9} sm={12} className="main-center-cont">
               
                <MarriageInfo />
              </Col>
            </Row>
          </Container>
        )}
        <Footer />
      </div>
    );
  }
}

export default LoginInsideContent;
