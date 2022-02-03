import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Accordion, Form } from "react-bootstrap";
import ContextAwareToggle from "../Components/CustomToggleHeader";
import { connect } from "react-redux";
import { filterValues } from "../Service/Actions/Actions";
import Select from "react-select";
import MySelect from "../Components/MySelect";

const KulamList = [
  { label: "Mesham", value: "Mesham" },
  { label: "Tula", value: "Tula" },
  { label: "Dhanus", value: "Dhanus" },
];

class Kulam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFilter: [],
      ukulam: [],
    };
  }
  s;
  loggedIn = window.localStorage.getItem("isLoggedIn");

  componentDidMount() {
    console.log("hello");
    console.log(this.props.kulam, "raasi");
    if (this.loggedIn) {
    } else {
      if (
        this.props.kulam == undefined || this.props.kulam == ""
          ? 0
          : this.props.kulam.length >= 1
      ) {
        setTimeout(
          () => {
            this.handleCheckbox(this.props.kulam);
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
        ukulam: Array.isArray(val) ? val.map((x) => x) : [],
      },
      function () {
        console.log(this.state.ukulam, "urassi");
        this.props.filterValues({
          ftype: "religion.partkulamtemple",
          data: { "religion.partkulamtemple": this.state.ukulam },
        });
      }
    );
  };

  handleKulam = (e) => {
    this.setState(
      {
        ukulam: Array.isArray(e) ? e.map((x) => x.value) : [],
      },
      function () {
        console.log(this.state.ukulam, "urassi");
        this.props.filterValues({
          ftype: "religion.partkulamtemple",
          data: { "religion.partkulamtemple": this.state.ukulam },
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
              : this.props.kulam == undefined || this.props.kulam == ""
              ? "1"
              : this.props.kulam.length >= 1
              ? "0"
              : "1"
          }
        >
          <ContextAwareToggle eventKey="0">Kulam</ContextAwareToggle>

          <Accordion.Collapse eventKey="0">
            <Col id="dosham-check">
              {/* <Select
                options={KulamList}
                isSearchable={true}
                isMulti
                value={KulamList.filter((obj) =>
                  this.state.ukulam.includes(obj.value)
                )}
                onChange={this.handleKulam} */}
              {/* /> */}

              <MySelect
                options={KulamList}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                onChange={this.handleKulam}
                allowSelectAll={true}
                value={KulamList.filter((obj) =>
                  this.state.ukulam.includes(obj.value)
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
export default connect(mapStateToProps, mapDispatchToProps)(Kulam);
