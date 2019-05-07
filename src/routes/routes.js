import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "../components/Home";
import Survey from "../components/Survey";
import Admin from "../components/Admin";
import ThankYou from "../components/ThankYou";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/survey" exact component={Survey} />
        <Route path="/admin" exact component={Admin} />
        <Route path="/thankyou" exact component={ThankYou} />
      </Router>
    );
  }
}

export default Routes;
