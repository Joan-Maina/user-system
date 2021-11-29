import { GET_USER, GET_USER_SUCCESS, GET_USER_FAIL } from "../types";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  //   console.log(action);
  switch (action.type) {
    case GET_USER:
      return {
        loading: true,
      };

    case GET_USER_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case GET_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
