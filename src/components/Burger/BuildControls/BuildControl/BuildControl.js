import React from "react";
import "./BuildControl.css";
const buildControl = (props) => (
  <div className="BuildControl">
    <div className="Label">{props.label}</div>
    <button
      className="Less"
      onClick={props.removeIngredient}
      disabled={props.disabled}
    >
      Less
    </button>
    <p>
      <strong>{props.count}</strong>
    </p>
    <button className="More" onClick={props.addIngredient}>
      More
    </button>
  </div>
);

export default buildControl;
