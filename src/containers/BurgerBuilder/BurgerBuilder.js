import React, { Component } from "react";
import Aux from "../../hoc/Auxillary/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components//UI/Spinner/Spinner";
import withErrorHandler from "../../hoc//withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 5,
  meat: 10,
  cheese: 20,
  bacon: 15,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 10,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    this.setState({
      totalPrice: INGREDIENT_PRICES[type] + this.state.totalPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount > 0) {
      const updatedCount = oldCount - 1;
      const updatedIngredients = { ...this.state.ingredients };
      updatedIngredients[type] = updatedCount;
      this.setState({
        totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type],
        ingredients: updatedIngredients,
      });
      this.updatePurchaseState(updatedIngredients);
    }
  };

  updatePurchaseState(updatedIngredients) {
    const sum = Object.keys(updatedIngredients)
      .map((igKey) => {
        return updatedIngredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({
      purchaseable: sum > 0,
    });
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true,
    });
  };

  closeBackdropHandler = () => {
    this.setState({
      purchasing: false,
    });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });

    axios
      .post("/orders.json", {
        ingredients: this.state.ingredients,
        price: this.state.totalPrice,
        customer: {
          name: "Saiyam",
          address: {
            address1: "Near the Jain temple",
            address2: "At and Post Gholvad",
            pincode: 401702,
            city: "Gholvad",
            state: "Maharashtra",
            country: "India",
          },
          email: " saiyamjain143@gmail.com",
          phoneNo: "+917276891706",
        },
        deliveryMethod: "faster",
      })
      .then((response) => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch((error) => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    let orderSummary = null;

    let burger = this.state.error ? (
      <p style={{ textAlign: "center" }}>Ingredients cannot be loaded..</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            ingredients={this.state.ingredients}
            orderNow={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelled={this.closeBackdropHandler}
          purchaseContinue={this.purchaseContinueHandler}
          totalPrice={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
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

export default withErrorHandler(BurgerBuilder, axios);
