import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Accordion, Form } from "react-bootstrap";
import ContextAwareToggle from "../Components/CustomToggleHeader";
import { connect } from "react-redux";
import { filterValues, fetchUsers } from "../Service/Actions/Actions";

const doshamList = [
  { id: "Don't Know", type: "Don't Know" },
  { id: "No", type: "No" },
  { id: "Chevvai", type: "Chevvai" },
  { id: "Rahu & Kethu", type: "Rahu & Kethu" },
  { id: "Parikara Chevvai", type: "Parikara Chevvai" },
];

class Dosham extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doshamFilter: [],
      checkAll: false,
    };
  }
  loggedIn = window.localStorage.getItem("isLoggedIn");
  componentDidMount() {
    if (this.loggedIn) {
    } else {
      const len =
        this.props.dosham == undefined || this.props.dosham == ""
          ? 0
          : this.props.dosham.length;
      if (len >= 1) {
        setTimeout(
          () => {
            this.handleCheckbox(this.props.dosham);
          },

          500
        );
      } else {
      }
    }
  }
  handelAll(event) {
    var filtersVal = this.state.doshamFilter;
    console.log(event.name, "el");
    if (event.target.checked) {
      doshamList.forEach((el) => {
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
        doshamFilter: filtersVal,
      },
      function (res) {
        console.log(this.state.doshamFilter);
        this.props.filterValues({
          ftype: "religion.parthavedosham",
          data: { "religion.parthavedosham": this.state.doshamFilter },
        });
      }
    );

    console.log(filtersVal, "val");
  }

  handleCheckbox = (val) => {
    console.log(val, "lllllllll");

    // filtersVal.push(val);
    // console.log(filtersVal,'llllllo');
    this.setState(
      {
        doshamFilter: val,
        checkAll: false,
      },
      function (res) {
        console.log(this.state.doshamFilter);
        this.props.filterValues({
          ftype: "religion.parthavedosham",
          data: { "religion.parthavedosham": this.state.doshamFilter },
        });
      }
    );
  };

  handleChangeBox = (text, event) => {
    var filtersVal = this.state.doshamFilter;
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
        doshamFilter: filtersVal,
        checkAll:false,
      },
      function (res) {
        console.log(this.state.doshamFilter);
        this.props.filterValues({
          ftype: "religion.parthavedosham",
          data: { "religion.parthavedosham": this.state.doshamFilter },
        });
      }
    );
  };
  render() {
    return (
      <Col>
        <Accordion
          defaultActiveKey={
            this.loggedIn
              ? "1"
              : this.props.dosham == undefined || this.props.dosham == ""
              ? "1"
              : this.props.dosham.length >= 1
              ? "0"
              : "1"
          }
        >
          <ContextAwareToggle eventKey="0">Dosham</ContextAwareToggle>

          <Accordion.Collapse eventKey="0">
            <Form id="dosham-check">
              <Form.Check
                type="checkbox"
                label="Select All"
                name="Select All"
                onChange={(e) => this.handelAll(e)}
                checked={this.state.checkAll}
                id={`dosham-sel`}
              />
              {doshamList.map((value, index) => (
                <React.Fragment key={index}>
                  <Form.Check
                    type="checkbox"
                    label={value.type}
                    name={value.type}
                    onChange={(e) => this.handleChangeBox(value.id, e)}
                    checked={
                      this.state.doshamFilter.indexOf(value.type) === -1
                        ? false
                        : true
                    }
                    id={`dosham-${index}`}
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
  console.log(state.user.filteredVals, "stateDosham");
  return { userData: state.user.users };
};
const mapDispatchToProps = (dispatch) => {
  return {
    filterValues: (value) => dispatch(filterValues(value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dosham);
