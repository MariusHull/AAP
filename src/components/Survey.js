import React, { Component } from "react";
import {
  Container,
} from "semantic-ui-react";

import NavBar from "./NavBar";
import ContentSurvey from "./ContentSurvey"

const id = "5cd27e6bf59bef1e6a20f33e"

export default class Survey extends Component {

  render() {

    return (
      <Container style={{width:'100%'}}>
      <NavBar />
      <ContentSurvey id={id}></ContentSurvey>
      </Container>
    );
  }
}
