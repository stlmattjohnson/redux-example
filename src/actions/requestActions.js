import {
  FETCH_REQUESTS,
  NEW_REQUEST,
  UPDATE_REQUEST,
  DELETE_REQUEST,
  SUBMIT_REQUEST,
  GET_REQUEST
} from "./types";

import axios from "axios";

export const fetchRequests = () => dispatch => {
  axios
    .get("http://localhost:8080/requests/")
    .then(requests =>
      dispatch({ type: FETCH_REQUESTS, payload: requests.data.data })
    );
};

export const getRequest = requestData => dispatch => {
  axios
    .get(`http://localhost:8080/requests/${requestData}`)
    .then(request =>
      dispatch({ type: GET_REQUEST, payload: request.data.data })
    );
};

export const createRequest = requestData => dispatch => {
  axios
    .post("http://localhost:8080/requests/", { ...requestData })
    .then(request =>
      dispatch({
        type: NEW_REQUEST,
        payload: request.data.data
      })
    );
};

export const updateRequest = requestData => dispatch => {
  axios
    .put("http://localhost:8080/requests/", { ...requestData })
    .then(request =>
      dispatch({ type: UPDATE_REQUEST, payload: request.data.data })
    );
};

export const submitRequest = requestData => dispatch => {
  axios.get(`http://localhost:8080/requests/${requestData}`).then(request =>
    axios
      .put("http://localhost:8080/requests/submit-review", {
        ...request.data.data,
        reasonForRejection: "",
        status: "New"
      })
      .then(request =>
        dispatch({ type: SUBMIT_REQUEST, payload: request.data.data })
      )
  );
};

export const deleteRequest = requestData => dispatch => {
  axios
    .delete(`http://localhost:8080/requests/${requestData}`)
    .then(request => dispatch({ type: DELETE_REQUEST, payload: requestData }));
};
