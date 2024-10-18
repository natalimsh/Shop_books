// redux/actions.js

// Existing actions...
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

// New action for updating the quantity
export const UPDATE_QUANTITY_IN_CART = "UPDATE_QUANTITY_IN_CART";

// Action creator for updating the quantity
export const updateQuantityInCart = (id, quantity) => ({
  type: UPDATE_QUANTITY_IN_CART,
  payload: { id, quantity },
});

// Other existing actions...
export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  payload: id,
});
