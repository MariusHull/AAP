import React, { Component } from "react";
import { Container } from "semantic-ui-react";

import NavBar from "./NavBar";

export default class ThankYou extends Component {
  componentDidMount = () => {
    if (!localStorage.getItem("jwtToken")) {
      this.props.history.push("/login");
    }
  };

  render() {
    return (
      <Container style={{ width: "100%" }}>
        <NavBar />
        <h1
          style={{
            position: "absolute",
            top: "40vh",
            left: "25vw",
            margin: "auto",
            textAlign: "center",
            width: "50vw"
          }}
        >
          Merci d'avoir complété ce questionnaire. Vous pouvez désormais fermer
          l'onglet.
        </h1>
      </Container>
    );
  }
}
