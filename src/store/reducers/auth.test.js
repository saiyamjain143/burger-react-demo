import reducer from "./auth";
import * as actions from "../actions/actionTypes";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirect: "/",
    });
  });

  it("should store token upon login", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirect: "/",
        },
        {
          type: actions.AUTH_SUCCESS,
          authData: {
            tokenId: "some-token",
            userId: "some-userId",
          },
        }
      )
    ).toEqual({
      token: "some-token",
      userId: "some-userId",
      error: null,
      loading: false,
      authRedirect: "/",
    });
  });
});
