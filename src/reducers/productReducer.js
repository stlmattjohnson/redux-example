import {
  FETCH_PRODUCTS,
  NEW_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} from "../actions/types";

const initialState = {
  products: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state.products,
        products: action.payload
      };

    case NEW_PRODUCT:
      return {
        ...state.products,
        products: [...state.products, action.payload]
      };

    case UPDATE_PRODUCT:
      const updatedProducts = state.products.map(product => {
        if (product.id === action.payload.id) {
          return { ...product, ...action.payload };
        }
        return product;
      });
      return {
        ...state.products,
        products: updatedProducts
      };

    case DELETE_PRODUCT:
      const index = state.products
        .map(function(product) {
          return product.id;
        })
        .indexOf(action.payload);
      return {
        products: [
          ...state.products.slice(0, index),
          ...state.products.slice(index + 1)
        ]
      };

    default:
      return state;
  }
}
