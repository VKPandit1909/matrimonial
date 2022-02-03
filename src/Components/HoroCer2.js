import React from "react";
import Select from "react-select";
import { Col, Accordion, Form, Row, Container, Button } from "react-bootstrap";
import LoginInsideHeader from "./LoginInsideHeader";
import Footer from "./Footer";
import MySelect from "./MySelect";
import UserContext from "../Context/UserContext";
import { message } from "antd";

// const selectOptions = [
//   { label: "Lak", value: "Lak" },
//   { label: "Suri", value: "Suri" },
//   { label: "Sandh", value: "Sandh" },
//   { label: "Sev", value: "Sev" },
//   { label: "Puth", value: "Puth" },
//   { label: "Guru", value: "Guru" },
//   { label: "Suk", value: "Suk" },
//   { label: "Sani", value: "Sani" },
//   { label: "Ragu", value: "Ragu" },
//   { label: "Kethu", value: "Kethu" },
//   { label: "Mandh", value: "Mandh" },
//   { label: "Veya", value: "Veya" },
//   { label: "Guru(Va)", value: "Guru(Va)" },
//   { label: "Puth(Va)", value: "Puth(Va)" },
//   { label: "Suk(Va)", value: "Suk(Va)" },

//   { label: "Sani(Va)", value: "Sani(Va)" },
// ];

class HoroCer2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uhoro1: [""],
      uhoro2: [""],
      uhoro3: [""],
      uhoro4: [""],
      uhoro5: [""],
      uhoro6: [""],
      uhoro7: [""],
      uhoro8: [""],
      uhoro9: [""],
      uhoro10: [""],
      uhoro11: [""],
      uhoro12: [""],
    };
  }
  handleHoro = (e, horoNum) => {
    var uhoro = "uhoro" + horoNum;
    var returnHoro = {};
    returnHoro[uhoro] = Array.isArray(e) ? e.map((x) => x.value) : [];
    this.setState(returnHoro);
  };
  handleSubmit = (event) => {
    const form = event.currentTarget;
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
          boxHoroscopeSecond: {
            horo1: this.state.uhoro1,
            horo2: this.state.uhoro2,
            horo3: this.state.uhoro3,
            horo4: this.state.uhoro4,
            horo5: this.state.uhoro5,
            horo6: this.state.uhoro6,
            horo7: this.state.uhoro7,
            horo8: this.state.uhoro8,
            horo9: this.state.uhoro9,
            horo10: this.state.uhoro10,
            horo11: this.state.uhoro11,
            horo12: this.state.uhoro12,
          },
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        message.success("Data Saved Successfully.");
        console.log(data, "data");
      });
  };
  componentDidMount() {
    const { boxHoroSecond } = this.context;
    if (
      boxHoroSecond == "" ||
      boxHoroSecond == undefined ||
      boxHoroSecond == null
    ) {
    } else {
      this.setState({
        uhoro1: boxHoroSecond.horo1 == undefined ? "" : boxHoroSecond.horo1,
        uhoro2: boxHoroSecond.horo1 == undefined ? "" : boxHoroSecond.horo2,
        uhoro3: boxHoroSecond.horo1 == undefined ? "" : boxHoroSecond.horo3,
        uhoro4: boxHoroSecond.horo1 == undefined ? "" : boxHoroSecond.horo4,
        uhoro5: boxHoroSecond.horo1 == undefined ? "" : boxHoroSecond.horo5,
        uhoro6: boxHoroSecond.horo1 == undefined ? "" : boxHoroSecond.horo6,
        uhoro7: boxHoroSecond.horo1 == undefined ? "" : boxHoroSecond.horo7,
        uhoro8: boxHoroSecond.horo1 == undefined ? "" : boxHoroSecond.horo8,
        uhoro9: boxHoroSecond.horo1 == undefined ? "" : boxHoroSecond.horo9,
        uhoro10: boxHoroSecond.horo1 == undefined ? "" : boxHoroSecond.horo10,
        uhoro11: boxHoroSecond.horo1 == undefined ? "" : boxHoroSecond.horo11,
        uhoro12: boxHoroSecond.horo1 == undefined ? "" : boxHoroSecond.horo12,
      });
    }
  }
  render() {
    const selectOptions = [
      { label: "Lak", value: "Lak", id: 0 },
      { label: "Suri", value: "Suri", id: 1 },
      { label: "Sandh", value: "Sandh", id: 2 },
      { label: "Sev", value: "Sev", id: 3 },
      { label: "Puth", value: "Puth", id: 4 },
      { label: "Guru", value: "Guru", id: 5 },
      { label: "Suk", value: "Suk", id: 6 },
      { label: "Sani", value: "Sani", id: 7 },
      { label: "Ragu", value: "Ragu", id: 8 },
      { label: "Kethu", value: "Kethu", id: 9 },
      { label: "Mandh", value: "Mandh", id: 10 },
      { label: "Veya", value: "Veya", id: 11 },
      { label: "Guru(Va)", value: "Guru(Va)", id: 12 },
      { label: "Puth(Va)", value: "Puth(Va)", id: 13 },
      { label: "Suk(Va)", value: "Suk(Va)", id: 14 },
      { label: "Sani(Va)", value: "Sani(Va)", id: 15 },
    ];

    //disable selected element from dropdown 1
    for (let i = 1; i < 13; i++) {
      var selectedData = this.state["uhoro" + i];
      console.log(selectedData, "selectedData");

      if (selectedData.length > 0) {
        this.state["uhoro" + i].forEach(function (item, index) {
          console.log(item, index, "need ado");
          selectOptions.map((x) => {
            if (item == x.value) {
              const objIndex = selectOptions.findIndex((obj) => obj.id == x.id);
              selectOptions[objIndex].isDisabled = true;
              // selectOptions.splice(objIndex, 1);
            }
          });
        });
      }
    }
    return (
      <>
        <Col>
          <Col className="certi-main-col">
            <Col className="certi-first-col">
              <Col lg={3} md={3} sm={3} xs={3} className="certi-sec-col">
                <h4 className="certi-text">12</h4>

                <Select
                  className="certi-sel"
                  options={selectOptions}
                  isMulti
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  onChange={(e) => {
                    this.handleHoro(e, 12);
                  }}
                  allowSelectAll={true}
                  value={selectOptions.filter((obj) =>
                    this.state.uhoro12.includes(obj.value)
                  )}
                />
              </Col>
              <Col lg={3} md={3} sm={3} xs={3} className="certi-sec-col">
                <h4 className="certi-text">1</h4>
                <h7>{this.state.uhoro1}</h7>
                <Select
                  className="certi-sel"
                  options={selectOptions}
                  isMulti
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  onChange={(e) => {
                    this.handleHoro(e, 1);
                  }}
                  allowSelectAll={true}
                  value={selectOptions.filter((obj) =>
                    this.state.uhoro1.includes(obj.value)
                  )}
                />
              </Col>
              <Col lg={3} md={3} sm={3} xs={3} className="certi-sec-col">
                <h4 className="certi-text">2</h4>
                <Select
                  className="certi-sel"
                  options={selectOptions}
                  isMulti
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  onChange={(e) => {
                    this.handleHoro(e, 2);
                  }}
                  allowSelectAll={true}
                  value={selectOptions.filter((obj) =>
                    this.state.uhoro2.includes(obj.value)
                  )}
                />
              </Col>
              <Col
                lg={3}
                md={3}
                sm={3}
                xs={3}
                className="certi-sec-col certi-4"
              >
                <h4 className="certi-text">3</h4>
                <Select
                  className="certi-sel"
                  options={selectOptions}
                  isMulti
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  onChange={(e) => {
                    this.handleHoro(e, 3);
                  }}
                  allowSelectAll={true}
                  value={selectOptions.filter((obj) =>
                    this.state.uhoro3.includes(obj.value)
                  )}
                />
              </Col>
            </Col>
            <Col className="certi-second-col">
              <Col className="certi-sec-col1">
                <Col className="certi-11">
                  <h4 className="certi-text ">11</h4>
                  <Select
                    className="certi-sel"
                    options={selectOptions}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    onChange={(e) => {
                      this.handleHoro(e, 11);
                    }}
                    allowSelectAll={true}
                    value={selectOptions.filter((obj) =>
                      this.state.uhoro11.includes(obj.value)
                    )}
                  />
                </Col>
                <Col className="certi-10">
                  {" "}
                  <h4 className="certi-text">10</h4>
                  <Select
                    className="certi-sel"
                    options={selectOptions}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    onChange={(e) => {
                      this.handleHoro(e, 10);
                    }}
                    allowSelectAll={true}
                    value={selectOptions.filter((obj) =>
                      this.state.uhoro10.includes(obj.value)
                    )}
                  />
                </Col>
              </Col>
              <Col lg={6} md={6} sm={6} xs={6} className="certi-mid-col">
                Rasi
              </Col>
              <Col lg={3} md={3} sm={3} xs={3}>
                <Col className="certi-sec-col certi-4">
                  <h4 className="certi-text">4</h4>
                  <Select
                    className="certi-sel"
                    options={selectOptions}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    onChange={(e) => {
                      this.handleHoro(e, 4);
                    }}
                    allowSelectAll={true}
                    value={selectOptions.filter((obj) =>
                      this.state.uhoro4.includes(obj.value)
                    )}
                  />
                </Col>
                <Col className="certi-sec-col certi-4">
                  {" "}
                  <h4 className="certi-text">5</h4>
                  <Select
                    className="certi-sel"
                    options={selectOptions}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    onChange={(e) => {
                      this.handleHoro(e, 5);
                    }}
                    allowSelectAll={true}
                    value={selectOptions.filter((obj) =>
                      this.state.uhoro5.includes(obj.value)
                    )}
                  />
                </Col>
              </Col>
            </Col>
            <Col className="certi-first-col ">
              <Col
                lg={3}
                md={3}
                sm={3}
                xs={3}
                className="certi-sec-col certi-9"
              >
                <h4 className="certi-text">9</h4>
                <Select
                  className="certi-sel"
                  options={selectOptions}
                  isMulti
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  onChange={(e) => {
                    this.handleHoro(e, 9);
                  }}
                  allowSelectAll={true}
                  value={selectOptions.filter((obj) =>
                    this.state.uhoro9.includes(obj.value)
                  )}
                />
              </Col>
              <Col
                lg={3}
                md={3}
                sm={3}
                xs={3}
                className="certi-sec-col certi-9"
              >
                <h4 className="certi-text">8</h4>
                <Select
                  className="certi-sel"
                  options={selectOptions}
                  isMulti
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  onChange={(e) => {
                    this.handleHoro(e, 8);
                  }}
                  allowSelectAll={true}
                  value={selectOptions.filter((obj) =>
                    this.state.uhoro8.includes(obj.value)
                  )}
                />
              </Col>
              <Col
                lg={3}
                md={3}
                sm={3}
                xs={3}
                className="certi-sec-col certi-9"
              >
                <h4 className="certi-text">7</h4>
                <Select
                  className="certi-sel"
                  options={selectOptions}
                  isMulti
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  onChange={(e) => {
                    this.handleHoro(e, 7);
                  }}
                  allowSelectAll={true}
                  value={selectOptions.filter((obj) =>
                    this.state.uhoro7.includes(obj.value)
                  )}
                />
              </Col>
              <Col
                lg={3}
                md={3}
                sm={3}
                xs={3}
                className="certi-sec-col certi-4 certi-9"
              >
                <h4 className="certi-text">6</h4>
                <Select
                  className="certi-sel"
                  options={selectOptions}
                  isMulti
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  onChange={(e) => {
                    this.handleHoro(e, 6);
                  }}
                  allowSelectAll={true}
                  value={selectOptions.filter((obj) =>
                    this.state.uhoro6.includes(obj.value)
                  )}
                />
              </Col>
            </Col>
          </Col>
          {/* Button */}
          <Col>
            {" "}
            <Row className="form-bottom-button">
              <Button
                type="submit"
                className="horo-certi-btn"
                id="horo-certi-btn"
                onClick={(e) => this.handleSubmit(e)}
              >
                Submit Horoscope
              </Button>
            </Row>
          </Col>
        </Col>
      </>
    );
  }
}
HoroCer2.contextType = UserContext;
export default HoroCer2;
