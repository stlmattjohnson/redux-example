import {
  FETCH_LINES,
  NEW_LINE,
  UPDATE_LINE,
  DELETE_LINE
} from "../actions/types";

const initialState = {
  lines: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_LINES:
      return {
        ...state.lines,
        lines: action.payload
      };

    case NEW_LINE:
      return {
        ...state.lines,
        lines: [...state.lines, action.payload]
      };

    case UPDATE_LINE:
      const updatedLines = state.lines.map(line => {
        if (line.id === action.payload.id) {
          return { ...line, ...action.payload };
        }
        return line;
      });
      return {
        ...state.lines,
        lines: updatedLines
      };

    case DELETE_LINE:
      const index = state.lines
        .map(function(line) {
          return line.id;
        })
        .indexOf(action.payload);
      return {
        lines: [...state.lines.slice(0, index), ...state.lines.slice(index + 1)]
      };

    default:
      return state;
  }
}
