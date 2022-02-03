import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Accordion, Form } from "react-bootstrap";
import ContextAwareToggle from "../Components/CustomToggleHeader";
import { connect } from "react-redux";
import { filterValues } from "../Service/Actions/Actions";

class Name extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: "",
    };
  }

  handleName = (e) => {
    this.setState(
      {
        uname: e.target.value,
      },
      function () {
        console.log(this.state.uname, "uname");
        this.props.filterValues({
          ftype: "name",
          data: { name: [this.state.uname] },
        });
      }
    );
  };
  render() {
    return (
      <Col>
        <Accordion defaultActiveKey="1">
          <ContextAwareToggle eventKey="0">Name</ContextAwareToggle>
          <Accordion.Collapse eventKey="0">
            <Form id="dosham-check">
              <Form.Control
                required
                type="text"
                name="uname"
                value={this.state.uname}
                onChange={this.handleName}
              />
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
export default connect(mapStateToProps, mapDispatchToProps)(Name);
