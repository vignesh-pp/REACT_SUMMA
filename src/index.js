import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import allReducer from "./components/ReduxConcept/reducers";
import { Provider } from "react-redux";

// //STORE - GLobalized state
// //ACTION - it describes what you want to do
// const increment = () => {
//   return { type: "INCREMENT" };
// };
// const decrement = () => {
//   return { type: "DECREMENT" };
// };
// //Reducer - it basically desc how your action transformed the action to next state
// const counter = (state = 0, action) => {
//   switch (action.type) {
//     case "INCREMENT":
//       return state + 1;
//     case "DECREMENT":
//       return state - 1;
//     default:
//       return state;
//   }
// };

// const store = createStore(counter);
// //display
// store.subscribe(() => console.log(store.getState()));
// //Dispatch - this is where we actually axecute the action
// store.dispatch(increment());
// store.dispatch(increment());
// store.dispatch(decrement());

const store = createStore(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
