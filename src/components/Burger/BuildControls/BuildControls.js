import React from "react";
import "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => (
  <div className="BuildControls">
    <p>
      Total Price: <strong>{props.price}</strong>
    </p>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        addIngredient={() => props.addIngredient(ctrl.type)}
        removeIngredient={() => props.removeIngredient(ctrl.type)}
        disabled={props.ingredients[ctrl.type] <= 0}
        count={props.ingredients[ctrl.type]}
      />
    ))}
    <button
      onClick={props.orderNow}
      disabled={!props.purchaseable}
      className="OrderButton"
    >
      ORDER NOW
    </button>
  </div>
);

export default buildControls;
