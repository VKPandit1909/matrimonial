import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Accordion, Form } from "react-bootstrap";
import ContextAwareToggle from "../Components/CustomToggleHeader";
import { connect } from "react-redux";
import { filterValues } from "../Service/Actions/Actions";

const SectorList = [
  { id: "Agriculture", type: "Agriculture" },
  { id: "Self-employment ", type: "Self-employment " },
  { id: "Private job", type: "Private job" },
  { id: "Physician", type: "Physician" },
  { id: "IT ", type: "IT " },
  { id: "Others ", type: "Others " },
  { id: "Not Working", type: "Not Working" },
];
class Sector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFilter: [],
      checkAll:false
    };
  }
  handelAll(event) {
    var filtersVal = this.state.activeFilter;
    console.log(event.name, "el");
    if (event.target.checked) {
    SectorList.forEach((el) => {
        filtersVal.push(el.id);
        this.setState({
          checkAll: true,
        });
      });
    } else {
      while (filtersVal.length > 0) {
        filtersVal.pop();
      }
      this.setState({
        checkAll: false,
      });
    }
    this.setState(
      {
        activeFilter: filtersVal,
      },
      function (res) {
        console.log(this.state.activeFilter);
        this.props.filterValues({
          ftype: "professional.partsector",
          data: { "professional.partsector": this.state.activeFilter },
        });
      }
    );

    console.log(filtersVal, "val");
  }


  handleChangeBox = (text, event) => {
    var filtersVal = this.state.activeFilter;
    if (event.target.checked) {
      filtersVal.push(text);
    } else {
      const index = filtersVal.indexOf(text);
      if (index > -1) {
        filtersVal.splice(index, 1);
      }
    }
    this.setState(
      {
        activeFilter: filtersVal,
        checkAll:false
      },
      function (res) {
        console.log(this.state.activeFilter);
        this.props.filterValues({
          ftype: "professional.partsector",
          data: { "professional.partsector": this.state.activeFilter },
        });
      }
    );
  };
  render(){
  return (
    <Col>
        <Accordion defaultActiveKey="1">
          <ContextAwareToggle eventKey="0">Sector</ContextAwareToggle>

          <Accordion.Collapse eventKey="0">
            <Form id="dosham-check">
            <Form.Check
                type="checkbox"
                label="Select All"
                name="Select All"
                onChange={(e) => this.handelAll(e)}
                checked={this.state.checkAll}
                id={`sector-sel`}
              />
              {SectorList.map((value, index) => (
                <React.Fragment key={index}>
                  <Form.Check
                    type="checkbox"
                    label={value.type}
                    name={value.type}
                    onChange={(e) => this.handleChangeBox(value.id, e)}
                    checked={
                      this.state.activeFilter.indexOf(value.type) === -1
                        ? false
                        : true
                    }
                    id={`Sector-${index}`}
                  />
                </React.Fragment>
              ))}
            </Form>
          </Accordion.Collapse>
        </Accordion>
      </Col>
  );
  }
};
const mapStateToProps = (state) => {
  console.log(state.user.filteredVals, "statecompx");
  return { userData: state.user.users };
};
const mapDispatchToProps = (dispatch) => {
  return {
    filterValues: (value) => dispatch(filterValues(value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sector);
