import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import LoadingScreen from "./Components/LoadingScreen";
import LoginInsideContent from "./Components/LoginInsideContent";
import ProfileDetails from "./Components/ProfileDetails";
import RegisterPage from "./Components/RegisterPage";
import Search from "./Components/Search";
import UserProfile from "./Components/UserProfile";
import UserContext from "./Context/UserContext";
import UserInterest from "./Components/UserInterest";
import Trial from "./Service/Trial";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./Service/Actions/Actions";
import ChangePassword from "./Components/ChangePassword";
import AboutUs from "./Components/AboutUsPage";
import ContactUs from "./Components/ContactUsPage";
import HoroCers from "./Components/HoroCer";

import MyDocument from "./Components/PDF";
import Jatharam from "./Components/Jatharam";
import OTPVerification from "./Components/otpVerification";
import ResetPassword from "./Components/ResetPassword";

const Routes = () => {
  const loggedIn = window.localStorage.getItem("isLoggedIn");
  console.log(loggedIn, "login");
  const [details, setDetails] = useState("");
  const [basic, setBasic] = useState("");
  const [horoscope, setHoroscope] = useState("");
  const [religion, setReligion] = useState("");
  const [locationPrefer, setLocationPrefer] = useState("");
  const [professional, setProfessional] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [family, setFamily] = useState("");
  const [lifestyle, setLifestyle] = useState("");
  const [boxHoro, setBoxHoro] = useState("");
  const [boxHoroSecond, setBoxHoroSecond] = useState("");
  const [partnerpreference, setPartnerPreference] = useState("");
  const [professionalprefer, setProfessionalPref] = useState("");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const getMdata = async (dispatch) => {
    await dispatch(fetchUsers());
    getData(dispatch);
  };

  const getLoggedData = async (dispatch) => {
    await dispatch(fetchUsers());
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    if (loggedIn) {
      // getData();
      getMdata(dispatch);
    } else {
      getLoggedData(dispatch);
    }
  }, [dispatch]);

  const getData = async () => {
    await fetch("http://localhost:3000/user-details", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        dispatch(fetchUsers(results.data.gender));
        // console.log(results, "results");
        // global.userData = results.data;
        setDetails(results.data);
        setBasic(results.data.basic);
        setHoroscope(results.data.horoscope);
        setLocationPrefer(results.data.locationprefer);
        setReligion(results.data.religion);
        setProfessional(results.data.professional);

        setContact(results.data.contact);
        setLocation(results.data.location);
        setFamily(results.data.family);
        setLifestyle(results.data.lifestyle);
        setPartnerPreference(results.data.partnerpreference);
        setProfessionalPref(results.data.professionalprefer);
        setBoxHoro(results.data.boxHoroscope);
        setBoxHoroSecond(results.data.boxHoroscopeSecond);

        setLoading(false);
      });
  };
  return (
    <Switch>
      {loading ? (
        <LoadingScreen />
      ) : (
        <UserContext.Provider
          value={{
            details,
            basic,
            horoscope,
            locationPrefer,
            religion,
            professional,
            contact,
            location,
            family,
            lifestyle,
            partnerpreference,
            professionalprefer,
            boxHoro,
            boxHoroSecond,
          }}
        >
          <Route path="/" exact component={loggedIn ? UserProfile : HomePage} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/content" exact component={LoginInsideContent} />
          <Route path="/userprofile" exact component={UserProfile} />
          <Route path="/search" exact component={Search} />
          <Route path="/profile/:id" exact component={ProfileDetails} />
          <Route path="/user-interests" exact component={UserInterest} />
          <Route path="/otp-verify" exact component={OTPVerification} />
          <Route path="/reset-password" exact component={ResetPassword} />
          <Route path="/trial" exact component={Trial} />
          <Route path="/contact" exact component={ContactUs} />
          <Route path="/about" exact component={AboutUs} />
          <Route path="/horocer" exact component={HoroCers} />
          <Route path="/view-pdf" exact component={MyDocument} />
          <Route path="/view-jatharam/:id" exact component={Jatharam} />

        </UserContext.Provider>
      )}
    </Switch>
  );
};
export default Routes;
