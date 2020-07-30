import React, { Component } from "react";
import CheckoutSummary from "../../components/Checkout/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  orderCancelledHandler = () => {
    this.props.history.goBack();
  };

  confirmOrderHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          orderCancelled={this.orderCancelledHandler}
          confirmOrder={this.confirmOrderHandler}
          ingredients={this.props.ingredients}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

const matchStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
  };
};

export default connect(matchStateToProps)(Checkout);
