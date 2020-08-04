import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import axios from "../../../axios-orders";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as orderActions from "../../../store/actions/index";
import { checkValidity } from "../../../shared/Utility";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        isValid: false,
        touched: false,
      },
      address1: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Address Line 1",
        },
        value: "",
        validation: {
          required: true,
        },
        isValid: false,
        touched: false,
      },
      address2: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Address Line 2",
        },
        value: "",
        validation: {
          required: true,
        },
        isValid: false,
        touched: false,
      },
      pincode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Pin code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
          maxLength: 6,
        },
        isValid: false,
        touched: false,
      },
      city: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your City",
        },
        value: "",
        validation: {
          required: true,
        },
        isValid: false,
        touched: false,
      },
      state: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your State",
        },
        value: "",
        validation: {
          required: true,
        },
        isValid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country",
        },
        value: "",
        validation: {
          required: true,
        },
        isValid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        value: "",
        validation: {
          required: true,
        },
        isValid: false,
        touched: false,
      },
      phoneNo: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Number",
        },
        value: "",
        validation: {
          required: true,
        },
        isValid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "slowest", displayValue: "Slowest" },
          ],
        },
        value: "fastest",
        isValid: true,
      },
    },
    formIsValid: false,
  };

  orderhandler = (event) => {
    event.preventDefault();

    const orderData = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: this.state.orderForm.name.value,
        address: {
          address1: this.state.orderForm.address1.value,
          address2: this.state.orderForm.address2.value,
          pincode: this.state.orderForm.pincode.value,
          city: this.state.orderForm.city.value,
          state: this.state.orderForm.state.value,
          country: this.state.orderForm.country.value,
        },
        email: this.state.orderForm.email.value,
        phoneNo: this.state.orderForm.phoneNo.value,
      },
      userId: this.props.userId,
      deliveryMethod: this.state.orderForm.deliveryMethod.value,
    };
    this.props.onOrderBurger(orderData, this.props.token);
  };

  changedHandler = (event, inputId) => {
    const formData = { ...this.state.orderForm };
    const formElement = { ...formData[inputId] };
    formElement.value = event.target.value;
    if (formElement.validation) {
      formElement.isValid = checkValidity(
        formElement.value,
        formElement.validation
      );
    }
    formElement.touched = true;
    formData[inputId] = formElement;
    let formIsValid = true;
    for (let key in formData) {
      formIsValid = formData[key].isValid && formIsValid;
    }
    this.setState({ orderForm: formData, formIsValid: formIsValid });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderhandler}>
        {formElementArray.map((form) => (
          <Input
            key={form.id}
            invalid={!form.config.isValid}
            changed={(event) => this.changedHandler(event, form.id)}
            elementType={form.config.elementType}
            elementConfig={form.config.elementConfig}
            value={form.config.value}
            shouldValidate={form.config.validation}
            touched={form.config.touched}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) form = <Spinner />;

    return (
      <div className="ContactData">
        <h4>Enter your contact data: </h4>
        {form}
      </div>
    );
  }
}
const matchStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(orderActions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  matchStateToProps,
  matchDispatchToProps
)(withErrorHandler(ContactData, axios));
