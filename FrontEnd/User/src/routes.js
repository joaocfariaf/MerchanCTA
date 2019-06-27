import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "./containers/App";
import NotFoundPage from "./containers/NotFoundPage.js";
import LoginPage from "./containers/LoginPage";
import SigninPage from "./containers/SigninPage";
import FormPage from "./containers/FormPage";
import TablePage from "./containers/TablePage";
import Dashboard from "./containers/DashboardPage";
import ProductPage from "./containers/ProductPage";

export default (
  <Route>
    <Route path="login" component={LoginPage} />
    <Route path="/" component={LoginPage}>
      <IndexRoute component={Dashboard} />
      <Route path="dashboard" component={Dashboard} />
      <Route path="form" component={FormPage} />
      <Route path="table" component={TablePage} />
      <Route path="store/:store_id" component={ProductPage} />
      <Route path="*" component={NotFoundPage} />
    </Route>
  </Route>
);
