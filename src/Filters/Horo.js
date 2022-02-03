import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Accordion, Form } from "react-bootstrap";
import ContextAwareToggle from "../Components/CustomToggleHeader";
import { connect } from "react-redux";
import { filterValues } from "../Service/Actions/Actions";

const HoroList = [
  {
    id: "Pure Horoscope",
    type: "Pure Horoscope",
  },
  {
    id: "Mars Horoscope",
    type: "Mars Horoscope",
  },
  {
    id: "Rahu Ketu Horoscope",
    type: "Rahu Ketu Horoscope",
  },
  {
    id: "Rahu Ketu Mars Horoscope",
    type: "Rahu Ketu Mars Horoscope",
  },
];

class Horo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFilter: [],
      checkAll:false
    };
  }
  loggedIn = window.localStorage.getItem("isLoggedIn");

  componentDidMount() {
    if (this.loggedIn) {
    } else {
      const len =
        this.props.horo == undefined || this.props.horo == ""
          ? 0
          : this.props.horo.length;
      if (len >= 1) {
        setTimeout(
          () => {
            this.handleCheckbox(this.props.horo);
          },

          500
        );
      } else {
      }
    }
  }
  handelAll(event) {
    var filtersVal = this.state.activeFilter;
    console.log(event.name, "el");
    if (event.target.checked) {
      HoroList.forEach((el) => {
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
          ftype: "horoscope.birthastrology",
          data: { "horoscope.birthastrology": this.state.activeFilter },
        });
      }
    );

    console.log(filtersVal, "val");
  }


  handleCheckbox = (val) => {
    console.log(val, "lllllllll");

    // console.log(filtersVal,'llllllo');
    this.setState(
      {
        activeFilter: val,
        checkAll:false
      },
      function (res) {
        console.log(this.state.activeFilter);
        this.props.filterValues({
          ftype: "horoscope.birthastrology",
          data: { "horoscope.birthastrology": this.state.activeFilter },
        });
      }
    );
  };
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
          ftype: "horoscope.birthastrology",
          data: { "horoscope.birthastrology": this.state.activeFilter },
        });
      }
    );
  };

  render() {
    console.log(this.props.userData, "hello");
    return (
      <Col>
        <Accordion
          defaultActiveKey={
            this.loggedIn
              ? "1"
              : this.props.horo == undefined || this.props.horo == ""
              ? "1"
              : this.props.horo.length >= 1
              ? "0"
              : "1"
          }
        >
          <ContextAwareToggle eventKey="0">Horoscope</ContextAwareToggle>

          <Accordion.Collapse eventKey="0">
            <Form id="dosham-check">
            <Form.Check
                type="checkbox"
                label="Select All"
                name="Select All"
                onChange={(e) => this.handelAll(e)}
                checked={this.state.checkAll}
                id={`horo-sel`}
              />
              {HoroList.map((value, index) => (
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
                    id={`horo-${index}`}
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
export default connect(mapStateToProps, mapDispatchToProps)(Horo);
