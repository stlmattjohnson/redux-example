import { LOGIN_ATTEMPT, LOGOUT } from "../actions/types";

const initialState = {
  loggedInUser: undefined
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_ATTEMPT:
      return {
        ...state.loggedInUser,
        loggedInUser: action.payload
      };

    case LOGOUT:
      return {
        loggedInUser: undefined
      };

    default:
      return state;
  }
}
