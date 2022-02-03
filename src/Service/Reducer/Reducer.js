import {
  FETCH_USER_DATA,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  FILTER_DATA,
  UPDATE_SLIST,
} from "../Constant";

const initialState = {
  loading: false,
  users: [],
  filteredUsers: [],
  filteredVals: [],
  error: "",
  sList: 0,
};
const Userreducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_DATA:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      console.log(action, "payload12345");
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USER_FAIL:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };
    case FILTER_DATA:
      const filteredArrays = [
        ...state.filteredVals.filter(
          (value) =>
            Object.keys(value)[0] !== Object.keys(action.payload.data)[0]
        ),
        action.payload.data,
      ];
      // console.log(filteredArrays, "Filter Data");

      return {
        ...state,
        loading: false,
        users: state.users,
        filteredUsers: filterData(filteredArrays, state.users),
        filteredVals: filteredArrays,
      };

    case UPDATE_SLIST:
      var slength = state.sList + 1;
      console.log(slength, "updateslist");
      return {
        ...state,
        sList: slength,
      };

    default:
      return state;
  }
};

export default Userreducer;

function GetPropertyValue(obj1, dataToRetrieve) {
  return dataToRetrieve
    .split(".") // split string based on `.`
    .reduce(function (o, k) {
      return o && o[k]; // get inner property if `o` is defined else get `o` and return
    }, obj1); // set initial value as object
}

function filterData(filtersList, usersList) {
  var filtered = [];
  var allFiltereds = [];
  for (let i = 0; i < filtersList.length; i++) {
    const element = filtersList[i];
    var ftype = Object.keys(element)[0];
    var filterCond = true;
    Object.values(element).forEach((fvalue) => {
      console.log(fvalue, "fval");
      if (ftype == "basic.age" || ftype == "basic.heightVal") {
        var ageArr = fvalue[0];
        filterCond =
          ftype == "basic.age"
            ? "ageTo" in ageArr || "ageFrom" in ageArr
            : "heightFrom" in ageArr || "heightTo" in ageArr
            ? ftype == "basic.age"
              ? ageArr.ageTo == null && ageArr.ageFrom == null
              : ageArr.heightTo == null && ageArr.heightFrom == null
              ? false
              : true
            : false;
      } else {
        filterCond = Array.isArray(fvalue) && fvalue.length == 0 ? false : true;
      }
    });
    if (filterCond) {
      var singleFiltered = [];
      usersList.forEach((value, key) => {
        // Iterating over Physical object
        Object.values(element).map((val, index) => {
          // Iterating over physical array data
          val.map((vals) => {
            console.log(ftype, "ftype");
            console.log(GetPropertyValue(value, ftype), "fadtas");
            let fVal;
            let filteredUsersdata;
            if (
              typeof vals === "object" ||
              ftype == "basic.age" ||
              ftype == "basic.heightVal"
            ) {
              if (
                ("ageFrom" in vals && "ageTo" in vals) ||
                ("heightFrom" in vals && "heightTo" in vals) ||
                ("incomeFrom" in vals && "incomeTo" in vals)
              ) {
                var fvalTo =
                  ftype == "basic.age"
                    ? vals.ageTo
                    : ftype == "basic.heightVal"
                    ? vals.heightTo
                    : vals.incomeTo;
                var fvalFrom =
                  ftype == "basic.age"
                    ? vals.ageFrom
                    : ftype == "basic.heightVal"
                    ? vals.heightFrom
                    : vals.incomeFrom;
                filteredUsersdata =
                  value.basic == undefined ||
                  value.basic == null ||
                  value.basic == ""
                    ? null
                    : GetPropertyValue(value, ftype) >= fvalFrom &&
                      GetPropertyValue(value, ftype) <= fvalTo
                    ? value
                    : null;
              } else if (
                "ageFrom" in vals ||
                "heightFrom" in vals ||
                "incomeFrom" in vals
              ) {
                fVal =
                  ftype == "basic.age"
                    ? vals.ageFrom
                    : ftype == "basic.heightVal"
                    ? vals.heightFrom
                    : vals.incomeFrom;
                filteredUsersdata =
                  value.basic == undefined ||
                  value.basic == null ||
                  value.basic == ""
                    ? null
                    : GetPropertyValue(value, ftype) >= fVal
                    ? value
                    : null;
              } else if (
                "ageTo" in vals ||
                "heightTo" in vals ||
                "incomeTo" in vals
              ) {
                fVal =
                  ftype == "basic.age"
                    ? vals.ageFrom
                    : ftype == "basic.heightVal"
                    ? vals.heightFrom
                    : vals.incomeFrom;
                filteredUsersdata =
                  value.basic == undefined ||
                  value.basic == null ||
                  value.basic == ""
                    ? null
                    : GetPropertyValue(value, ftype) <= fVal
                    ? value
                    : null;
              }
            } else if (ftype == "photo") {
              var photos = value.photo;
              filteredUsersdata =
                vals == "With Photo"
                  ? photos == null || photos == "" || photos == undefined
                    ? null
                    : value
                  : vals == "Without Photo"
                  ? photos == undefined || photos == null || photos == ""
                    ? value
                    : null
                  : null;
            } else if (ftype == "name") {
              var names = value.name;
              filteredUsersdata =
                names == undefined || names == null || names == ""
                  ? null
                  : GetPropertyValue(value, ftype)
                      .toLowerCase()
                      .includes(vals.toLowerCase())
                  ? value
                  : null;
            } else if (ftype == "_id") {
              var id = value._id;
              filteredUsersdata =
                id == undefined || id == null || id == ""
                  ? null
                  : GetPropertyValue(value, ftype)
                      .toLowerCase()
                      .includes(vals.toLowerCase())
                  ? value
                  : null;
            } else if (ftype == "gender") {
              var genderVals = value.gender;
              filteredUsersdata =
                genderVals == undefined ||
                genderVals == null ||
                genderVals == ""
                  ? null
                  : GetPropertyValue(value, ftype) == vals
                  ? value
                  : null;
            } else if (ftype == "_id") {
              var genderVals = value._id;
              filteredUsersdata =
                genderVals == undefined ||
                genderVals == null ||
                genderVals == ""
                  ? null
                  : GetPropertyValue(value, ftype) == vals
                  ? value
                  : null;
            } else {
              var basicVals = value.basic;
              filteredUsersdata =
                basicVals == undefined || basicVals == null || basicVals == ""
                  ? null
                  : GetPropertyValue(value, ftype) == vals
                  ? value
                  : null;
            }

            if (filteredUsersdata == null) {
            } else {
              filtered = [...filtered, filteredUsersdata];
              singleFiltered = [...singleFiltered, filteredUsersdata];
            }
          });
        });
      });
      allFiltereds.push(singleFiltered);
    }
  }

  // Removing duplicated data
  const ids = filtered.map((obj) => obj._id);
  filtered = filtered.filter(({ _id }, index) => !ids.includes(_id, index + 1));

  // AND Operation on Multiple Arrays oF Objects
  const filteredArrs =
    Array.isArray(allFiltereds) && allFiltereds.length == 0
      ? []
      : allFiltereds.reduce((arr, barr) =>
          arr.filter((carr) => barr.some((item) => item._id === carr._id))
        );
  console.log(filteredArrs, allFiltereds, "fids");

  // Getting Filter List Length
  var fvalsLength = 0;
  if (filtersList == [] || filtersList == null) {
    fvalsLength = 0;
  } else {
    filtersList.forEach((element) => {
      var ftype = Object.keys(element)[0];
      Object.values(element).map((val) => {
        console.log(val.length, "fvalss");
        var obj = val[0];
        if (ftype == "basic.age" || ftype == "basic.heightVal") {
          if (Object.keys(obj).length == 0) {
          } else {
            fvalsLength += 1;
          }
        } else {
          if (val.length == 0) {
            // fvalsLength = 0;
          } else {
            fvalsLength += 1;
          }
        }
      });
    });
  }

  console.log(filtered, "filtered");
  return fvalsLength === 1 ? filtered : filteredArrs;
}
