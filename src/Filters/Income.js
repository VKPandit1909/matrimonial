// import "../App.css";
// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Col, Accordion, Form, Row } from "react-bootstrap";
// import ContextAwareToggle from "../Components/CustomToggleHeader";

// const Income = () => {
//   return (
//     <Col>
//       <Accordion defaultActiveKey="1">
//         <ContextAwareToggle eventKey="0">Income(in Lakhs)</ContextAwareToggle>

//         <Accordion.Collapse eventKey="0">
//           <Form className="main-age-form">
//             <Form.Control
//               className="main-age-input"
//               required
//               type="number"
//               min="1"
//               placeholder="From"
//               max="9"
//               id='height1'
              
//             />
//             <Form.Control
//               className="main-age-input"
//               required
//               type="number"
//               min="4"
//               placeholder="To"
//               max="100"
//               id='height2'
              
//             />
//           </Form>
//         </Accordion.Collapse>
//       </Accordion>
//     </Col>
//   );
// };
// export default Income;
import "../App.css";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Accordion, Form } from "react-bootstrap";
import ContextAwareToggle from "../Components/CustomToggleHeader";
import Select from "react-select";
import { connect } from "react-redux";
import { filterValues } from "../Service/Actions/Actions";

class Income extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incomeFrom: "",
      incomeTo: "",
      incomeToList: [],
      incomeFromList: [],
    };
  }

  componentDidMount() {
    const AnnualIncomeList = [
      { label: "Less then Rs. 3 Lakh/ annum", value: "500" },
      { label: "Rs. 3 Lakh - Rs. 4 Lakh/ annum", value: "550" },
      { label: "Rs. 4 Lakh - Rs. 5 Lakh/ annum", value: "600" },
      { label: "Rs. 5 Lakh - Rs. 6 Lakh/ annum", value: "650" },
      { label: "Rs. 6 Lakh - Rs. 7 Lakh/ annum", value: "700" },
      { label: "Rs. 7 Lakh - Rs. 8 Lakh/ annum", value: "800" },
      { label: "Rs. 8 Lakh - Rs. 9 Lakh/ annum", value: "900" },
      { label: "Rs. 9 Lakh - Rs. 10 Lakh/ annum", value: "1000" },
      { label: "Rs. 10 Lakh - Rs. 15 Lakh/ annum", value: "1500" },
      { label: "Rs. 15 Lakh - Rs. 30 Lakh/ annum", value: "3000" },
      { label: "Rs. 30 Lakh - Rs. 50 Lakh/ annum", value: "5000" },
      { label: "Rs. 50 Lakh - Rs. 75 Lakh/ annum", value: "75000" },
      { label: "Rs. 1 Crore/ annum", value: "100000" },
    ];
    

    const incomeFromList = [{ label: "From", value: null }, ...AnnualIncomeList];
    const incomeToList = [{ label: "To", value: null }, ...AnnualIncomeList];
    this.setState({
      incomeToList,
      incomeFromList,
    });
  }

  AnnualIncomeList = [];
  changeIncomeFrom = (incomeFrom) => {
    this.setState({
      incomeFrom: incomeFrom,
      incomeToList: this.state.incomeToList.filter(
        (e) => e.value >= incomeFrom || e.value == null
      ),
    });

    Array.isArray(this.AnnualIncomeList) && this.AnnualIncomeList.length == 0
      ? this.AnnualIncomeList.push({
          incomeFrom: incomeFrom,
        })
      : this.AnnualIncomeList.forEach((val) => {
          val.incomeFrom = incomeFrom;
        });

    // Delete the pair if null
    if (incomeFrom == null) delete this.AnnualIncomeList[0]["incomeFrom"];
    this.props.filterValues({
      ftype: "professional.partannualincome.value",
      data: { "professional.partannualincome.value": this.AnnualIncomeList },
    });
  };
  changeIncomeTo = (incomeTo) => {
    this.setState({
      incomeTo: incomeTo,
    });

    Array.isArray(this.AnnualIncomeList) && this.AnnualIncomeList.length == 0
      ? this.AnnualIncomeList.push({
          incomeTo: incomeTo,
        })
      : this.AnnualIncomeList.forEach((val) => {
          val.incomeTo = incomeTo;
        });

    // Delete the pair if null
    if (incomeTo == null) delete this.AnnualIncomeList[0]["incomeTo"];
    this.props.filterValues({
      ftype: "professional.partannualincome.value",
      data: { "professional.partannualincome.value": this.AnnualIncomeList },
    });
  };
  render() {
    return (
      <Col>
        <Accordion defaultActiveKey="1">
          <ContextAwareToggle eventKey="0">Income</ContextAwareToggle>
          <Accordion.Collapse eventKey="0">
            <Form className="main-age-form">
              <Select
                className="detail-form-input"
                options={this.state.incomeFromList}
                placeholder="From"
                isSearchable={true}
                value={this.state.incomeFromList.find(
                  (obj) => obj.value == this.state.incomeFrom
                )}
                onChange={(e) => {
                  this.changeIncomeFrom(e.value);
                }}
              />
              <Select
                className="detail-form-input"
                options={this.state.incomeToList}
                placeholder="To"
                isSearchable={true}
                value={this.state.incomeToList.find(
                  (obj) => obj.value == this.state.incomeTo
                )}
                onChange={(e) => {
                  this.changeIncomeTo(e.value);
                }}
              />
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
export default connect(null, mapDispatchToProps)(Income);
