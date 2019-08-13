import React, { Component } from "react";
import { Container } from "semantic-ui-react";

import ContentSurvey from "./ContentSurvey";

export default class Survey extends Component {
  componentDidMount = () => {
    if (
      !(localStorage.getItem("jwtToken") && localStorage.getItem("level") < 1)
    ) {
      this.props.history.push("/");
    }
    if (!localStorage.getItem("jwtToken")) {
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <Container
        style={{ width: "100%", marginTop: "-30px", paddingTop: "20px", height: "91vh" }}
      >
        <ContentSurvey
          id={localStorage.getItem("companyId")}
          siteIndex={this.props.match.params.indexSite}
          populationIndex={this.props.match.params.indexPopulation}
        />
      </Container>
    );
  }
}
