import {
  FETCH_VENDORS,
  NEW_VENDOR,
  UPDATE_VENDOR,
  DELETE_VENDOR
} from "./types";

import axios from "axios";

export const fetchVendors = () => dispatch => {
  axios
    .get("http://localhost:8080/vendors/")
    .then(vendors =>
      dispatch({ type: FETCH_VENDORS, payload: vendors.data.data })
    );
};

export const createVendor = vendorData => dispatch => {
  axios.post("http://localhost:8080/vendors/", { ...vendorData }).then(vendor =>
    dispatch({
      type: NEW_VENDOR,
      payload: vendor.data.data
    })
  );
};

export const updateVendor = vendorData => dispatch => {
  axios
    .put("http://localhost:8080/vendors/", { ...vendorData })
    .then(vendor =>
      dispatch({ type: UPDATE_VENDOR, payload: vendor.data.data })
    );
};

export const deleteVendor = vendorData => dispatch => {
  axios
    .delete(`http://localhost:8080/vendors/${vendorData}`)
    .then(vendor => dispatch({ type: DELETE_VENDOR, payload: vendorData }));
};
