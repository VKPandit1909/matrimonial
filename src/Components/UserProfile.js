import "../App.css";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import LoginInsideHeader from "./LoginInsideHeader";

import ProfileInfo from "../Details/ProfileInfo";
import BasicDetails from "../Details/BasicDetails";
import AboutU from "../Details/AboutU";
import Horoscope from "../Details/Horoscope";
import ReligionInformation from "../Details/ReligionInformation";
import ProfessionalInformation from "../Details/ProfessionalInformation";
import GroomLocation from "../Details/GroomLocation";
import FamilyDetails from "../Details/FamilyDetails";
import ContactDetails from "../Details/ContactDetails";
import AboutOurFamily from "../Details/AboutOurFamily";
import LifeStyle from "../Details/Lifestyle";
import BasicReligion from "../Details/BasicReligion";
import ProfessionalPref from "../Details/ProfessionalPreference";
import LocationPref from "../Details/LocationPreference";
import WhatLooking from "../Details/WhatILooking";
import Footer from "./Footer";
import Support from "./Support";
import HoroBox from "../Details/HoroBox";

class UserProfile extends Component {
  componentDidMount() {
    fetch("http://localhost:3000/user-details", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        console.log(results.data, "userData");
        global.userData = results.data;
      });
  }
  render() {
    return (
      <div>
        <LoginInsideHeader />

        <Container>
          <Row>
            <Col lg={12} md={12} sm={12} xs={12}>
              <ProfileInfo />
              <Col
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className="mt-3 personal-info-title"
              >
                <Col className="mt-3 personal-info-text">
                  Personal Information
                </Col>
              </Col>
              <AboutU />
              <BasicDetails />
              <Horoscope />
              <HoroBox/>
              <ReligionInformation />
              <ProfessionalInformation />
              <GroomLocation />
              <FamilyDetails />
              <ContactDetails />
              <AboutOurFamily />
              <LifeStyle />
              <Col
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className="mt-3 personal-info-title2"
              >
                <Col className="mt-3 personal-info-text1">
                  Partner Preference
                </Col>
                <Col className="personal-info-text2">
                  Note : Please ensure that you fill all of your partner
                  preferences. Profiles that matches your preferences will be
                  shown in the 'Basic Search' option.
                </Col>
              </Col>
              <BasicReligion />
              <ProfessionalPref />
              <LocationPref />
              <WhatLooking />
            </Col>
            {/* <Col lg={3} md={3} sm={12} xs={12} className="mt-3">
              <Support />
            </Col> */}
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}
export default UserProfile;
