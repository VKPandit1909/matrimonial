import "../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Accordion, Form } from "react-bootstrap";
import ContextAwareToggle from "../Components/CustomToggleHeader";

const Horoscopic = () => {
  return (
    <Col>
      <Accordion defaultActiveKey="1">
        <ContextAwareToggle eventKey="0">Horoscopic</ContextAwareToggle>

        <Accordion.Collapse eventKey="0">
          <Form id="Horoscopic-check">
            <Form.Check
              type="checkbox"
              label="Rajju"
              name="dos"
              id="dosham1"
              className="horo-div"
            />
            <Form.Check
              type="checkbox"
              label="No"
              name="dosham2"
              id="dosham2"
              className="horo-div"
            />
            <Form.Check
              type="checkbox"
              label="Chevvai"
              name="dosham3"
              id="dosham3"
              className="horo-div"
            />
            <Form.Check
              type="checkbox"
              label="Rahu & Kethu"
              name="dosham4"
              id="dosham4"
              className="horo-div"
            />
            <Form.Check
              type="checkbox"
              label="Parikara Chevvai"
              name="dosham5"
              id="dosham5"
              className="horo-div"
            />
            <Form.Check
              type="checkbox"
              label="Don't Know"
              name="dosham1"
              id="dosham1"
              className="horo-div"
            />
            <Form.Check
              type="checkbox"
              label="No"
              name="dosham2"
              id="dosham2"
              className="horo-div"
            />
            <Form.Check
              type="checkbox"
              label="Chevvai"
              name="dosham3"
              id="dosham3"
              className="horo-div"
            />
            <Form.Check
              type="checkbox"
              label="Rahu & Kethu"
              name="dosham4"
              id="dosham4"
              className="horo-div"
            />
            <Form.Check
              type="checkbox"
              label="Parikara Chevvai"
              name="dosham5"
              id="dosham5"
              className="horo-div"
            />
            <Form.Check
              type="checkbox"
              label="Rahu & Kethu"
              name="dosham4"
              id="dosham4"
              className="horo-div"
            />
            <Form.Check
              type="checkbox"
              label="Parikara Chevvai"
              name="dosham5"
              id="dosham5"
              className="horo-div"
            />
          </Form>
        </Accordion.Collapse>
      </Accordion>
    </Col>
  );
};
export default Horoscopic;
