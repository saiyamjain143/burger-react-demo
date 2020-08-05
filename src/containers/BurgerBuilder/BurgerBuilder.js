import React, { Component } from "react";
import Aux from "../../hoc/Auxillary/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components//UI/Spinner/Spinner";
import withErrorHandler from "../../hoc//withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as burgerBuilderActions from "../../store/actions/index";
import axios from "../../axios-orders";

export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onIngredientInit();
  }

  updatePurchaseState(updatedIngredients) {
    const sum = Object.keys(updatedIngredients)
      .map((igKey) => {
        return updatedIngredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({
        purchasing: true,
      });
    } else {
      this.props.onSetRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  closeBackdropHandler = () => {
    this.setState({
      purchasing: false,
    });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    let orderSummary = null;

    let burger = this.props.error ? (
      <p style={{ textAlign: "center" }}>Ingredients cannot be loaded..</p>
    ) : (
      <Spinner />
    );
    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            isAuthenticated={this.props.isAuthenticated}
            addIngredient={this.props.onIngredientAdded}
            removeIngredient={this.props.onIngredientRemoved}
            price={this.props.totalPrice}
            purchaseable={this.updatePurchaseState(this.props.ingredients)}
            ingredients={this.props.ingredients}
            orderNow={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          purchaseCancelled={this.closeBackdropHandler}
          purchaseContinue={this.purchaseContinueHandler}
          totalPrice={this.props.totalPrice}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          closeBackdrop={this.closeBackdropHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const matchStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch(burgerBuilderActions.addIngredients(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(burgerBuilderActions.removeIngredients(ingName)),
    onIngredientInit: () => dispatch(burgerBuilderActions.initIngredients()),
    onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
    onSetRedirectPath: (path) =>
      dispatch(burgerBuilderActions.setRedirectPath(path)),
  };
};

export default connect(
  matchStateToProps,
  matchDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
