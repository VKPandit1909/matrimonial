import "../App.css";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Accordion, Form } from "react-bootstrap";
import ContextAwareToggle from "../Components/CustomToggleHeader";
import { connect } from "react-redux";
import { filterValues, fetchUsers } from "../Service/Actions/Actions";

const physicalStatusList = [
  { id: "Normal", type: "Normal" },
  { id: "Differently Abled", type: "Differently Abled" },
  { id: "Not Specified", type: "Not Specified" },
];

class PhysicalStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      physicalFilter: [],
      checkAll:false
    };
  }

  handelAll(event) {
    var filtersVal = this.state.physicalFilter;
    console.log(event.name, "el");
    if (event.target.checked) {
      physicalStatusList.forEach((el) => {
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
        physicalFilter: filtersVal,
      },
      function (res) {
        console.log(this.state.physicalFilter);
        this.props.filterValues({
          ftype: "basic.physicalstatus",
          data: { "basic.physicalstatus": this.state.physicalFilter },
        });
      }
    );

    console.log(filtersVal, "val");
  }

  handleChangeBox = (text, event) => {
    var filtersVal = this.state.physicalFilter;
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
        physicalFilter: filtersVal,
        checkAll:false
      },
      function (res) {
        console.log(this.state.physicalFilter);
        this.props.filterValues({
          ftype: "basic.physicalstatus",
          data: { "basic.physicalstatus": this.state.physicalFilter },
        });
      }
    );
  };
  render() {
    return (
      <>
        <Col>
          <Accordion defaultActiveKey="1">
            <ContextAwareToggle eventKey="0">
              Physical Status
            </ContextAwareToggle>

            <Accordion.Collapse eventKey="0">
              <Form id="dosham-check">
              <Form.Check
                type="checkbox"
                label="Select All"
                name="Select All"
                onChange={(e) => this.handelAll(e)}
                checked={this.state.checkAll}
                id={`physical-sel`}
              />
                {physicalStatusList.map((value, index) => (
                  <React.Fragment key={index}>
                    <Form.Check
                      type="checkbox"
                      label={value.type}
                      name={value.type}
                      onChange={(e) => this.handleChangeBox(value.id, e)}
                      checked={
                        this.state.physicalFilter.indexOf(value.type) === -1
                          ? false
                          : true
                      }
                      id={`physical-${index}`}
                    />
                  </React.Fragment>
                ))}
              </Form>
            </Accordion.Collapse>
          </Accordion>
        </Col>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.user.filteredVals, "statePhysical");
  return { userData: state.user.users };
};
const mapDispatchToProps = (dispatch) => {
  return {
    filterValues: (value) => dispatch(filterValues(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhysicalStatus);
