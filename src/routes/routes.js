import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Survey from "../components/Company/Survey";
import Admin from "../components/Admin/Admin";
import ThankYou from "../components/Company/ThankYou";
import Sites from "../components/Company/Sites";
import Populations from "../components/Company/Populations";
import Login from "../components/Login";
import Users from "../components/Admin/Users";
import Settings from "../components/Settings";

class Routes extends Component {
  render() {
    return (
      <Router>
        <div style={{ marginBottom: "50px" }}>
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <Route path="/users" exact component={Users} />
          <Route
            path="/survey/:indexSite,:indexPopulation"
            exact
            component={Survey}
          />
          <Route path="/admin" exact component={Admin} />
          <Route path="/thankyou" exact component={ThankYou} />
          <Route path="/sites" exact component={Sites} />
          <Route path="/population/:index" exact component={Populations} />
          <Route path="/settings" exact component={Settings} />
        </div>
      </Router>
    );
  }
}

export default Routes;
