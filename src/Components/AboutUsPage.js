import React from "react";
import "../App.css";
import { Container, Col } from "react-bootstrap";
import LoginInsideHeader from "./LoginInsideHeader";
import Footer from "./Footer";

class AboutUs extends React.Component {
  render() {
    return (
        <>
        <LoginInsideHeader/>
      <Container>
        <Col className='about-title'>About Us</Col>
        <Col className='about-con'>
          Ganeshkongumatrimony, India's young and fastest growing online matchmaking service.
          It's free to register, it's fast, it's easy to use and it offers
          unmatched experience in finding the perfect life partner.
        </Col>
        <Col className='about-con'>
        Our match making services are based on moral values and ethics.
         We offer superior service and customer satisfaction. Our firm commitment towards building and maintaining strong customer relationship has resulted in our
         position as one of the fastest growing online matrimonial service provider.
        </Col>

      </Container>
      <Col style={{position:'absolute',bottom:0,width:'100%'}}>
      <Footer/>
      </Col>
      </>
    );
  }
}

export default AboutUs