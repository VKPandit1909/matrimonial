import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../logo.png.png";
import { Nav, Navbar, Container, Col, Row } from "react-bootstrap";
import { Menu, Dropdown } from "antd";
import { NavLink } from "react-router-dom";
import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserContext from "../Context/UserContext";
import { faBars } from "@fortawesome/free-solid-svg-icons";

// Localization
import i18n from "i18next";
import { withTranslation } from "react-i18next";

class LoginInsideHeader extends Component {
  constructor(props) {
    super(props);
    global.userData = undefined;
    this.state = {
      dname: "",
      dphoto: "",
    };
  }

  componentDidMount() {
    const { details } = this.context;
    console.log(details.type, "type");
    window.localStorage.setItem("UserType", details.type);

    if (details == "" || details == null || details == undefined) {
    } else {
      this.setState({
        dname: details.name == undefined ? null : details.name,
        dphoto: details.photo == undefined ? null : details.photo,
      });
    }

    // Google Translate
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
    window.googleTranslateElementInit = this.googleTranslateElementInit;
  }

  googleTranslateElementInit() {
    /* eslint-disable no-new */
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        layout: window.google.translate.TranslateElement.FloatPosition.TOP_LEFT,
      },
      "google_translate_element"
    );
    var flags = document.getElementsByClassName("flag_link");

    Array.prototype.forEach.call(flags, function (e) {
      e.addEventListener("click", function () {
        var lang = e.getAttribute("data-lang");
        var languageSelect = document.querySelector("select.goog-te-combo");
        languageSelect.value = lang;
        languageSelect.dispatchEvent(new Event("change"));
        window.localStorage.setItem("localLang",lang);
      });
    });
  }

  signOut = () => {
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("token");
    window.location.href = "/";
  };
  render() {
    const { SubMenu } = Menu;
    const { t } = this.props;
    const languages = [
      {
        code: "en",
        name: "English",
        country_code: "UK",
      },
      {
        code: "ta",
        name: "Tamil",
        country_code: "India",
      },
    ];
    const menu = (
      <Menu selectedKeys={[window.localStorage.getItem("localLang")]}>
        <Menu.Item>
          <a href="./otp-verify" className="navLink">
            Security
          </a>
        </Menu.Item>
        <SubMenu title="Language Setting" popupClassName="langmenu">
          {languages.map(({ code, name, country_code }) => {
            return (
              <Menu.Item
                key={code}
                onClick={() => {
                  document.getElementById(code).click();
                }}
              >
                {name}
              </Menu.Item>
            );
          })}
        </SubMenu>
        <Menu.Item
          onClick={() => {
            this.signOut();
          }}
        >
          Log Out
        </Menu.Item>
      </Menu>
    );

    return (
      <Navbar bg="#3CB371" style={{ backgroundColor: "#3cB371" }} expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <Col className="logo">
              <img src={logo} height="40" width="65" />
            </Col>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav login-header">
            <Nav className="me-auto">
              {/* <Nav.Link href="#link " className="search-nav">
                <Col className="search-nav">
                  <input placeholder="Search" className="nav-input" />
                </Col>
              </Nav.Link> */}
              <Col className="nav-items">
                <a href="/user-interests" className="navLink">
                  Matches
                </a>
                <a href="/content" className="navLink">
                  Home
                </a>
                <a href="/userprofile" className="navLink">
                  {/* <Row> */}
                    {/* <Col style={{ margin: 0, paddingRight: 4, paddingLeft: 7 }}> */}
                      <img
                        src={
                          this.state.dphoto == undefined ||
                          this.state.dphoto == "" ||
                          this.state.dphoto == null
                            ? "https://reputationtoday.in/wp-content/uploads/2019/11/110-1102775_download-empty-profile-hd-png-download.jpg"
                            : this.state.dphoto
                        }
                        height="25"
                        width="25"
                        className="nav-item-image"
                      />
                    {/* </Col> */}
                    {this.state.dname}
                  {/* </Row> */}
                </a>
              </Col>

              <Dropdown
                overlay={menu}
                placement="bottomLeft"
                arrow
                trigger={["click"]}
              >
                {window.innerWidth > 600 ? (
                  <FontAwesomeIcon className="bar-icon" icon={faBars} />
                ) : (
                  <span className="bar-icon">Action</span>
                )}
              </Dropdown>
              <div id="google_translate_element"></div>
              <div
                className="flag"
                // style={{ display: "inline-block", marginTop: 9 }}
                style={{ display: "none" }}
              >
                <a href="#" className="flag_link en navLink" data-lang="en" id="en">
                  <span className="lang_text lang-text"> English</span>
                </a>

                <a
                  href="#"
                  className="flag_link ta navLink"
                  data-lang="ta"
                  id="ta"
                >
                  <span className="lang_text  lang-text"> Tamil</span>
                </a>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
LoginInsideHeader.contextType = UserContext;
export default withTranslation()(LoginInsideHeader);
