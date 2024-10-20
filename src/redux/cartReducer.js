// src/redux/cartReducer.js
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY_IN_CART,
} from "./actions";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [], // Load from local storage if it exists
};

// Reducer for the cart
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const item = action.payload;
      const existingItem = state.cartItems.find((x) => x.id === item.id);

      const updatedCartItems = existingItem
        ? state.cartItems.map((x) =>
            x.id === existingItem.id ? { ...x, quantity: x.quantity + 1 } : x,
          )
        : [...state.cartItems, { ...item, quantity: 1 }];

      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems)); // Save updated cart to local storage
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    }

    case REMOVE_FROM_CART: {
      const newCartItems = state.cartItems.filter(
        (x) => x.id !== action.payload,
      );
      localStorage.setItem("cartItems", JSON.stringify(newCartItems)); // Save updated cart to local storage
      return {
        ...state,
        cartItems: newCartItems,
      };
    }

    case UPDATE_QUANTITY_IN_CART: {
      const { id, quantity } = action.payload;
      const updatedQuantityCartItems = state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      );
      localStorage.setItem(
        "cartItems",
        JSON.stringify(updatedQuantityCartItems),
      ); // Save updated cart to local storage
      return {
        ...state,
        cartItems: updatedQuantityCartItems,
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
