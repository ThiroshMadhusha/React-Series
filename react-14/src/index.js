import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import "./index.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDom.render(
  <React.StrictMode>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </React.StrictMode>,
  document.querySelector("#root")
);
