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
import UserContext from "../Context/UserContext";
import ProfileUpload from "./ProfileUpload";

class ProfileInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      religion: "",
    };
  }
  componentDidMount() {
    const { details } = this.context;
    this.setState({
      religion:
        details.religion == undefined
          ? "-"
          : details.religion.partreligion == ""
          ? "-"
          : details.religion.partreligion,
    });
  }
  render() {
    const { details } = this.context;
    return (
      <>
        <div className="profile-info-title ">{details.name}</div>
        <Col className="pic-div">
          <div className="col-lg-5 pic-img-div">
            <ProfileUpload />
          </div>
          <div className="col-lg-7 pic-info-div">
            <div className="info-content">
              <div className="info-icon">
                <FontAwesomeIcon icon={faIdCard} />
              </div>
              <div>
                <h4 className="info-name">
                  {details.name == "" ? "-" : details.name}
                </h4>
              </div>
            </div>
            <div className="info-content">
              <div className="info-icon">
                <FontAwesomeIcon icon={faStreetView} />
              </div>
              <div>
                <h4 className="info-name">
                  {details.gender == "" ? "-" : details.gender}
                </h4>
              </div>
            </div>
            <div className="info-content">
              <div className="info-icon">
                <FontAwesomeIcon icon={faAsterisk} />
              </div>
              <div>
                <h4 className="info-name">{this.state.religion}</h4>
              </div>
            </div>
            <div className="info-content">
              <div className="info-icon">
                <FontAwesomeIcon icon={faStarOfDavid} />
              </div>
              <div>
                <h4 className="info-name">
                  {details.horoscope == undefined
                    ? "-"
                    : details.horoscope.birthplace == ""
                    ? "-"
                    : details.horoscope.birthplace}
                </h4>
              </div>
            </div>
            <div className="info-content">
              <div className="info-icon">
                <FontAwesomeIcon icon={faThLarge} />
              </div>
              <div>
                <h4 className="info-name">
                  {details.religion == undefined
                    ? "-"
                    : details.religion.partcaste == ""
                    ? "-"
                    : details.religion.partcaste}
                </h4>
              </div>
            </div>
            <div className="info-content">
              <div className="info-icon">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </div>
              <div>
                <h4 className="info-name">
                  {details.location == undefined
                    ? ""
                    : details.location.partstate}
                  {details.location == undefined
                    ? "-"
                    : details.location.partcity}
                </h4>
              </div>
            </div>
            <div className="info-content">
              <div className="info-icon">
                <FontAwesomeIcon icon={faGraduationCap} />
              </div>
              <div>
                <h4 className="info-name">
                  {details.professional == undefined
                    ? "-"
                    : details.professional.parteducation == ""
                    ? "-"
                    : details.professional.parteducation}
                </h4>
              </div>
            </div>
            <div className="info-content">
              <div className="info-icon">
                <FontAwesomeIcon icon={faIndustry} />
              </div>
              <div>
                <h4 className="info-name">
                  {details.professional == undefined
                    ? "-"
                    : details.professional.partindustry == ""
                    ? "-"
                    : details.professional.partindustry}
                </h4>
              </div>
            </div>
            <div className="info-content">
              <div className="info-icon">
                <FontAwesomeIcon icon={faMoneyBillAlt} />
              </div>
              <div>
                <h4 className="info-name">
                  {details.professional == undefined
                    ? "-"
                    : details.professional.partincome == ""
                    ? "-"
                    : details.professional.partincome}
                </h4>
              </div>
            </div>

            <Row className="info-btn-div">
              <div className="col-lg-6 col-md-12">
                {" "}
                <a href="./view-pdf">
                  <button>
                    {" "}
                    <FontAwesomeIcon
                      icon={faUpload}
                      className="upload-icon"
                    />{" "}
                   View Jathagam
                  </button>
                </a>
              </div>
              <div className="col-lg-6 col-md-12 upload-btn-horo">
                {" "}
                <a href="./horocer">
                  <button>
                    {" "}
                    <FontAwesomeIcon icon={faUpload} className="upload-icon" />
                    Edit Your Horoscope
                  </button>
                </a>
              </div>
            </Row>
          </div>
        </Col>
      </>
    );
  }
}
ProfileInfo.contextType = UserContext;

export default ProfileInfo;
