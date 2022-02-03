import "../App.css";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Accordion, Form } from "react-bootstrap";
import ContextAwareToggle from "../Components/CustomToggleHeader";
import Select from "react-select";
import { connect } from "react-redux";
import { filterValues } from "../Service/Actions/Actions";

class Height extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heightFrom: "",
      heightTo: "",
      heightToList: [],
      heightFromList: [],
    };
  }

  componentDidMount() {
    const heightList = [
      { label: "140 cm ( 4ft 7in )", value: "4.7" },
      { label: "141 cm ( 4ft 8in )", value: "4.80" },
      { label: "142 cm ( 4ft 8in )", value: "4.81" },
      { label: "143 cm ( 4ft 8in )", value: "4.82" },
      { label: "144 cm ( 4ft 9in )", value: "4.90" },
      { label: "145 cm ( 4ft 9in )", value: "4.91" },
      { label: "146 cm ( 4ft 9in )", value: "4.92" },
      { label: "147 cm ( 4ft 10in )", value: "4.100" },
      { label: "148 cm ( 4ft 10in )", value: "4.101" },
      { label: "149 cm ( 4ft 11in )", value: "4.110" },
      { label: "150 cm ( 4ft 11in )", value: "4.111" },
      { label: "151 cm ( 4ft 11in )", value: "4.112" },
      { label: "152 cm ( 5ft )", value: "5.01" },
      { label: "153 cm ( 5ft  )", value: "5.02" },
      { label: "154 cm ( 5ft 1in )", value: "5.10" },
      { label: "155 cm ( 5ft 1in )", value: "5.11" },
      { label: "156 cm ( 5ft 1in )", value: "5.12" },
      { label: "157 cm ( 5ft 2in )", value: "5.20" },
      { label: "158 cm ( 5ft 2in )", value: "5.21" },
      { label: "159 cm ( 5ft 3in )", value: "5.30" },
      { label: "160 cm ( 5ft 3in )", value: "5.31" },
      { label: "161 cm ( 5ft 3in )", value: "5.32" },
      { label: "162 cm ( 5ft 4in )", value: "5.40" },
      { label: "163 cm ( 5ft 4in )", value: "5.41" },
      { label: "164 cm ( 5ft 5in )", value: "5.50" },
      { label: "165 cm ( 5ft 5in )", value: "5.51" },
      { label: "166 cm ( 5ft 5in )", value: "5.52" },
      { label: "167 cm ( 5ft 6in )", value: "5.60" },
      { label: "168 cm ( 5ft 6in )", value: "5.61" },
      { label: "169 cm ( 5ft 6in )", value: "5.62" },
      { label: "170 cm ( 5ft 7in )", value: "5.70" },
      { label: "171 cm ( 5ft 7in )", value: "5.71" },
      { label: "172 cm ( 5ft 8in )", value: "5.80" },
      { label: "173 cm ( 5ft 8in )", value: "5.81" },
      { label: "174 cm ( 5ft 9in )", value: "5.90" },
      { label: "175 cm ( 5ft 9in )", value: "5.91" },
      { label: "176 cm ( 5ft 9in )", value: "5.92" },
      { label: "177 cm ( 5ft 10in )", value: "5.100" },
      { label: "178 cm ( 5ft 10in )", value: "5.101" },
      { label: "179 cm ( 5ft 10in )", value: "5.101" },
      { label: "180 cm ( 5ft 11in )", value: "5.110" },
      { label: "181 cm ( 5ft 11in )", value: "5.111" },
      { label: "182 cm ( 6ft )", value: "6.01" },
      { label: "183 cm ( 6ft )", value: "6.02" },
      { label: "184 cm ( 6ft  )", value: "6.03" },
      { label: "185 cm ( 6ft 1in )", value: "6.10" },
      { label: "186 cm ( 6ft 1in )", value: "6.11" },
      { label: "187 cm ( 6ft 2in )", value: "6.20" },
      { label: "188 cm ( 6ft 2in )", value: "6.21" },
      { label: "189 cm ( 6ft 2in )", value: "6.22" },
      { label: "190 cm ( 6ft 3in )", value: "6.30" },
      { label: "191 cm ( 6ft 3in )", value: "6.31" },
      { label: "192 cm ( 6ft 4in )", value: "6.41" },
      { label: "193 cm ( 6ft 4in )", value: "6.42" },
      { label: "194 cm ( 6ft 4in )", value: "6.43" },
      { label: "195 cm ( 6ft 5in )", value: "6.50" },
    ];

    const heightFromList = [{ label: "From", value: null }, ...heightList];
    const heightToList = [{ label: "To", value: null }, ...heightList];
    this.setState({
      heightToList,
      heightFromList,
    });
  }

  heightList = [];
  changeHeightFrom = (heightFrom) => {
    this.setState({
      heightFrom: heightFrom,
      heightToList: this.state.heightToList.filter(
        (e) => e.value >= heightFrom || e.value == null
      ),
    });

    Array.isArray(this.heightList) && this.heightList.length == 0
      ? this.heightList.push({
          heightFrom: heightFrom,
        })
      : this.heightList.forEach((val) => {
          val.heightFrom = heightFrom;
        });

    // Delete the pair if null
    if (heightFrom == null) delete this.heightList[0]["heightFrom"];
    this.props.filterValues({
      ftype: "basic.heightVal",
      data: { "basic.heightVal": this.heightList },
    });
  };
  changeHeightTo = (heightTo) => {
    this.setState({
      heightTo: heightTo,
    });

    Array.isArray(this.heightList) && this.heightList.length == 0
      ? this.heightList.push({
          heightTo: heightTo,
        })
      : this.heightList.forEach((val) => {
          val.heightTo = heightTo;
        });

    // Delete the pair if null
    if (heightTo == null) delete this.heightList[0]["heightTo"];
    this.props.filterValues({
      ftype: "basic.heightVal",
      data: { "basic.heightVal": this.heightList },
    });
  };
  render() {
    return (
      <Col>
        <Accordion defaultActiveKey="1">
          <ContextAwareToggle eventKey="0">Height</ContextAwareToggle>
          <Accordion.Collapse eventKey="0">
            <Form className="main-age-form">
              <Select
                className="detail-form-input"
                options={this.state.heightFromList}
                placeholder="From"
                isSearchable={true}
                value={this.state.heightFromList.find(
                  (obj) => obj.value == this.state.heightFrom
                )}
                onChange={(e) => {
                  this.changeHeightFrom(e.value);
                }}
              />
              <Select
                className="detail-form-input"
                options={this.state.heightToList}
                placeholder="To"
                isSearchable={true}
                value={this.state.heightToList.find(
                  (obj) => obj.value == this.state.heightTo
                )}
                onChange={(e) => {
                  this.changeHeightTo(e.value);
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
export default connect(null, mapDispatchToProps)(Height);
