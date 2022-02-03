// import Select from "react-select";
// import "../App.css";
// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Col, Accordion, Form, Row } from "react-bootstrap";
// import ContextAwareToggle from "../Components/CustomToggleHeader";
// import { connect } from "react-redux";
// import { filterValues } from "../Service/Actions/Actions";

// class UniqueId extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       usearchId: [],
//       uid: [],
//       id: [],
//     };
//   }
//   componentDidMount() {
//     console.log(this.props.userData, "Unique");
//     setTimeout(() => {
//       const a = this.props.userData.map((item) => item._id);

//       console.log(a, "abbbbbbbb");
//       const uidList = [];
//       for (let i = 0; i <= a.length; i++) {
//         uidList.push({
//           label: a[i],
//           value: a[i],
//         });
//       }

//       this.setState({ uid: uidList });
//     }, 1000);

//     // console.log("hello");
//     // console.log(this.props.uniqueID, "uniqueID");
//     // if (this.props.uniqueID.length >= 1) {

//     //       this.handleCheckbox(this.props.uniqueID);

//     // } else {
//     // }
//   }
//   handleCheckbox = (val) => {
//     console.log(Array.isArray(val) ? val.map((x) => x) : [], "llllll");
//     this.setState(
//       {
//         usearchId: Array.isArray(val) ? val.map((x) => x) : [],
//       },
//       function () {
//         console.log(this.state.usearchId, "urassi");
//         this.props.filterValues({
//           ftype: "_id",
//           data: { _id: this.state.usearchId },
//         });
//       }
//     );
//   };

//   handleSearch = (e) => {
//     this.setState(
//       {
//         usearchId: Array.isArray(e) ? e.map((x) => x.value) : [],
//       },
//       function () {
//         console.log(this.state.usearchId, "usearchId");
//         this.props.filterValues({
//           ftype: "_id",
//           data: { _id: this.state.usearchId },
//         });
//       }
//     );
//   };
//   render() {
//     return (
//       <Col>
//         <Accordion defaultActiveKey="1">
//           <ContextAwareToggle eventKey="0">
//             Search By Unique Id
//           </ContextAwareToggle>

//           <Accordion.Collapse eventKey="0">
//             <Col id="dosham-check">
//               <Select
//                 options={this.state.uid}
//                 isSearchable={true}
//                 isMulti
//                 value={this.state.uid.filter((obj) =>
//                   this.state.usearchId.includes(obj.value)
//                 )}
//                 onChange={this.handleSearch}
//               />
//             </Col>
//           </Accordion.Collapse>
//         </Accordion>
//       </Col>
//     );
//   }
// }
// const mapStateToProps = (state) => {
//   const fvals = state.user.filteredVals;
//   var fvalsLength = 0;
//   if (fvals == [] || fvals == null) {
//     fvalsLength = 0;
//   } else {
//     fvals.forEach((element) => {
//       console.log(element, "fvalelement");
//       var ftype = Object.keys(element)[0];
//       console.log(ftype, "fvallllllll");
//       Object.values(element).map((val) => {
//         console.log(val, "fvalsshbbb");
//         console.log(val.length, "fvalss");
//         var obj = val[0];
//         console.log(obj, "fvalobj");
//         if (ftype == "basic.age" || ftype == "basic.heightVal") {
//           if (Object.keys(obj).length == 0) {
//           } else {
//             fvalsLength = 1;
//           }
//         } else {
//           if (val.length == 0) {
//             // fvalsLength = 0;
//           } else {
//             fvalsLength = 1;
//           }
//         }
//       });
//     });
//   }

//   console.log(state, "fvals");
//   const gdata = state.user.filteredUsers;
//   const gfilterval = state.user.filteredVals;
//   const gdataLength = gdata == undefined ? 0 : gdata.length;
//   console.log(gdataLength, "length");
//   console.log(fvalsLength, "kkkkk");
//   return {
//     userData: fvalsLength == 0 ? state.user.users : state.user.filteredUsers,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     filterValues: (value) => dispatch(filterValues(value)),
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(UniqueId);

import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Accordion, Form } from "react-bootstrap";
import ContextAwareToggle from "../Components/CustomToggleHeader";
import { connect } from "react-redux";
import { filterValues } from "../Service/Actions/Actions";

class UniqueId extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
    };
  }
  loggedIn = window.localStorage.getItem("isLoggedIn");

  componentDidMount() {
    if (this.loggedIn) {
    } else {
      const len =
        this.props.uniqueID == undefined || this.props.uniqueID == ""
          ? 0
          : this.props.uniqueID.length;
      if (len >= 1) {
        setTimeout(
          () => {
            this.handleInput(this.props.uniqueID);
          },

          500
        );
      } else {
      }
    }
  }

  handleInput = (val) => {
    console.log(val, "lllllllll");

    // console.log(filtersVal,'llllllo');
    this.setState(
      {
        uid: val,
      },
      function () {
        console.log(this.state.uid, "uid");
        this.props.filterValues({
          ftype: "_id",
          data: { _id: [this.state.uid] },
        });
      }
    );
  };
  handleName = (e) => {
    this.setState(
      {
        uid: e.target.value,
      },
      function () {
        console.log(this.state.uid, "uid");
        this.props.filterValues({
          ftype: "_id",
          data: { _id: [this.state.uid] },
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
              : this.props.uniqueID == undefined || this.props.uniqueID == ""
              ? "1"
              : this.props.uniqueID.length >= 1
              ? "0"
              : "1"
          }
        >
          <ContextAwareToggle eventKey="0">
            Search By UniqueID
          </ContextAwareToggle>
          <Accordion.Collapse eventKey="0">
            <Form id="dosham-check">
              <Form.Control
                required
                type="text"
                name="uid"
                value={this.state.uid}
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
export default connect(mapStateToProps, mapDispatchToProps)(UniqueId);
