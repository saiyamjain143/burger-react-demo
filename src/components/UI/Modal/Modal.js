import React from "react";
import "./Modal.css";
import Aux from "../../../hoc/Auxillary/Auxillary";
import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => {
  return (
    <Aux>
      <Backdrop show={props.show} closeBackdrop={props.closeBackdrop} />
      <div
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh",
          opacity: props.show ? "1" : "0",
        }}
        className="Modal"
      >
        {props.children}
      </div>
    </Aux>
  );
};

export default React.memo(
  modal,
  (prevProps, nextProps) =>
    prevProps.show === nextProps.show &&
    prevProps.children === nextProps.children
);
