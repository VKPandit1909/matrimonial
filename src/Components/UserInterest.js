import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container } from "react-bootstrap";

import LoginInsideHeader from "./LoginInsideHeader";
import { Tabs } from "antd";
import Support from "./Support";
import InterestTab from "./InterestTab";
import ShortListTab from "./ShortListTab";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const UserInterest = () => {
  return (
    <>
      <LoginInsideHeader />
      <Container>
        <Row>
          <Col className="tab-col mt-3" lg={12} md={12} sm={12} xs={12}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Short List" key="1">
                <ShortListTab />
              </TabPane>
              <TabPane tab="Interest" key="2">
                <InterestTab />
              </TabPane>
              {/* <TabPane tab="Contact" key="3">
                Content of Tab Pane 3
              </TabPane> */}
            </Tabs>
          </Col>
          {/* <Col lg={3} md={3} sm={12} xs={12} className="mt-3">
            <Support />
          </Col> */}
        </Row>
      </Container>
    </>
  );
};

export default UserInterest;
