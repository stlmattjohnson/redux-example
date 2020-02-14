import {
  FETCH_REQUESTS,
  NEW_REQUEST,
  UPDATE_REQUEST,
  DELETE_REQUEST,
  SUBMIT_REQUEST,
  GET_REQUEST
} from "../actions/types";

const initialState = {
  requests: [],
  request: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_REQUESTS:
      return {
        ...state.requests,
        requests: action.payload
      };

    case NEW_REQUEST:
      return {
        ...state.requests,
        requests: [...state.requests, action.payload]
      };

    case GET_REQUEST:
      return {
        ...state.requests,
        requests: [...state.requests],
        request: action.payload
      };

    case UPDATE_REQUEST:
      const updatedRequests = state.requests.map(request => {
        if (request.id === action.payload.id) {
          return { ...request, ...action.payload };
        }
        return request;
      });
      return {
        ...state.requests,
        requests: updatedRequests
      };

    case SUBMIT_REQUEST:
      const submitRequests = state.requests.map(request => {
        if (request.id === action.payload.id) {
          return { ...request, ...action.payload };
        }
        return request;
      });
      return {
        ...state.requests,
        requests: submitRequests
      };

    case DELETE_REQUEST:
      const index = state.requests
        .map(function(request) {
          return request.id;
        })
        .indexOf(action.payload);
      return {
        requests: [
          ...state.requests.slice(0, index),
          ...state.requests.slice(index + 1)
        ]
      };

    default:
      return state;
  }
}
