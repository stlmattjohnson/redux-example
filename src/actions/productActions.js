import {
  FETCH_PRODUCTS,
  NEW_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} from "./types";

import axios from "axios";

export const fetchProducts = () => dispatch => {
  axios
    .get("http://localhost:8080/products/")
    .then(products =>
      dispatch({ type: FETCH_PRODUCTS, payload: products.data.data })
    );
};

export const createProduct = productData => dispatch => {
  axios
    .post("http://localhost:8080/products/", { ...productData })
    .then(product =>
      dispatch({
        type: NEW_PRODUCT,
        payload: product.data.data
      })
    );
};

export const updateProduct = productData => dispatch => {
  axios
    .put("http://localhost:8080/products/", { ...productData })
    .then(product =>
      dispatch({ type: UPDATE_PRODUCT, payload: product.data.data })
    );
};

export const deleteProduct = productData => dispatch => {
  axios
    .delete(`http://localhost:8080/products/${productData}`)
    .then(product => dispatch({ type: DELETE_PRODUCT, payload: productData }));
};
