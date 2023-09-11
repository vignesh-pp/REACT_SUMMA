import isLogged from "./isLogged";
import Counters from "./Counters";
import { createStore, combineReducers } from "redux";

const store = combineReducers({
  login: isLogged,
  counter: Counters,
});

export default store;
