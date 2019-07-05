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

class UserRoutes extends Component {
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
                position: "absolute",
                top: "53px",
                backgroundImage: `url(${Background})`,
                backgroundSize: "cover"
              }}
            >
              <Container
                className="container"
                style={{
                  width: "80vw",
                  marginTop: "30px",
                  background: "rgba(255,255,255,0.9)",
                  borderRadius: "3px"
                }}
              >
                <div style={{ marginBottom: "50px" }}>
                  <Route
                    path="/user/survey/:indexSite,:indexPopulation"
                    exact
                    component={Survey}
                  />
                  <Route path="/user/thankyou" exact component={ThankYou} />
                  <Route path="/user/sites" exact component={Sites} />
                  <Route path="/" exact component={ThankYou} />
                </div>
              </Container>
            </Container>
          </Container>
        </Switch>
      </Router>
    );
  }
}

export default UserRoutes;
