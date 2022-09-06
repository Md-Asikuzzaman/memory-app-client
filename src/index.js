import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// redux setup
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import combineAll from "./reducers";

const store = createStore(combineAll, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
