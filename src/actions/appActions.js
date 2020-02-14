import { LOGIN_ATTEMPT, LOGOUT } from "./types";
import axios from "axios";

export const loginAttempt = userData => dispatch => {
  axios
    .post("http://localhost:8080/users/login/", { ...userData })
    .then(user => dispatch({ type: LOGIN_ATTEMPT, payload: user.data.data }));
};

export const logoff = () => dispatch => {
  dispatch({ type: LOGOUT, payload: undefined });
};
