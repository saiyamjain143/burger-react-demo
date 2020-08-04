import React, { Component } from "react";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

// const matchStateToProps = (state) => {
//   return {
//     ingredients: state.burgerBuilder.ingredients,
//     totalPrice: state.burgerBuilder.totalPrice,
//     loading: state.order.loading,
//     token: state.auth.token,
//   };
// };

const matchDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logOut()),
  };
};

export default connect(null, matchDispatchToProps)(Logout);
