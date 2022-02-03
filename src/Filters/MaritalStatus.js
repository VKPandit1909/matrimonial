import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Accordion, Form } from "react-bootstrap";
import ContextAwareToggle from "../Components/CustomToggleHeader";
import { connect } from "react-redux";
import { filterValues } from "../Service/Actions/Actions";

const MaritalList = [
  { id: "Unmarried", type: "Unmarried" },
  { id: "Married", type: "Married" },
  { id: "Divorced", type: "Divorced" },
  { id: "Widowed", type: "Widowed" },
  { id: "Single", type: "Single" },
];
class MaritalStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFilter: [],
      checkAll: false,
      checked: false,
    };
  }
  handelAll(event) {
    var filtersVal = this.state.activeFilter;
    console.log(event.name, "el");
    if (event.target.checked) {
      MaritalList.forEach((el) => {
        filtersVal.push(el.id);
        this.setState({
          checkAll: true,
          checked: true,
        });
      });
    } else {
      while (filtersVal.length > 0) {
        filtersVal.pop();
      }
      this.setState({
        checkAll: false,
        checked: true,
      });
    }
    this.setState(
      {
        activeFilter: filtersVal,
      },
      function (res) {
        console.log(this.state.activeFilter);
        this.props.filterValues({
          ftype: "basic.married",
          data: { "basic.married": this.state.activeFilter },
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
        checkAll: false,
      },
      function (res) {
        console.log(this.state.activeFilter);
        this.props.filterValues({
          ftype: "basic.married",
          data: { "basic.married": this.state.activeFilter },
        });
      }
    );
  };
  render() {
    return (
      <Col>
        <Accordion defaultActiveKey="1">
          <ContextAwareToggle eventKey="0">Marital Status</ContextAwareToggle>

          <Accordion.Collapse eventKey="0">
            <Form id="dosham-check">
              <Form.Check
                type="checkbox"
                label="Select All"
                name="Select All"
                onChange={(e) => this.handelAll(e)}
                checked={this.state.checkAll}
                id={`marital-sel`}
              />
              {MaritalList.map((value, index) => (
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
                    id={`Maried-${index}`}
                  />
                </React.Fragment>
              ))}
            </Form>
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
export default connect(mapStateToProps, mapDispatchToProps)(MaritalStatus);
