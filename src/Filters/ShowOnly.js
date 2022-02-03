import "../App.css";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Accordion, Form } from "react-bootstrap";
import ContextAwareToggle from "../Components/CustomToggleHeader";
import { connect } from "react-redux";
import { filterValues } from "../Service/Actions/Actions";

const showList = [
  { id: "With Photo", type: "With Photo" },
  { id: "Without Photo", type: "Without Photo" },
];

class ShowOnly extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeShows: [],
      checkAll: false,
    };
  }
  handelAll(event) {
    var filtersVal = this.state.activeShows;
    console.log(event.name, "el");
    if (event.target.checked) {
      showList.forEach((el) => {
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
        activeShows: filtersVal,
      },
      function (res) {
        console.log(this.state.activeShows);
        this.props.filterValues({
          ftype: "photo",
          data: { photo: this.state.activeShows },
        });
      }
    );

    console.log(filtersVal, "val");
  }

  handleChangeBox = (text, event) => {
    var filtersVal = this.state.activeShows;
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
        activeShows: filtersVal,
        checkAll: false,
      },
      function (res) {
        console.log(this.state.activeShows);
        this.props.filterValues({
          ftype: "photo",
          data: { photo: this.state.activeShows },
        });
      }
    );
  };
  render() {
    return (
      <Col>
        <Accordion defaultActiveKey="1">
          <ContextAwareToggle eventKey="0">Show Photo</ContextAwareToggle>

          <Accordion.Collapse eventKey="0">
            <Form id="dosham-check">
              <Form.Check
                type="checkbox"
                label="Select All"
                name="Select All"
                onChange={(e) => this.handelAll(e)}
                checked={this.state.checkAll}
                id={`photo-sel`}
              />
              {showList.map((value, index) => (
                <React.Fragment key={index}>
                  <Form.Check
                    type="checkbox"
                    label={value.type}
                    name={value.type}
                    onChange={(e) => this.handleChangeBox(value.id, e)}
                    checked={
                      this.state.activeShows.indexOf(value.type) === -1
                        ? false
                        : true
                    }
                    id={`photo-${index}`}
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

const mapDispatchToProps = (dispatch) => {
  return {
    filterValues: (value) => dispatch(filterValues(value)),
  };
};
export default connect(null, mapDispatchToProps)(ShowOnly);
