import { APPROVAL_LIST, REJECT_REQUEST, APPROVE_REQUEST } from "./types";

import axios from "axios";

export const approvalList = userData => dispatch => {
  axios
    .get(`http://localhost:8080/requests/list-review/${userData}`)
    .then(requests =>
      dispatch({ type: APPROVAL_LIST, payload: requests.data.data })
    );
};

export const rejectRequest = requestData => dispatch => {
  axios
    .put("http://localhost:8080/requests/", { ...requestData })
    .then(request =>
      axios
        .put("http://localhost:8080/requests/reject", {
          ...request.data.data
        })
        .then(request =>
          dispatch({ type: REJECT_REQUEST, payload: request.data.data })
        )
    );
};

export const approveRequest = requestData => dispatch => {
  axios.get(`http://localhost:8080/requests/${requestData}`).then(request =>
    axios
      .put("http://localhost:8080/requests/approve", {
        ...request.data.data
      })
      .then(request =>
        dispatch({ type: APPROVE_REQUEST, payload: request.data.data })
      )
  );
};
