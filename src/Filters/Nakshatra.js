import Select from "react-select";
import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Accordion, Form, Row } from "react-bootstrap";
import ContextAwareToggle from "../Components/CustomToggleHeader";
import { connect } from "react-redux";
import { filterValues } from "../Service/Actions/Actions";
import MySelect from "../Components/MySelect";

const nakshatraList = [
  { label: "Ashwini", value: "Ashwini" },
  { label: "Bharani", value: "Bharani" },
  { label: "Karthigai", value: "Karthigai" },
  { label: "Rohini", value: "Rohini" },
  { label: "Mirigasirisham", value: "Mirigasirisham" },
  { label: "Thiruvathirai", value: "Thiruvathirai" },
  { label: "Punarpoosam", value: "Punarpoosam" },
  { label: "Poosam", value: "Poosam" },
  { label: "Ayilyam", value: "Ayilyam" },
  { label: "Makam", value: "Makam" },
  { label: "Pooram", value: "Pooram" },
  { label: "Uthiram", value: "Uthiram" },
  { label: "Hastham", value: "Hastham" },
  { label: "Chithirai", value: "Chithirai" },
  { label: "Swathi", value: "Swathi" },
  { label: "Visakam", value: "Visakam" },
  { label: "Anusham", value: "Anusham" },
  { label: "Kettai", value: "Kettai" },
  { label: "Moolam", value: "Moolam" },
  { label: "Pooradam", value: "Pooradam" },
  { label: "Uthradam", value: "Uthradam" },
  { label: "Thiruvonam", value: "Thiruvonam" },
  { label: "Avittam", value: "Avittam" },
  { label: "Sadhayam", value: "Sadhayam" },
  { label: "Puratathi", value: "Puratathi" },
  { label: "Uthirattathi", value: "Uthirattathi" },
  { label: "Revathi", value: "Revathi" },
];
class Nakshatra extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unakshatra: [],
    };
  }

  handleNakshatra = (e) => {
    this.setState(
      {
        unakshatra: Array.isArray(e) ? e.map((x) => x.value) : [],
      },
      function () {
        console.log(this.state.unakshatra, "unakshatra");
        this.props.filterValues({
          ftype: "religion.partnakshatram",
          data: { "religion.partnakshatram": this.state.unakshatra },
        });
      }
    );
  };
  render() {
    return (
      <Col>
        <Accordion defaultActiveKey="1">
          <ContextAwareToggle eventKey="0">Nakshatra</ContextAwareToggle>

          <Accordion.Collapse eventKey="0">
            <Col id="dosham-check">
              {/* <Select
                options={nakshatraList}
                isSearchable={true}
                isMulti
                value={nakshatraList.filter((obj) =>
                  this.state.unakshatra.includes(obj.value)
                )}
                onChange={this.handleNakshatra}
              /> */}

              <MySelect
                options={nakshatraList}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                onChange={this.handleNakshatra}
                allowSelectAll={true}
                value={nakshatraList.filter((obj) =>
                  this.state.unakshatra.includes(obj.value)
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
export default connect(mapStateToProps, mapDispatchToProps)(Nakshatra);
