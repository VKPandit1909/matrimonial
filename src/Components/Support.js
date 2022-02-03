import "../App.css";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobile, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import { withTranslation } from "react-i18next";

const Support = ({ t }) => {
  useEffect(() => {
    document.title = t("app_title");
  }, [t]);
  return (
    <Col>
      <div className="right-main">
        <div className="search-right">
          <div className="search0">{t("search")}</div>
          <div className="search1">{t("dosham_match")}</div>
          <div className="search1">{t("best_match")}</div>
          <div className="search1">{t("all_match")}</div>
        </div>
        <div style={{ width: "100%" }}>
          <div className="search-right-bottom">
            <div className="support1">{t("search")}</div>
            <div className="support-div">
              <div className="icon-div1">
                <FontAwesomeIcon className="mobile-icon" icon={faMobile} />
              </div>
              Contact Us
            </div>
            <div className="support-div">
              <div className="icon-div1">
                <FontAwesomeIcon icon={faEnvelope} className="mobile-icon" />
              </div>
              Email Us
            </div>
            <div className="support-divv">{t("req_callback")}</div>
            <div className="support-but">
              <button className="sup-but">{t("call_back")}</button>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};
export default withTranslation()(Support);
