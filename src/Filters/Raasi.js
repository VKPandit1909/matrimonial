import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Accordion, Form } from "react-bootstrap";
import ContextAwareToggle from "../Components/CustomToggleHeader";
import { connect } from "react-redux";
import { filterValues } from "../Service/Actions/Actions";
import Select from "react-select";
import MySelect from "../Components/MySelect";

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

class Raasi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFilter: [],
      urassi: [],
    };
  }
  loggedIn = window.localStorage.getItem("isLoggedIn");

  componentDidMount() {
    console.log("hello");
    console.log(this.props.raasi, "raasi");
    if (this.loggedIn) {
    } else {
      if (
        this.props.raasi == undefined || this.props.raasi == ""
          ? 0
          : this.props.raasi.length >= 1
      ) {
        setTimeout(
          () => {
            this.handleCheckbox(this.props.raasi);
          },

          500
        );
      } else {
      }
    }
  }
  handleCheckbox = (val) => {
    console.log(Array.isArray(val) ? val.map((x) => x) : [], "llllll");
    this.setState(
      {
        urassi: Array.isArray(val) ? val.map((x) => x) : [],
      },
      function () {
        console.log(this.state.urassi, "urassi");
        this.props.filterValues({
          ftype: "religion.partrassi",
          data: { "religion.partrassi": this.state.urassi },
        });
      }
    );
  };

  handleRaasi = (e) => {
    this.setState(
      {
        urassi: Array.isArray(e) ? e.map((x) => x.value) : [],
      },
      function () {
        console.log(this.state.urassi, "urassi");
        this.props.filterValues({
          ftype: "religion.partrassi",
          data: { "religion.partrassi": this.state.urassi },
        });
      }
    );
  };

  render() {
    console.log(this.props.userData, "hello");
    return (
      <Col>
        <Accordion
          defaultActiveKey={
            this.loggedIn
              ? "1"
              : this.props.raasi == undefined || this.props.raasi == ""
              ? "1"
              : this.props.raasi.length >= 1
              ? "0"
              : "1"
          }
        >
          <ContextAwareToggle eventKey="0">Raasi</ContextAwareToggle>

          <Accordion.Collapse eventKey="0">
            <Col id="dosham-check">
              {/* <Select
                options={raasiList}
                isSearchable={true}
                isMulti
                value={raasiList.filter((obj) =>
                  this.state.urassi.includes(obj.value)
                )}
                onChange={this.handleRaasi}
              /> */}

              <MySelect
                options={raasiList}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                onChange={this.handleRaasi}
                allowSelectAll={true}
                value={raasiList.filter((obj) =>
                  this.state.urassi.includes(obj.value)
                )}
              />
            </Col>
          </Accordion.Collapse>
        </Accordion>
      </Col>
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
export default connect(mapStateToProps, mapDispatchToProps)(Raasi);
