import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "../components/Home";
import Admin from "../components/Admin";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/admin" exact component={Admin} />
      </Router>
    );
  }
}

export default Routes;