import {
  APPROVAL_LIST,
  REJECT_REQUEST,
  APPROVE_REQUEST
} from "../actions/types";

const initialState = {
  approvals: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case APPROVAL_LIST:
      return {
        ...state.approvals,
        approvals: action.payload
      };

    case APPROVE_REQUEST:
    case REJECT_REQUEST:
      let index = state.approvals
        .map(function(request) {
          return request.id;
        })
        .indexOf(action.payload);
      if (index < 0) {
        index = 0;
      }
      return {
        approvals: [
          ...state.approvals.slice(0, index),
          ...state.approvals.slice(index + 1)
        ]
      };

    default:
      return state;
  }
}
