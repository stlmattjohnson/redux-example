import {
  FETCH_USERS,
  NEW_USER,
  UPDATE_USER,
  DELETE_USER
} from "../actions/types";

const initialState = {
  users: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state.users,
        users: action.payload
      };

    case NEW_USER:
      return {
        ...state.users,
        users: [...state.users, action.payload]
      };

    case UPDATE_USER:
      const updatedUsers = state.users.map(user => {
        if (user.id === action.payload.id) {
          return { ...user, ...action.payload };
        }
        return user;
      });
      return {
        ...state.users,
        users: updatedUsers
      };

    case DELETE_USER:
      const index = state.users
        .map(function(user) {
          return user.id;
        })
        .indexOf(action.payload);
      return {
        users: [...state.users.slice(0, index), ...state.users.slice(index + 1)]
      };

    default:
      return state;
  }
}
