import { FETCH_USERS, NEW_USER, UPDATE_USER, DELETE_USER } from "./types";

import axios from "axios";

export const fetchUsers = () => dispatch => {
  axios
    .get("http://localhost:8080/users/")
    .then(users => dispatch({ type: FETCH_USERS, payload: users.data.data }));
};

export const createUser = userData => dispatch => {
  axios.post("http://localhost:8080/users/", { ...userData }).then(user =>
    dispatch({
      type: NEW_USER,
      payload: user.data.data
    })
  );
};

export const updateUser = userData => dispatch => {
  axios
    .put("http://localhost:8080/users/", { ...userData })
    .then(user => dispatch({ type: UPDATE_USER, payload: user.data.data }));
};

export const deleteUser = userData => dispatch => {
  axios
    .delete(`http://localhost:8080/users/${userData}`)
    .then(user => dispatch({ type: DELETE_USER, payload: userData }));
};

// fetch api commands

// export const fetchUsers = () => dispatch => {
//   fetch("http://localhost:8080/users/")
//     .then(res => res.json())
//     .then(users =>
//       dispatch({
//         type: FETCH_USERS,
//         payload: users.data
//       })
//     );
// };

// export const createUser = userData => dispatch => {
//   fetch("http://localhost:8080/users/", {
//     method: "POST",
//     headers: {
//       "content-type": "application/json"
//     },
//     body: JSON.stringify(userData)
//   })
//     .then(res => res.json())
//     .then(user =>
//       dispatch({
//         type: NEW_USER,
//         payload: user.data
//       })
//     );
// };

// export const updateUser = userData => dispatch => {
//   fetch("http://localhost:8080/users/", {
//     method: "PUT",
//     headers: {
//       "content-type": "application/json"
//     },
//     body: JSON.stringify(userData)
//   })
//     .then(res => res.json())
//     .then(user =>
//       dispatch({
//         type: UPDATE_USER,
//         payload: user.data
//       })
//     );
// };

// export const deleteUser = userData => dispatch => {
//   fetch("http://localhost:8080/users/" + userData.id, {
//     method: "DELETE"
//   }).then(res => res.json());
// };
