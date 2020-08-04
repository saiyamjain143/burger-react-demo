import * as actions from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actions.AUTH_START,
  };
};

export const authSuccess = (data) => {
  return {
    type: actions.AUTH_SUCCESS,
    authData: {
      tokenId: data.idToken,
      userId: data.localId,
    },
  };
};

export const authFailed = (error) => {
  return {
    type: actions.AUTH_FAILED,
    error: error,
  };
};

export const initAuth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCvAH7HykmFv-8qL8Vf9SKyqc6r3nMx-7k";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCvAH7HykmFv-8qL8Vf9SKyqc6r3nMx-7k";
    }
    axios
      .post(url, authData)
      .then((response) => {
        localStorage.setItem("token", response.data.idToken);
        const expDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("expDate", expDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((error) => {
        dispatch(authFailed(error.response.data.error));
      });
  };
};

export const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expDate");
  localStorage.removeItem("userId");
  return {
    type: actions.AUTH_LOGOUT,
  };
};

const checkAuthTimeout = (expTime) => {
  return (dispatch) => {
    setTimeout(() => dispatch(logOut()), +expTime * 1000);
  };
};

export const setRedirectPath = (path) => {
  return {
    type: actions.AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logOut());
    } else {
      const expDate = new Date(localStorage.getItem("expDate"));
      if (expDate < new Date()) {
        dispatch(logOut());
      } else {
        dispatch(
          authSuccess({
            idToken: token,
            localId: localStorage.getItem("userId"),
          })
        );
        dispatch(
          checkAuthTimeout((expDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
};
