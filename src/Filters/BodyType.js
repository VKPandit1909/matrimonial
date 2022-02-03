import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Accordion, Form } from "react-bootstrap";
import ContextAwareToggle from "../Components/CustomToggleHeader";
import { connect } from "react-redux";
import { filterValues } from "../Service/Actions/Actions";

const bTypeList = [
  { id: "Slim", type: "Slim" },
  { id: "Heavy", type: "Heavy" },
  { id: "Average", type: "Average" },
  { id: "Not Specified", type: "Not Specified" },
];
class BodyType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFilter: [],
      checked: false,
      checkAll: false,
    };
  }
  handelAll(event) {
    var filtersVal = this.state.activeFilter;
    console.log(event.name, "el");
    if (event.target.checked) {
      bTypeList.forEach((el) => {
        filtersVal.push(el.id);
        this.setState({
          checked: true,
          checkAll: true,
        });
      });
    } else {
     
      while (filtersVal.length > 0) {
        filtersVal.pop();
      }
      this.setState({
        checked: false,
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
          ftype: "basic.btype",
          data: { "basic.btype": this.state.activeFilter },
        });
      }
    );

    console.log(filtersVal, "val");
    // fruites.forEach(fruite => (fruite.isChecked = event.target.checked));
    // this.setState({ fruites: fruites });
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
          ftype: "basic.btype",
          data: { "basic.btype": this.state.activeFilter },
        });
      }
    );
  };
  render() {
    return (
      <Col>
        <Accordion defaultActiveKey="1">
          <ContextAwareToggle eventKey="0">Body Type</ContextAwareToggle>

          <Accordion.Collapse eventKey="0">
            <Form id="dosham-check">
              <Form.Check
                type="checkbox"
                label="Select All"
                name="Select All"
                onChange={(e) => this.handelAll(e)}
                checked={this.state.checkAll}
                id={`bodyType-sel`}
              />
              {bTypeList.map((value, index) => (
                <React.Fragment key={index}>
                  <Form.Check
                    type="checkbox"
                    label={value.type}
                    name={value.type}
                    onChange={(e) => this.handleChangeBox(value.id, e)}
                    checked={
                      this.state.activeFilter.indexOf(value.id) === -1
                        ? false
                        : true
                    }
                    id={`bodyType-${index}`}
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
export default connect(mapStateToProps, mapDispatchToProps)(BodyType);
