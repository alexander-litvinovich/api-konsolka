import React, { useState } from "react";
import ReactDOM from "react-dom";
import { usePopper } from "react-popper";
import classNames from "classnames";

import "./popover.css";

const onClick = (opened, setOpened) => () => setOpened(!opened);

const Popover = ({ target, children, placement, ...restProps }) => {
  const [opened, setOpened] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  // const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: placement || 'bottom-start',
    // modifiers: [{ name: "arrow", options: { element: arrowElement } }],
  });
  return (
    <>
      {renderTarget({
        target,
        opened,
        onClick: onClick(opened, setOpened),
        setReferenceElement,
      })}

      {/* TODO: Do closing behaviour more native */}
      {ReactDOM.createPortal(
        <>
          <div
            className={classNames("Popover", { "isOpened": opened })}
            onClick={() => setOpened(false)}
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            {...restProps}
          >
            {children}
          </div>
          <div
            className={classNames("Popover-overlay", { "isOpened": opened })}
            onClick={() => setOpened(false)}
          />
        </>,
        document.querySelector("#dest")
      )}
    </>
  );
};

const renderTarget = (params) => {
  const { target, opened, onClick, setReferenceElement } = params;
  
  return React.cloneElement(target, {
    ref: setReferenceElement,
    onClick,
    popoverOpened: opened,
  });
};

export default Popover;

// onDocumentClick = (event) => {
//   const { closeOnTargetClick, closeOnPopperClick } = this.props;
//   const isTargetEvent = this.isTargetEvent(event);
//   const isPopperEvent = this.isPopperEvent(event);
//   const isParentEvent = this.isParentEvent(event);

//   const isNeedToClose = (!isTargetEvent && !isPopperEvent && !isParentEvent) ||
//                         (closeOnTargetClick && isTargetEvent) ||
//                         (closeOnPopperClick && isPopperEvent);

//   if (isNeedToClose) {
//     this.toggle(false);
//   }
// };
