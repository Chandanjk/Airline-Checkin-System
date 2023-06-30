import React from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/index.css";
import App from "./components/App";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/configureStore";
import { BrowserRouter as Router } from "react-router-dom";

const store = configureStore();

render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById("app")
);
