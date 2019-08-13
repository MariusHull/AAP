import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";


import Login from "../components/Login";
import UserRoutes from "./userRoutes";
import AdminRoutes from "./adminRoutes";

import { withRouter } from "react-router";

class Routes extends Component {
  render() {
    return (
      <Router>
        <div style={{ marginBottom: "50px" }}>
          <Route path="/" exact component={Login} />
          <Route path="/user" render={props => <UserRoutes {...props} />} />
          <Route path="/admin" render={props => <AdminRoutes {...props} />} />

        </div>
      </Router>
    );
  }
}

export default Routes;
