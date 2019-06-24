import React, { Component } from "react";
import { Container } from "semantic-ui-react";

import NavBar from "../NavBar";
import ContentSurvey from "./ContentSurvey";

export default class Survey extends Component {
  componentDidMount = () => {
    if (
      !(localStorage.getItem("jwtToken") && localStorage.getItem("level") < 1)
    ) {
      this.props.history.push("/login");
    }
    if (!localStorage.getItem("jwtToken")) {
      this.props.history.push("/login");
    }
  };

  render() {
    return (
      <Container style={{ width: "100%" }}>
        <NavBar />
        <ContentSurvey
          id={localStorage.getItem("companyId")}
          siteIndex={this.props.match.params.indexSite}
          populationIndex={this.props.match.params.indexPopulation}
        />
      </Container>
    );
  }
}
