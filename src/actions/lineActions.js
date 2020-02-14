import { FETCH_LINES, NEW_LINE, UPDATE_LINE, DELETE_LINE } from "./types";

import axios from "axios";

export const fetchLines = requestData => dispatch => {
  axios
    .get(`http://localhost:8080/line-items/lines-for-pr/${requestData}`)
    .then(lines => dispatch({ type: FETCH_LINES, payload: lines.data.data }));
};

export const createLine = lineData => dispatch => {
  axios.post("http://localhost:8080/line-items/", { ...lineData }).then(line =>
    dispatch({
      type: NEW_LINE,
      payload: line.data.data
    })
  );
};

export const updateLine = lineData => dispatch => {
  axios
    .put("http://localhost:8080/line-items/", { ...lineData })
    .then(line => dispatch({ type: UPDATE_LINE, payload: line.data.data }));
};

export const deleteLine = lineData => dispatch => {
  axios
    .delete(`http://localhost:8080/line-items/${lineData}`)
    .then(line => dispatch({ type: DELETE_LINE, payload: lineData }));
};
