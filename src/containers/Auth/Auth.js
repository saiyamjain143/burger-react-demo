import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import "./Auth.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        isValid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        isValid: false,
        touched: false,
      },
    },
    formIsValid: false,
    isSignUp: false,
  };

  changedHandler = (event, inputId) => {
    const formData = { ...this.state.controls };
    const formElement = { ...formData[inputId] };
    formElement.value = event.target.value;
    if (formElement.validation) {
      formElement.isValid = this.checkValidity(
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
    this.setState({ controls: formData, formIsValid: formIsValid });
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onInitAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  changeSignHandler = () => {
    this.setState((prevState) => {
      return {
        isSignUp: !prevState.isSignUp,
      };
    });
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirect !== "/") {
      this.props.onSetRedirectPath();
    }
  }

  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = formElementArray.map((form) => (
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
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirect} />;
    }

    return (
      <div className="Auth">
        {authRedirect}
        {this.state.isSignUp ? <h2>SIGN UP</h2> : <h2>SIGN IN</h2>}
        <form onSubmit={this.submitHandler}>
          {form}
          {this.props.error ? (
            <p style={{ color: "red" }}>
              <strong>{this.props.error.message}</strong>
            </p>
          ) : null}
          <Button disabled={!this.state.formIsValid} btnType="Success">
            {this.state.isSignUp ? "SIGN UP" : "SIGN IN"}
          </Button>
          <Button btnType="Danger" clicked={this.changeSignHandler}>
            Switch to {this.state.isSignUp ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirect: state.auth.authRedirect,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    onInitAuth: (email, password, isSignUp) =>
      dispatch(actions.initAuth(email, password, isSignUp)),
    onSetRedirectPath: () => dispatch(actions.setRedirectPath("/")),
  };
};

export default connect(mapStateToProps, matchDispatchToProps)(Auth);
