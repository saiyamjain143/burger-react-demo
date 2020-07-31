import * as actions from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredients = (ingName) => {
  return {
    type: actions.ADD_INGREDIENTS,
    ingredientName: ingName,
  };
};

export const removeIngredients = (ingName) => {
  return {
    type: actions.REMOVE_INGREDIENTS,
    ingredientName: ingName,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actions.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const setIngredientsError = (ingredients) => {
  return {
    type: actions.SET_INGREDIENTS_ERROR,
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("/ingredients.json")
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        dispatch(setIngredientsError());
      });
  };
};
