import React, { Component } from "react";
import { Container } from "semantic-ui-react";

import ContentSurvey from "./ContentSurvey";

export default class Survey extends Component {
  componentDidMount = () => {
    if (
      !localStorage.getItem("jwtToken")
    ) {
      this.props.history.push("/");
    }
  };

  render() {
    let id;
    if (localStorage.getItem("companyId") == "undefined") {
      id = this.props.match.params.id
    } else {
      id = localStorage.getItem("companyId")
    }
    console.log(id)
    return (
      <Container
        style={{ width: "100%", marginTop: "-30px", paddingTop: "20px", height: "91vh" }}
      >
        <ContentSurvey
          id={id}
          siteIndex={this.props.match.params.indexSite}
          populationIndex={this.props.match.params.indexPopulation}
        />
      </Container>
    );
  }
}
