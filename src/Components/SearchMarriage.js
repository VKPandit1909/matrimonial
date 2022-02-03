import "../App.css";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col } from "react-bootstrap";
import Select from "react-select";
import "antd/dist/antd.css";
import { List, Image } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";


import { useHistory } from "react-router";

const MarriageCard = ({ details }) => {
  const history = useHistory();
  console.log(details);
  return (
    <div className="info-main-div">
      <div className="info-img">
        <div>
          <Image
            src={
              details.photo === undefined
                ? "	https://mayyam-in.s3.amazonaws.com/monica-p/p/t/37ccfe253b20e663ba77d63797d61568.jpg"
                : details.photo
            }
            height="170"
            width="100%"
          />
        </div>
        <h4>{details.name}</h4>
      </div>
      <div className="info-div">
        <div className="info-right-div">
          <div className="sponsored">
            <div>
              Sponsored
              <FontAwesomeIcon icon={faInfoCircle} style={{ marginLeft: 5 }} />
            </div>
            <div>
              Restricted
              <FontAwesomeIcon icon={faInfoCircle} style={{ marginLeft: 5 }} />
            </div>
          </div>
          <div className="info-right-div1">
            <div className="info-div-text">Age/Height</div>
            <div className="info-main-text">
              {details.basic === undefined
                ? "-"
                : details.basic.age +
                  " Yrs, " +
                  details.basic.height +
                  " Inch."}
            </div>
          </div>
          <div className="info-right-div1">
            <div className="info-div-text">Raasi</div>
            <div className="info-main-text">Katagam</div>
          </div>
          <div className="info-right-div1">
            <div className="info-div-text">Nakshatram</div>
            <div className="info-main-text">Ayilyam</div>
          </div>
          <div className="info-right-div1">
            <div className="info-div-text">Location</div>
            <div className="info-main-text">Vellore</div>
          </div>
          <div className="info-right-div1">
            <div className="info-div-text">Education</div>
            <div className="info-main-text">BA</div>
          </div>
          <div className="info-right-div1">
            <div className="info-div-text">Profession</div>
            <div className="info-main-text">Education</div>
          </div>
          <div className="info-right-div1">
            <div className="info-div-text">Annual Income</div>
            <div className="info-main-text">1,00,000</div>
          </div>
          <div className="info-right-div1">
            <div className="info-div-text">Profile Match</div>
            <div className="info-main-text">Coming Soon</div>
          </div>
          <div className="info-right-div1">
            <div className="info-div-text">Horoscope Match</div>
            <div className="info-main-text">Coming Soon</div>
          </div>
        </div>
        <div className="info-buttons">
          <div>
            <button
              className="in-but"
              onClick={() => history.push("/profile/" + details._id)}
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
class SearchMarriage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      totalPage: 0,
      current: 1,
      minIndex: 0,
      maxIndex: 0,
      mCards: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/user-datas", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
        gender: "Male",
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

  render() {
    const { data, current, minIndex, maxIndex } = this.state;
    const actions = [
      { label: "Add", value: 1 },
      { label: "Edit", value: 2 },
      { label: "Delete", value: 3 },
    ];

    return (
      <Col className="info-col">
        <div className="matches">
          <div className="matches-div">
            <div className="match-div-text">
              All Matches({this.state.mCards.length})
            </div>
            {/* See Only Dosham Matches */}
            <div className="match-div-smallText">See Only Dosham Matches</div>
          </div>
          <div className="matched-div2">
            <div>
              Sort Profile by
              <div
                style={{ textAlign: "left", width: "60%", marginLeft: "40%" }}
              >
                <Select options={actions} className="selectbox" />
              </div>
            </div>
          </div>
        </div>

        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },

            pageSize: 9,
          }}
          dataSource={this.state.mCards}
          renderItem={(items, index) => (
            <MarriageCard details={items} keyIndex={index} />
          )}
        />
      </Col>
    );
  }
}

export default SearchMarriage;
