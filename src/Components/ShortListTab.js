import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import UserContext from "../Context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { List, message } from "antd";
import { Card, Row, Col, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const ShortListCard = ({ details, updateShortlist }) => {
  return (
    <Card className="shortlist-card">
      <Row className="shortlist-row">
        <Col lg={3} className="card-img">
          <Image
            src={
              details.photo == undefined ||
              details.photo == null ||
              details.photo == ""
                ? "https://www.mayyam.in/css/images/noavatar.jpg"
                : details.photo
            }
            style={{ objectFit: "cover" }}
          />
        </Col>
        <Col lg={4} className="card-name">
          <h4 className="u-name">{details.name}</h4>
          <h6 className="u-age">
            {details.basic == undefined ? "" : details.basic.age}
          </h6>
        </Col>
        <Col lg={6} className="card-btn">
          <NavLink to={`./profile/${details._id}`}>
            <button className="in-but in-btn1">View Profile</button>
          </NavLink>
          <button
            className="in-but in-btn1"
            onClick={() => updateShortlist(details._id)}
          >
            <FontAwesomeIcon icon={faTrashAlt} className="card-del-icon" />
            Remove
          </button>
        </Col>
      </Row>
    </Card>
  );
};

class ShortListTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sUsers: [],
      suserids: [],
    };
    this.updateShortlist = this.updateShortlist.bind(this);
    this.getDetails = this.getDetails.bind(this);
  }
  componentWillReceiveProps() {
    // console.log(this.props.sLength, "sr");
    // this.getDetails(this.state.suserids);
  }
  componentDidMount() {
    const { details } = this.context;
    const users =
      details.shortlistUsers == undefined
        ? ""
        : details.shortlistUsers.split(",");
    console.log(users, "shortlistedusers");
    this.setState({
      suserids: users,
    });

    this.getDetails(users);
    console.log(users, "suser");

    // console.log(users.join(","), "shitrt");
  }
  updateShortlist = (id) => {
    var array = this.state.suserids; // make a separate copy of the array
    var index = array.indexOf(id);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ suserids: array });
    }
    console.log(this.state.suserids, "uuuu");

    fetch("http://localhost:3000/update-shortlist", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
        sUsers: this.state.suserids.join(","),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "ok") {
          message.success("Removed user from shortlist.");
          this.getDetails(this.state.suserids);
        } else {
          message.error(data.error);
        }
      });
  };

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
        console.log(data, "status");
        if (data.status == "ok") {
          this.setState(
            {
              sUsers: data.data,
            },
            function (req, res) {
              console.log(this.state.sUsers, "users");
            }
          );
        } else {
          message.error(data.error);
        }
      });
  };

  render() {
    return (
      <>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },

            pageSize: 5,
          }}
          dataSource={this.state.sUsers}
          renderItem={(items, index) => (
            <ShortListCard
              details={items}
              updateShortlist={this.updateShortlist}
              keyIndex={index}
            />
          )}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    sLength: state.user.sList,
  };
};
ShortListTab.contextType = UserContext;
export default connect(mapStateToProps, null)(ShortListTab);
