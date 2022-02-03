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
import Support from "./Support";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";
import SearchMarriage from "./SearchMarriage";

class Search extends Component {
  render() {
    return (
      <>
        <Header />
        <Container>
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
                  <FontAwesomeIcon icon={faCaretRight} className="icon-down" />
                </div>
                <div
                  style={{ fontSize: 18, fontWeight: 500, letterSpacing: 1 }}
                >
                  Filters
                </div>
              </Col>
              <div className="filter-sec" id="myDIV">
                <Dosham />
                <Reservation />
                <Age />
                <Height />
                <ShowOnly />
                <Nakshatra />
                <Industry />
                <Income />
                <Country />
                <State />
                <District />
                <MaritalStatus />
                <DontShow />
                <Education />
                <Sector />
                <PhysicalStatus />
                <Complexion />
                <BodyType />
                <EatingHabits />
                <OwnHouse />
              </div>
            </Col>

            <Col lg={7} sm={12} className="main-center-cont">
              <SearchMarriage />
            </Col>
            <Col lg={2} sm={12} className="main-right-cont">
              <Support />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default Search;
