import Select from "react-select";
import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Accordion, Form, Row } from "react-bootstrap";
import ContextAwareToggle from "../Components/CustomToggleHeader";
import { connect } from "react-redux";
import { filterValues } from "../Service/Actions/Actions";
import { Country, State, City } from "country-state-city";
const CountryList = [
  { label: "India", value: "India" },
  { label: "Pakistan", value: "Pakistan" },
  { label: "China", value: "China" },
];
class Country1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ucountry: [],
      tamil: [""],
      initialValues: {
        country: "",
        state: null,
        city: null,
        countryCode: "",
        stateCode: "",
      },
    };
  }
  countries = Country.getAllCountries();

  updatedCountries = this.countries.map((country) => ({
    label: country.name,
    value: country.isoCode,
    ...country,
  }));
  updatedStates = (countryId) =>
    State.getStatesOfCountry(countryId).map((state) => ({
      label: state.name,
      value: state.name,
      ...state,
    }));
  updatedCities = (countryId, stateId) =>
    City.getCitiesOfState(countryId, stateId).map((city) => ({
      label: city.name,
      value: city.name,

      ...city,
    }));

  handleCountry = (e) => {
    this.setState(
      {
        initialValues: {
          country: e.name,
          state: null,
          city: null,
          countryCode: e.isoCode,
        },
      },
      function () {
        console.log(this.state.initialValues.country, "country");
        this.props.filterValues({
          ftype: "location.partcountry",
          data: { "location.partcountry": [this.state.initialValues.country] },
        });
      }
    );
  };
  handleState = (e) => {
    this.setState(
      {
        initialValues: {
          country: this.state.initialValues.country,
          state: e.name,
          city: null,
          stateCode: e.isoCode,
          countryCode: this.state.initialValues.countryCode,
        },
      },
      function () {
        console.log(this.state.initialValues, "state1234");
        this.props.filterValues({
          ftype: "location.partstate",
          data: { "location.partstate": [this.state.initialValues.state] },
        });
      }
    );
  };
  handleCity = (e) => {
    this.setState(
      {
        tamil: e.value,
        initialValues: {
          country: this.state.initialValues.country,
          state: this.state.initialValues.state,
          city: e.name,
          stateCode: this.state.initialValues.stateCode,
          countryCode: this.state.initialValues.countryCode,
        },
      },
      function () {
        console.log(this.state.initialValues.state, "country123");
        console.log(this.state.tamil, "country123");
        this.state.initialValues.state == "Tamil Nadu"
          ? this.props.filterValues({
              ftype: "location.partcitytamil",
              data: {
                "location.partcitytamil": [this.state.tamil],
              },
            })
          : this.props.filterValues({
              ftype: "location.partcity",
              data: {
                "location.partcity": [this.state.initialValues.city],
              },
            });
      }
    );
  };

  render() {
    return (
      <>
        <Col>
          <Accordion defaultActiveKey="1">
            <ContextAwareToggle eventKey="0">Country</ContextAwareToggle>

            <Accordion.Collapse eventKey="0">
              <Col id="dosham-check">
                <Select
                  isSearchable={true}
                  value={this.updatedCountries.find(
                    (obj) => obj.label == this.state.initialValues.country
                  )}
                  options={this.updatedCountries}
                  onChange={this.handleCountry}
                />
              </Col>
            </Accordion.Collapse>
          </Accordion>
        </Col>
        <Col>
          <Accordion defaultActiveKey="1">
            <ContextAwareToggle eventKey="0">State</ContextAwareToggle>

            <Accordion.Collapse eventKey="0">
              <Col id="dosham-check">
                <Select
                  options={this.updatedStates(
                    this.state.initialValues.country
                      ? this.state.initialValues.countryCode
                      : null
                  )}
                  value={this.updatedStates(
                    this.state.initialValues.countryCode
                  ).find((obj) => obj.label == this.state.initialValues.state)}
                  isSearchable={true}
                  onChange={this.handleState}
                />
              </Col>
            </Accordion.Collapse>
          </Accordion>
        </Col>
        <Col>
          <Accordion defaultActiveKey="1">
            <ContextAwareToggle eventKey="0">
              District / City
            </ContextAwareToggle>

            <Accordion.Collapse eventKey="0">
              <Col id="dosham-check">
                <Select
                  options={
                    this.state.initialValues.state == "Tamil Nadu"
                      ? CountryList
                      : this.updatedCities(
                          this.state.initialValues.state
                            ? this.state.initialValues.countryCode
                            : null,
                          this.state.initialValues.state
                            ? this.state.initialValues.stateCode
                            : null
                        )
                  }
                  value={
                    this.state.initialValues.state == "Tamil Nadu"
                      ? CountryList.find((obj) => obj.value == this.state.tamil)
                      : this.updatedCities(
                          this.state.initialValues.countryCode,
                          this.state.initialValues.stateCode
                        ).find(
                          (obj) => obj.label == this.state.initialValues.city
                        )
                  }
                  isSearchable={true}
                  onChange={this.handleCity}
                />
              </Col>
            </Accordion.Collapse>
          </Accordion>
        </Col>
      </>
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
export default connect(mapStateToProps, mapDispatchToProps)(Country1);
