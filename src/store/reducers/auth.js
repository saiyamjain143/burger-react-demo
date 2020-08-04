import * as actions from "../actions/actionTypes";
import { updateObject } from "../../shared/Utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirect: "/",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_START:
      return updateObject(state, { error: null, loading: true });

    case actions.AUTH_SUCCESS:
      return updateObject(state, {
        token: action.authData.tokenId,
        userId: action.authData.userId,
        error: null,
        loading: false,
      });

    case actions.AUTH_FAILED:
      return updateObject(state, {
        error: action.error,
        loading: false,
      });

    case actions.AUTH_LOGOUT:
      return updateObject(state, {
        token: null,
        userId: null,
      });

    case actions.AUTH_REDIRECT_PATH:
      return updateObject(state, { authRedirect: action.path });

    default:
      return state;
  }
};

export default reducer;
