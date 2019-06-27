import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Survey from "../components/Company/Survey";
import Sites from "../components/Company/Sites";
import Populations from "../components/Company/Populations";
import Background from "../assets/Bureau_38.jpg";
import NavBar from "../components/NavBar";
import ThankYou from "../components/Company/ThankYou";

class Routes extends Component {
  render() {
    return (
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
            <Router>
              <div style={{ marginBottom: "50px" }}>
                <Route path="/" exact component={ThankYou} />
                <Route path="/thankyou" exact component={ThankYou} />
                <Route
                  path="/survey/:indexSite,:indexPopulation"
                  exact
                  component={Survey}
                />
                <Route path="/sites" exact component={Sites} />
                <Route
                  path="/population/:index"
                  exact
                  component={Populations}
                />
              </div>
            </Router>
          </Container>
        </Container>
      </Container>
    );
  }
}

export default Routes;
