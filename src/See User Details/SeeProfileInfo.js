import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdCard,
  faUpload,
  faGraduationCap,
  faMapMarkerAlt,
  faMoneyBillAlt,
  faIndustry,
  faStreetView,
  faAsterisk,
  faStarOfDavid,
  faThLarge,
} from "@fortawesome/free-solid-svg-icons";
import { Image } from "antd";

class SeeProfileInfo extends React.Component {
  render() {
    console.log(this.props.details.photo, "photo");
    return (
      <>
        <div className="profile-info-title ">{this.props.details.name}</div>
        <Col className="pic-div">
          <div className="col-lg-5 pic-img-div">
            <Image
              width="100%"
              src={this.props.loggedIn?
                this.props.details.photo == "" ||
                this.props.details.photo == undefined ||
                this.props.details.photo == null
                  ? "https://www.mayyam.in/css/images/noavatar.jpg"
                  : this.props.details.photo
                :"https://www.mayyam.in/css/images/noavatar.jpg"
              }
            />
          </div>
          <div className="col-lg-7 pic-info-div">
            <div className="info-content">
              <div className="info-icon">
                <FontAwesomeIcon icon={faIdCard} />
              </div>
              <div>
                <h4 className="info-name">
                  {this.props.details.name == ""
                    ? "-"
                    : this.props.details.name}
                </h4>
              </div>
            </div>
            <div className="info-content">
              <div className="info-icon">
                <FontAwesomeIcon icon={faStreetView} />
              </div>
              <div>
                <h4 className="info-name">
                  {this.props.details.gender == ""
                    ? "-"
                    : this.props.details.gender}
                </h4>
              </div>
            </div>
            <div className="info-content">
              <div className="info-icon">
                <FontAwesomeIcon icon={faAsterisk} />
              </div>
              <div>
                <h4 className="info-name"></h4>
              </div>
            </div>
            <div className="info-content">
              <div className="info-icon">
                <FontAwesomeIcon icon={faStarOfDavid} />
              </div>
              <div>
                <h4 className="info-name">
                  {this.props.details.horoscope == undefined
                    ? "-"
                    : this.props.details.horoscope.birthplace == ""
                    ? "-"
                    : this.props.details.horoscope.birthplace}
                </h4>
              </div>
            </div>
            <div className="info-content">
              <div className="info-icon">
                <FontAwesomeIcon icon={faThLarge} />
              </div>
              <div>
                <h4 className="info-name">
                  {this.props.details.religion == undefined
                    ? "-"
                    : this.props.details.religion.partcaste == ""
                    ? "-"
                    : this.props.details.religion.partcaste}
                </h4>
              </div>
            </div>
            <div className="info-content">
              <div className="info-icon">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </div>
              <div>
                <h4 className="info-name">
                  {this.props.details.location == undefined
                    ? "-"
                    : this.props.details.location.partstate == ""
                    ? "-"
                    : this.props.details.location.partstate}
                  {this.props.details.location == undefined
                    ? "-"
                    : this.props.details.location.partcity}
                </h4>
              </div>
            </div>
            <div className="info-content">
              <div className="info-icon">
                <FontAwesomeIcon icon={faGraduationCap} />
              </div>
              <div>
                <h4 className="info-name">
                  {this.props.details.professional == undefined
                    ? "-"
                    : this.props.details.professional.parteducation == ""
                    ? "-"
                    : this.props.details.professional.parteducation}
                </h4>
              </div>
            </div>
            <div className="info-content">
              <div className="info-icon">
                <FontAwesomeIcon icon={faIndustry} />
              </div>
              <div>
                <h4 className="info-name">
                  {this.props.details.professional == undefined
                    ? "-"
                    : this.props.details.professional.partindustry == ""
                    ? "-"
                    : this.props.details.professional.partindustry}
                </h4>
              </div>
            </div>
            <div className="info-content">
              <div className="info-icon">
                <FontAwesomeIcon icon={faMoneyBillAlt} />
              </div>
              <div>
                <h4 className="info-name">
                  {this.props.details.professional == undefined
                    ? "-"
                    : this.props.details.professional.partincome == ""
                    ? "-"
                    : this.props.details.professional.partincome}
                </h4>
              </div>
            </div>
          </div>
        </Col>
      </>
    );
  }
}

export default SeeProfileInfo;
