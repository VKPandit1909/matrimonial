import "../App.css";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Accordion, Form } from "react-bootstrap";
import ContextAwareToggle from "../Components/CustomToggleHeader";
import { connect } from "react-redux";
import { filterValues } from "../Service/Actions/Actions";

const genderList = [
  { id: "Male", type: "Male" },
  { id: "Female", type: "Female" },
];

class Gender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeShows: [],
    };
  }
  componentDidMount() {
    console.log(this.props.Ugender, "adadada");
  
    
    setTimeout(
      ()=>{
        this.handleCheckbox(this.props.Ugender)
      }
      
      ,500)
   
  }

  handleCheckbox = (val) => {
   
    var filtersVal = this.state.activeShows;
    filtersVal.push(val);
    this.setState(
      {
        activeShows: filtersVal,
      },
      function (res) {
        console.log(this.state.activeShows);
        this.props.filterValues({
          ftype: "gender",
          data: { gender: this.state.activeShows },
        });
      }
    );
  };

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
      },
      function (res) {
        console.log(this.state.activeShows);
        this.props.filterValues({
          ftype: "gender",
          data: { gender: this.state.activeShows },
        });
      }
    );
  };
  render() {
    return (
      <Col>
        <Accordion defaultActiveKey="0">
          <ContextAwareToggle eventKey="0">Gender</ContextAwareToggle>

          <Accordion.Collapse eventKey="0">
            <Form id="dosham-check">
              {genderList.map((value, index) => (
                <React.Fragment key={index}>
                  <Form.Check
                    type="checkbox"
                    label={value.type}
                    name={value.type}
                    onChange={(e) => this.handleChangeBox(value.id, e)}
                    checked={this.state.activeShows.indexOf(value.type)=== -1 ? false : true}
                    id={`gender-${index}`}
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
export default connect(null, mapDispatchToProps)(Gender);
