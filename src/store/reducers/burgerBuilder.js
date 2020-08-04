import * as actions from "../actions/actionTypes";
import { updateObject } from "./../../shared/Utility";
const INGREDIENT_PRICES = {
  salad: 5,
  meat: 10,
  cheese: 20,
  bacon: 15,
};

const initialState = {
  ingredients: null,
  totalPrice: 10,
  error: false,
  building: false,
};

const addIngredient = (state, action) => {
  let updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  let updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  let updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true,
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  let updatedIngs = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  let updatedIngreds = updateObject(state.ingredients, updatedIngs);
  let updateState = {
    ingredients: updatedIngreds,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true,
  };
  return updateObject(state, updateState);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_INGREDIENTS:
      return addIngredient(state, action);

    case actions.REMOVE_INGREDIENTS:
      return removeIngredient(state, action);

    case actions.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 10,
        error: false,
        building: false,
      });

    case actions.SET_INGREDIENTS_ERROR:
      return updateObject(state, { error: true });

    default:
      return state;
  }
};

export default reducer;
