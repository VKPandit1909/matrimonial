import React, { Component } from "react";
import { message } from "antd";
import SeeProfileInfo from "../See User Details/SeeProfileInfo";
import { Container, Row, Col } from "react-bootstrap";
import Support from "./Support";
import Footer from "./Footer";
import LoginInsideHeader from "./LoginInsideHeader";
import SeeAboutU from "../See User Details/SeeAboutU";
import SeeBasicDetails from "../See User Details/SeeBasicDetails";
import SeeHoroscope from "../See User Details/SeeHoroscope";
import SeeReligionInfo from "../See User Details/SeeReligionInfo";
import SeeProfInfo from "../See User Details/SeeProfInfo";
import SeeFamilyDetails from "../See User Details/SeeFamilyDetails";
import SeeContactDetails from "../See User Details/SeeContactDetails";
import SeeGroomLocation from "../See User Details/SeeGroomLocation";
import SeeAboutFamily from "../See User Details/SeeAboutFamily";
import SeeLifeStyle from "../See User Details/SeeLifestyle";
import Header from "./Header";


class ProfileDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data1: [],
      details: [],
    };
  }
  loggedIn = window.localStorage.getItem("isLoggedIn");
  componentDidMount() {
    var userid = this.props.match.params.id;
   
    console.log(userid);
    this.getDetails(userid);
  }

  getDetails = (userid, type) => {
    fetch("http://localhost:3000/single-users-details", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userid: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          data1: data.data,
        });
      });
  };

  render() {
    {
      this.state.data1.map((items, index) => {
        console.log(items, "items1234");
      });
    }

    return (
      <div>
        {this.state.data1.map((items, index) => {
          return (
            <div>
              {this.loggedIn?  <LoginInsideHeader/>: <Header/>}
             

              <Container>
                <Row>
                  <Col lg={9} md={9} sm={12} xs={12}>
                    <SeeProfileInfo details={items} loggedIn={this.loggedIn}/>
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
                    <SeeAboutU details={items}  loggedIn={this.loggedIn}/>
                    <SeeBasicDetails  details={items}  loggedIn={this.loggedIn}/>
                    <SeeHoroscope details={items}  loggedIn={this.loggedIn}/>
                    <SeeReligionInfo details={items}  loggedIn={this.loggedIn}/>
                    <SeeProfInfo details={items}  loggedIn={this.loggedIn}/>
                    <SeeGroomLocation details={items}  loggedIn={this.loggedIn}/>
                    <SeeFamilyDetails  details={items}  loggedIn={this.loggedIn} />
                    <SeeContactDetails details={items}  loggedIn={this.loggedIn}/>
                    <SeeAboutFamily details={items}  loggedIn={this.loggedIn}/>
                    <SeeLifeStyle details={items}  loggedIn={this.loggedIn}/>
                   
                    
                  </Col>
                  <Col lg={3} md={3} sm={12} xs={12} className="mt-3">
                    <Support/>
                  </Col>
                </Row>
              </Container>
              <Footer/>
             
            </div>
          );
        })}
      </div>
    );
  }
}
export default ProfileDetails;
