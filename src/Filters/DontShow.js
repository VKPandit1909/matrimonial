import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Accordion, Form } from "react-bootstrap";
import ContextAwareToggle from "../Components/CustomToggleHeader";

const DontShow = () => {
  return (
    <Col>
      <Accordion defaultActiveKey="1">
        <ContextAwareToggle eventKey="0">Don't Show</ContextAwareToggle>

        <Accordion.Collapse eventKey="0">
          <Form id="dosham-check">
            <Form.Check
              type="checkbox"
              label="Contacted"
              name="Contacted"
              id="dontshow1"
            />
            <Form.Check
              type="checkbox"
              label="Interested"
              name="Interested"
              id="dontshow2"
            />
            <Form.Check
              type="checkbox"
              label="Short Listed"
              name="Short Listed"
              id="dontshow3"
            />
            <Form.Check
              type="checkbox"
              label="Viewed"
              name="Viewed"
              id="dontshow4"
            />
          </Form>
        </Accordion.Collapse>
      </Accordion>
    </Col>
  );
};
export default DontShow;
