import "../App.css";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col } from "react-bootstrap";
import Select from "react-select";
import "antd/dist/antd.css";
import { List, message } from "antd";

import MarriageCard from "./MarriageCard";
import UserContext from "../Context/UserContext";
import { connect } from "react-redux";
import { fetchUsers, updateSList } from "../Service/Actions/Actions";

class MarriageInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      mCards: [],
      shortlistedUsers: [],
      interestedUsers: [],
    };
    this.interestUser = this.interestUser.bind(this);
    this.shortlistUser = this.shortlistUser.bind(this);
  }
  loggedIn = window.localStorage.getItem("isLoggedIn");

  componentDidMount() {
    const { details } = this.context;
    console.log(this.props.fetchUsers(details.gender));
    this.setState(
      {
        shortlistedUsers:
          details.shortlistUsers == undefined
            ? ""
            : details.shortlistUsers.split(","),
        interestedUsers:
          details.interestInUsers == undefined
            ? ""
            : details.interestInUsers.split(","),
      },
      function (res) {}
    );
    fetch("http://localhost:3000/user-data-all", {
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
        this.setState({
          mCards: results.data,
        });
      });
  }

  shortlistUser(suid) {
    if (this.state.shortlistedUsers.includes(suid)) {
      message.warning("Already shortlisted this user.");
    } else {
      fetch("http://localhost:3000/shortlist-user", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          token: window.localStorage.getItem("token"),
          suid: suid,
        }),
      })
        .then((res) => res.json())
        .then((results) => {
          console.log(results.data, "sisn");
          if (results.status == "ok") {
            this.setState({
              shortlistedUsers: results.data,
            });
            this.props.updateSList();
            message.success("Shortlisted Successfully.");
          } else {
            message.error(results.error);
          }
        });
    }
  }

  interestUser(iuid) {
    if (this.state.interestedUsers.includes(iuid)) {
      message.warning("Already sent interest to this user.");
    } else {
      fetch("http://localhost:3000/interest-user", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          token: window.localStorage.getItem("token"),
          iuid: iuid,
        }),
      })
        .then((res) => res.json())
        .then((results) => {
          console.log(results.data, "ins");
          if (results.status == "ok") {
            this.setState({
              interestedUsers: results.data,
            });
            message.success("Interest Sent Successfully.");
          } else {
            message.error(results.error);
          }
        });
    }
  }

  render() {
    const { details } = this.context;
    console.log(this.props.userData, "hagsdhgjhg");
    const renderData = this.props.userData;
    const mcards = this.state.mCards;
    const types = details.type;
    console.log(types, "type");

    const actions = [
      { label: "Add", value: 1 },
      { label: "Edit", value: 2 },
      { label: "Delete", value: 3 },
    ];

    return (
      <Col className="info-col">
        <div
          id="overlay"
          style={{ display: types == "free" ? "block" : "none" }}
        >
          <div id="text">
            <div id="over-div">
              Your account is not yet activated.
              <br />
              Please fill all the details here Please call 7449060000 to
              activate.
              <br /> Our Business hours 9:30 AM - 6:30 PM
            </div>
          </div>
        </div>
        <div className="matches">
          <div className="matches-div">
            <div className="match-div-text">
              All Matches({renderData.length})
            </div>
            {/* See Only Dosham Matches */}
            <div className="match-div-smallText">See Only Dosham Matches</div>
          </div>
        </div>
        {/* <Info />
      <Info />
      <Info /> */}

        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },

            pageSize: 9,
          }}
          dataSource={renderData}
          renderItem={(items, index) => (
            <MarriageCard
              details={items}
              keyIndex={index}
              shortlistUser={this.shortlistUser}
              interestUser={this.interestUser}
              shortlistedUsers={this.state.shortlistedUsers}
              interestedUsers={this.state.interestedUsers}
              loggedIn={this.loggedIn}
            />
          )}
        />
      </Col>
    );
  }
}
const mapStateToProps = (state) => {
  const fvals = state.user.filteredVals;
  var fvalsLength = 0;
  if (fvals == [] || fvals == null) {
    fvalsLength = 0;
  } else {
    fvals.forEach((element) => {
      console.log(element, "fvalelement");
      var ftype = Object.keys(element)[0];
      console.log(ftype, "fvallllllll");
      Object.values(element).map((val) => {
        console.log(val, "fvalsshbbb");
        console.log(val.length, "fvalss");
        var obj = val[0];
        console.log(obj, "fvalobj");
        if (ftype == "basic.age" || ftype == "basic.heightVal") {
          if (Object.keys(obj).length == 0) {
          } else {
            fvalsLength = 1;
          }
        } else {
          if (val.length == 0) {
            // fvalsLength = 0;
          } else {
            fvalsLength = 1;
          }
        }
      });
    });
  }

  console.log(state, "fvals");
  const gdata = state.user.filteredUsers;
  const gfilterval = state.user.filteredVals;
  const gdataLength = gdata == undefined ? 0 : gdata.length;
  console.log(gdataLength, "length");
  console.log(fvalsLength, "kkkkk");
  return {
    userData: fvalsLength == 0 ? state.user.users : state.user.filteredUsers,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateSList: () => dispatch(updateSList()),
    fetchUsers: (ad) => dispatch(fetchUsers(ad)),
  };
};
MarriageInfo.contextType = UserContext;
export default connect(mapStateToProps, mapDispatchToProps)(MarriageInfo);
