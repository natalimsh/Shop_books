// src/redux/reducers.js
import { combineReducers } from "redux";
import cartReducer from "./cartReducer"; // Adjust this path if necessary

const rootReducer = combineReducers({
  cart: cartReducer,
  // You can add more reducers here in the future
});

export default rootReducer;
