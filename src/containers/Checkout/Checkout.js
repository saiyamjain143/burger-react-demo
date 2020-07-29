import React, { Component } from "react";
import CheckoutSummary from "../../components/Checkout/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let totalPrice = null;
    query.forEach((value, key) => {
      if (key !== "price") {
        ingredients[key] = Number(value);
      } else {
        totalPrice = Number(value);
      }
    });
    this.setState({ ingredients: ingredients, totalPrice: totalPrice });
  }

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
          ingredients={this.state.ingredients}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={(props) => (
            <ContactData
              price={this.state.totalPrice}
              ingredients={this.state.ingredients}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
