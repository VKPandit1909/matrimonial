import Select from "react-select";
import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Accordion, Form, Row } from "react-bootstrap";
import ContextAwareToggle from "../Components/CustomToggleHeader";
import { connect } from "react-redux";
import { filterValues } from "../Service/Actions/Actions";
import IndustryList from "../Details/IndustryListjson";
import MySelect from "../Components/MySelect";

class Industry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uindustry: [],
    };
  }
  handleIndustry = (e) => {
    this.setState(
      {
        uindustry: Array.isArray(e) ? e.map((x) => x.value) : [],
      },
      function () {
        console.log(this.state.uindustry, "uindustry");
        this.props.filterValues({
          ftype: "professional.partindustry",
          data: { "professional.partindustry": this.state.uindustry },
        });
      }
    );
  };
  render() {
    return (
      <Col>
        <Accordion defaultActiveKey="1">
          <ContextAwareToggle eventKey="0">Industry</ContextAwareToggle>

          <Accordion.Collapse eventKey="0">
            <Col id="dosham-check">
              {/* <Select
                options={IndustryList}
                isSearchable={true}
                isMulti
                value={IndustryList.filter((obj) =>
                  this.state.uindustry.includes(obj.value)
                )}
                onChange={this.handleIndustry}
              /> */}
              
              <MySelect
                options={IndustryList}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                onChange={this.handleIndustry}
                allowSelectAll={true}
                value={IndustryList.filter((obj) =>
                  this.state.uindustry.includes(obj.value)
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
export default connect(mapStateToProps, mapDispatchToProps)(Industry);
