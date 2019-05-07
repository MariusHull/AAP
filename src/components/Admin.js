import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import Company from "./Company";
import NavBar from "./NavBar";

export default class Admin extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Container>
          <Company />
          <Company />
          <Company />
          <Company />
        </Container>
      </>
    );
  }
}
