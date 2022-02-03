import React, { useContext } from "react";
import { useAccordionButton, AccordionContext } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";

function ContextAwareToggle({ children, eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <div
      className="filter-name"
      onClick={() => {
        decoratedOnClick();
      }}
    >
      <div className="icon-div">
        {isCurrentEventKey ? (
          <FontAwesomeIcon icon={faCaretDown} className="icon-down" />
        ) : (
          <FontAwesomeIcon icon={faCaretRight} className="icon-down" />
        )}
      </div>
      {children}
    </div>
  );
}

export default ContextAwareToggle;
