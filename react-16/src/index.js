import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import "./index.css";

import { StoreProvider } from "easy-peasy";
import store from "./store";

import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDom.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <Router>
        <Route path="/" component={App} />
      </Router>
    </StoreProvider>
  </React.StrictMode>,
  document.querySelector("#root")
);
