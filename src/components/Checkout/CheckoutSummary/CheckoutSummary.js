import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import "./CheckoutSummary.css";

const checkoutSummary = (props) => (
  <div className="CheckoutSummary">
    <h1>Hope it tastes well..</h1>
    <div style={{ width: "100%", margin: "auto" }}>
      <Burger ingredients={props.ingredients} />
      <Button clicked={props.orderCancelled} btnType="Danger">
        CANCEL
      </Button>
      <Button clicked={props.confirmOrder} btnType="Success">
        CONTINUE
      </Button>
    </div>
  </div>
);

export default checkoutSummary;
