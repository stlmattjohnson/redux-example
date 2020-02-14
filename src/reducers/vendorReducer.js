import {
  FETCH_VENDORS,
  NEW_VENDOR,
  UPDATE_VENDOR,
  DELETE_VENDOR
} from "../actions/types";

const initialState = {
  vendors: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_VENDORS:
      return {
        ...state.vendors,
        vendors: action.payload
      };

    case NEW_VENDOR:
      return {
        ...state.vendors,
        vendors: [...state.vendors, action.payload]
      };

    case UPDATE_VENDOR:
      const updatedVendors = state.vendors.map(vendor => {
        if (vendor.id === action.payload.id) {
          return { ...vendor, ...action.payload };
        }
        return vendor;
      });
      return {
        ...state.vendors,
        vendors: updatedVendors
      };

    case DELETE_VENDOR:
      const index = state.vendors
        .map(function(vendor) {
          return vendor.id;
        })
        .indexOf(action.payload);
      return {
        vendors: [
          ...state.vendors.slice(0, index),
          ...state.vendors.slice(index + 1)
        ]
      };

    default:
      return state;
  }
}
