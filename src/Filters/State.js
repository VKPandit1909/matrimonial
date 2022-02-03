
import Select from "react-select";
import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Accordion, Form, Row } from "react-bootstrap";
import ContextAwareToggle from "../Components/CustomToggleHeader";

const State = () => {
  const actions = [
    { label: "India", value: 1 },
    { label: "Pakistan", value: 2 },
    { label: "China", value: 3 },
  ];
  return (
    <Col>
      <Accordion defaultActiveKey="1">
        <ContextAwareToggle eventKey="0">State</ContextAwareToggle>

        <Accordion.Collapse eventKey="0">
          <Col id="dosham-check">
            <Select options={actions} isSearchable={true} />
          </Col>
        </Accordion.Collapse>
      </Accordion>
    </Col>
  );
};
export default State;