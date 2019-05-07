import React, { Component } from "react";
import {
  Container,
} from "semantic-ui-react";

import NavBar from "./NavBar";
import ContentSurvey from "./ContentSurvey"

export default class Survey extends Component {

  render() {

    return (
      <Container style={{width:'100%'}}>
      <NavBar />
      <ContentSurvey></ContentSurvey>
      </Container>
    );
  }
}
