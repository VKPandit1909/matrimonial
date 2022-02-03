import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tab, Tabs } from "react-bootstrap";
import { message, List } from "antd";
import UserContext from "../Context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { Card,Row,Col,Image } from "react-bootstrap";

const InterestCard = ({ details }) => {
  return (
    <Card className='shortlist-card'>
        <Row className='shortlist-row'>
          <Col lg={3} className='card-img'>
            <Image src={details.photo}/>
          </Col>
          <Col lg={4} className='card-name'>
              <h4 className='u-name'>{details.name}</h4>
              <h6 className='u-age'>{details.basic==undefined?'':details.basic.age}</h6>
          </Col>
          <Col lg={6} className='card-btn'>
            <NavLink to={`./profile/${details._id}`}>
              <button className="in-but in-btn1">View Profile</button>
            </NavLink>
            <button className="in-but in-btn1">
            <FontAwesomeIcon icon={faTrashAlt} className='card-del-icon'/>
              Remove</button>
          </Col>
          
        </Row>
    </Card>
  )
};

class InterestTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iUsers: [],
      usersIn: [],
      usersBy: [],
    };
  }
  componentDidMount() {
    const { details } = this.context;
    const usersIn =details.interestInUsers==undefined?'': details.interestInUsers.split(",");
    const usersBy =details.interestByUsers==undefined?'': details.interestByUsers.split(",");
    this.setState({
      usersIn,
      usersBy,
    });
    this.getDetails(usersBy);
  }

  getDetails = (userids) => {
    fetch("http://localhost:3000/interest-users-details", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userids: userids,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "ok") {
          this.setState(
            {
              iUsers: data.data,
            },
            function (req, res) {
              console.log(this.state.sUsers);
            }
          );
        } else {
          message.error(data.error);
        }
      });
  };
  changeInterest(k) {
    console.log(k, "k");
    if (k == "Received") {
      this.getDetails(this.state.usersBy);
    } else {
      this.getDetails(this.state.usersIn);
    }
  }
  render() {
    return (
      <Tabs
        defaultActiveKey="Received"
        id="uncontrolled-tab-example"
        onSelect={(k) => this.changeInterest(k)}
        className="mb-3"
      >
        <Tab eventKey="Received" title="Received">
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },

              pageSize: 9,
            }}
            dataSource={this.state.iUsers}
            renderItem={(items, index) => (
              <InterestCard details={items} keyIndex={index} />
            )}
          />
        </Tab>
        <Tab eventKey="Sent" title="Sent">
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },

              pageSize: 9,
            }}
            dataSource={this.state.iUsers}
            renderItem={(items, index) => (
              <InterestCard details={items} keyIndex={index} />
            )}
          />
        </Tab>
      </Tabs>
    );
  }
}
InterestTab.contextType = UserContext;
export default InterestTab;
