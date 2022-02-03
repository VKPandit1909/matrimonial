import {
  FETCH_USER_DATA,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  FILTER_DATA,
  UPDATE_SLIST,
  FILTER_SELECT,
} from "../Constant";

export const fetchUserData = () => {
  return {
    type: FETCH_USER_DATA,
  };
};
export const fetchUserSuccess = (users) => {
  console.log(users, "act");
  return {
    type: FETCH_USER_SUCCESS,
    payload: users,
  };
};
export const fetchUserFail = (error) => {
  return {
    type: FETCH_USER_FAIL,
    payload: error,
  };
};
export const filterValues = (values) => {
  console.log(values,"filterValuses");
  return {
    type: FILTER_DATA,
    payload: values,
  };
};
export const filterSelect = (values) => {
  console.log(values, "filterValuses");
  return {
    type: FILTER_SELECT,
    payload: values,
  };
};
export const updateSList = () => {
  return {
    type: UPDATE_SLIST,
  };
};

export const fetchUsers = (ad) => {
  const loggedIn = window.localStorage.getItem("isLoggedIn");
 

  return (dispatch) => {
    const m = "Male";
    const f = "Female";
    const gen =
      loggedIn == undefined ||
      loggedIn == false ||
      ad == undefined ||
      ad == null ||
      ad == ""
        ? undefined
        : ad == "Male"
        ? "Female"
        : "Male";
    console.log(gen, "gender");

    fetch("http://localhost:3000/user-datas", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
        gender: gen,
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        const users = results.data;

        console.log(users, "location");

        dispatch(fetchUserSuccess(users));
      })
      .catch((error) => {
        const errorMsg = error.message;
      });
  };
};
