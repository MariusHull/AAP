import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Survey from "../components/Company/Survey";
import Sites from "../components/Company/Sites";
import Populations from "../components/Company/Populations";
import Background from "../assets/Bureau_38.jpg";
import NavBar from "../components/NavBar";
import ThankYou from "../components/Company/ThankYou";
import Settings from "../components/Settings";
import Users from "../components/Admin/Users";
import Admin from "../components/Admin/Admin";

class AdminRoutes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/settings" exact component={Settings} />
          <Container style={{ width: "100%" }}>
            <NavBar />
            <Container
              style={{
                width: "100%",
                height: "calc(100vh - 95px)",
                position: "fixed",
                top: "53px",
                backgroundImage: `url(${Background})`,
                backgroundSize: "cover"
              }}
            >
              <Container
                className="container"
                style={{
                  width: "90vw",
                  height: "auto",
                  marginTop: "40px",
                  marginBottom: "40px",
                  background: "rgba(255,255,255,0.9)",
                  borderRadius: "3px"
                }}
              >
                <div style={{ paddingTop: "25px", marginBottom: "40px" }}>
                <Route
                    path="/admin/survey/:id/:indexSite,:indexPopulation"
                    exact
                    component={Survey}
                  />
                <Route path="/admin/users" exact component={Users} />
                <Route path="/admin/home" exact component={Admin} />
                <Route path="/admin/settings" exact component={Settings} />
                </div>
              </Container>
              
            </Container>
          </Container>
        </Switch>
      </Router>
    );
  }
}

export default AdminRoutes;
