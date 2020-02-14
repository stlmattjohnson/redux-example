import { combineReducers } from "redux";
import userReducer from "./userReducer";
import vendorReducer from "./vendorReducer";
import productReducer from "./productReducer";
import requestReducer from "./requestReducer";
import appReducer from "./appReducer";
import lineReducer from "./lineReducer";
import reviewReducer from "./reviewReducer";

export default combineReducers({
  users: userReducer,
  vendors: vendorReducer,
  products: productReducer,
  requests: requestReducer,
  loggedInUser: appReducer,
  lines: lineReducer,
  approvals: reviewReducer
});
