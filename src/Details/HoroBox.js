import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../Context/UserContext";
import { message } from "antd";

class HoroBox extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.changeSection = this.changeSection.bind(this);
    this.state = {
      showForm: false,
      about: null,
      validated: false,
      uhoro1: [""],
      uhoro2: [""],
      uhoro3: [""],
      uhoro4: [""],
      uhoro5: [""],
      uhoro6: [""],
      uhoro7: [""],
      uhoro8: [""],
      uhoro9: [""],
      uhoro10: [""],
      uhoro11: [""],
      uhoro12: [""],
    };
  }
  changeSection() {
    this.setState({ showForm: !this.state.showForm });
    console.log("clicked");
  }

  handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      this.setState({ validated: true });
    } else {
      fetch("http://localhost:3000/set-details", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          token: window.localStorage.getItem("token"),
          fields: {
            about: this.state.about,
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          message.success("Data Saved Successfully.");

          this.changeSection();
        });
    }
  };
  componentDidMount() {
    const { details } = this.context;
    console.log(details, "compound");
    if (details == "" || details == null || details == undefined) {
    } else {
      this.setState({
        about: details.about == undefined ? "" : details.about,
      });
    }
  }

  render() {
    const { details } = this.context;
    const AbouSection = (
      <>
        <div className="col-md-12 row">
          <div className="col-md-6 pdf-info-div ">
            <div className="row pdf-horo">
              <div className="col-md-3 pdf-horo-el">
                {details.boxHoroscope == undefined
                  ? ""
                  : details.boxHoroscope.horo12.join(" ")}
              </div>
              <div className="col-md-3  pdf-horo-el">
                {details.boxHoroscope == undefined
                  ? ""
                  : details.boxHoroscope.horo1.join(" ")}
              </div>
              <div className="col-md-3  pdf-horo-el">
                {details.boxHoroscope == undefined
                  ? ""
                  : details.boxHoroscope.horo2.join(" ")}
              </div>
              <div className="col-md-3  pdf-horo-el">
                {details.boxHoroscope == undefined
                  ? ""
                  : details.boxHoroscope.horo3.join(" ")}
              </div>

              <div className="col-md-3 pdf-horo-el-1 mid-div ">
                <div className="col-md-12 mid-div-in  ">
                  {details.boxHoroscope == undefined
                    ? ""
                    : details.boxHoroscope.horo11.join(" ")}
                </div>
                <div className="col-md-12  mid-div-in   ">
                  {details.boxHoroscope == undefined
                    ? ""
                    : details.boxHoroscope.horo10.join(" ")}
                </div>
              </div>

              <div className="col-md-6   pdf-horo-el-1 mid-main">Rasi</div>
              <div className="col-md-3 pdf-horo-el-1 mid-div rm-ri ">
                <div className="col-md-12 mid-div-in  ">
                  {details.boxHoroscope == undefined
                    ? ""
                    : details.boxHoroscope.horo4.join(" ")}
                </div>
                <div className="col-md-12  mid-div-in   ">
                  {details.boxHoroscope == undefined
                    ? ""
                    : details.boxHoroscope.horo5.join(" ")}
                </div>
              </div>
              <div className="col-md-3 pdf-horo-el-2">
                {details.boxHoroscope == undefined
                  ? ""
                  : details.boxHoroscope.horo9.join(" ")}
              </div>
              <div className="col-md-3  pdf-horo-el-2">
                {details.boxHoroscope == undefined
                  ? ""
                  : details.boxHoroscope.horo8.join(" ")}
              </div>
              <div className="col-md-3  pdf-horo-el-2">
                {details.boxHoroscope == undefined
                  ? ""
                  : details.boxHoroscope.horo7.join(" ")}
              </div>
              <div className="col-md-3  pdf-horo-el-2 rm-ri">
                {details.boxHoroscope == undefined
                  ? ""
                  : details.boxHoroscope.horo6.join(" ")}
              </div>
            </div>
          </div>
          <div className="col-md-6 pdf-info-div">
            <div className="row pdf-horo">
              <div className="col-md-3 pdf-horo-el">
                {details.boxHoroscopeSecond == undefined
                  ? ""
                  : details.boxHoroscopeSecond.horo12.join(" ")}
              </div>
              <div className="col-md-3  pdf-horo-el">
                {details.boxHoroscopeSecond == undefined
                  ? ""
                  : details.boxHoroscopeSecond.horo1.join(" ")}
              </div>
              <div className="col-md-3  pdf-horo-el">
                {details.boxHoroscopeSecond == undefined
                  ? ""
                  : details.boxHoroscopeSecond.horo2.join(" ")}
              </div>
              <div className="col-md-3  pdf-horo-el">
                {details.boxHoroscopeSecond == undefined
                  ? ""
                  : details.boxHoroscopeSecond.horo3.join(" ")}
              </div>

              <div className="col-md-3 pdf-horo-el-1 mid-div ">
                <div className="col-md-12 mid-div-in  ">
                  {details.boxHoroscopeSecond == undefined
                    ? ""
                    : details.boxHoroscopeSecond.horo11.join(" ")}
                </div>
                <div className="col-md-12  mid-div-in   ">
                  {details.boxHoroscopeSecond == undefined
                    ? ""
                    : details.boxHoroscopeSecond.horo10.join(" ")}
                </div>
              </div>

              <div className="col-md-6   pdf-horo-el-1 mid-main">Navasam</div>
              <div className="col-md-3 pdf-horo-el-1 mid-div rm-ri ">
                <div className="col-md-12 mid-div-in  ">
                  {details.boxHoroscopeSecond == undefined
                    ? ""
                    : details.boxHoroscopeSecond.horo4.join(" ")}
                </div>
                <div className="col-md-12  mid-div-in   ">
                  {details.boxHoroscopeSecond == undefined
                    ? ""
                    : details.boxHoroscopeSecond.horo5.join(" ")}
                </div>
              </div>
              <div className="col-md-3 pdf-horo-el-2">
                {details.boxHoroscopeSecond == undefined
                  ? ""
                  : details.boxHoroscopeSecond.horo9.join(" ")}
              </div>
              <div className="col-md-3  pdf-horo-el-2">
                {details.boxHoroscopeSecond == undefined
                  ? ""
                  : details.boxHoroscopeSecond.horo8.join(" ")}
              </div>
              <div className="col-md-3  pdf-horo-el-2">
                {details.boxHoroscopeSecond == undefined
                  ? ""
                  : details.boxHoroscopeSecond.horo7.join(" ")}
              </div>
              <div className="col-md-3  pdf-horo-el-2 rm-ri">
                {details.boxHoroscopeSecond == undefined
                  ? ""
                  : details.boxHoroscopeSecond.horo6.join(" ")}
              </div>
            </div>
          </div>
        </div>
      </>
    );
    const AboutForm = (
      <Form
        className="details-form"
        noValidate
        validated={this.state.validated}
        onSubmit={(e) => {
          this.handleSubmit(e);
        }}
      >
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            required
            as="textarea"
            rows={3}
            value={this.state.about}
            onChange={(e) => {
              this.setState({ about: e.target.value });
            }}
          />
        </Form.Group>
        <Col>
          <Row className="form-bottom-button">
            <Button type="submit">Save</Button>
            <Button
              className="cancel-btn"
              onClick={() => {
                this.changeSection();
              }}
            >
              Cancel
            </Button>
          </Row>
        </Col>
      </Form>
    );

    return (
      <Col className="details-main mt-4">
        <Row className="details-head">
          <Col
            lg={10}
            md={8}
            sm={6}
            xs={6}
            align="left"
            className="details-header"
          >
            <FontAwesomeIcon icon={faUserTie} className="details-icon" />
            <Col className="detail-title">Horoscope Box</Col>
          </Col>
          <Col
            lg={2}
            md={4}
            sm={6}
            xs={6}
            align="right"
            className="details-edit-button"
          >
            <a href="./horocer">
              <Button>Edit</Button>
            </a>
          </Col>
        </Row>

        {this.state.showForm ? AboutForm : AbouSection}
      </Col>
    );
  }
}
HoroBox.contextType = UserContext;
export default HoroBox;
