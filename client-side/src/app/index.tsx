import React from "react";
import { Provider } from "react-redux";
import { setupStore } from "../entities/Store/store";
import "./styles/index.scss";
import { Router } from "./providers/Router";

const store = setupStore();

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default App;
