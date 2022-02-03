import "../App.css";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Accordion, Form } from "react-bootstrap";
import ContextAwareToggle from "../Components/CustomToggleHeader";
import Select from "react-select";
import { connect } from "react-redux";
import { filterValues } from "../Service/Actions/Actions";

class Age extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ageFrom: "",
      ageTo: "",
      ageToList: [],
      ageFromList: [],
    };
  }

  componentDidMount() {
    const ageList = [];
    for (let i = 18; i < 66; i++) {
      ageList.push({
        label: i,
        value: i,
      });
    }

    const ageFromLists = [{ label: "From", value: null }, ...ageList];
    const ageToList = [{ label: "To", value: null }, ...ageList];
    this.setState({
      ageToList: ageToList,
      ageFromList: ageFromLists,
    });
  }

  ageLists = [];
  changeAgeFrom = (ageFrom) => {
    this.setState({
      ageFrom: ageFrom,
      ageToList: this.state.ageToList.filter((e) => e.value >= ageFrom || e.value == null),
    });

    Array.isArray(this.ageLists) && this.ageLists.length == 0
      ? this.ageLists.push({
          ageFrom: ageFrom,
        })
      : this.ageLists.forEach((val) => {
          val.ageFrom = ageFrom;
        });
    
    // Delete the pair if null
    if(ageFrom == null) delete this.ageLists[0]["ageFrom"];
    this.props.filterValues({
      ftype: "basic.age",
      data: { "basic.age": this.ageLists },
    });
  };
  changeAgeTo = (ageTo) => {
    this.setState({
      ageTo: ageTo,
    });

    Array.isArray(this.ageLists) && this.ageLists.length == 0
      ? this.ageLists.push({
          ageTo: ageTo,
        })
      : this.ageLists.forEach((val) => {
          val.ageTo = ageTo;
        });
    
    // Delete the pair if null
    if(ageTo == null) delete this.ageLists[0]["ageTo"];
    this.props.filterValues({
      ftype: "basic.age",
      data: { "basic.age": this.ageLists },
    });
  };
  render() {
    return (
      <Col>
        <Accordion defaultActiveKey="1">
          <ContextAwareToggle eventKey="0">Age</ContextAwareToggle>
          <Accordion.Collapse eventKey="0">
            <Form className="main-age-form">
              <Select
                className="detail-form-input"
                options={this.state.ageFromList}
                placeholder="From"
                isSearchable={true}
                value={this.state.ageFromList.find(
                  (obj) => obj.value == this.state.ageFrom
                )}
                onChange={(e) => {
                  this.changeAgeFrom(e.value);
                }}
              />
              <Select
                className="detail-form-input"
                options={this.state.ageToList}
                placeholder="To"
                isSearchable={true}
                value={this.state.ageToList.find(
                  (obj) => obj.value == this.state.ageTo
                )}
                onChange={(e) => {
                  this.changeAgeTo(e.value);
                }}
              />
            </Form>
          </Accordion.Collapse>
        </Accordion>
      </Col>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterValues: (value) => dispatch(filterValues(value)),
  };
};
export default connect(null, mapDispatchToProps)(Age);
