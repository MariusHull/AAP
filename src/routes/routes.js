import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Survey from "../components/Company/Survey";
import Admin from "../components/Admin/Admin";
import ThankYou from "../components/Company/ThankYou";
import Home from "../components/Company/Home";
import Login from "../components/Login";
import Users from "../components/Admin/Users";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/login" exact component={Login} />
        <Route path="/users" exact component={Users} />
        <Route path="/survey/:index" exact component={Survey} />
        <Route path="/admin" exact component={Admin} />
        <Route path="/thankyou" exact component={ThankYou} />
        <Route path="/home" exact component={Home} />
      </Router>
    );
  }
}

export default Routes;
