import React, { Component } from "react";
import Content from "./Content";
import Footer from "./Footer";
import Register from "./Form";
import Header from "./Header";

class HomePage extends Component {
  render() {
    const loggedIn = window.localStorage.getItem("isLoggedIn");
    console.log(loggedIn,'logedin')
    return (
      <>
        <Header />
        <Register />
        <Content />
        <Footer />
      </>
    );
  }
}

export default HomePage;
