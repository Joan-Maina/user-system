import axios from "axios";
import { GET_USER, GET_USER_SUCCESS, GET_USER_FAIL } from "../types";

export const getUser = () => {
  return {
    type: GET_USER,
  };
};

export const getUserSuccess = (user) => {
  console.log(user);
  return {
    type: GET_USER_SUCCESS,
    payload: user,
  };
};

export const getUserFail = (error) => {
  return {
    type: GET_USER_FAIL,
    payload: error,
  };
};

// export const getUserRequest = (data) => (dispatch) => {
//   dispatch(getUser());
//   axios
//     .post("http://localhost:9000/api/login", { data })
//     .then(({ data }) => dispatch(getUserSuccess(data)))
//     .catch(({ message }) => dispatch(getUserFail(message)));
// };
