import React, { Component } from "react";
import { Container } from "semantic-ui-react";

import NavBar from "../NavBar";

export default class ThankYou extends Component {
  componentDidMount = () => {
    if (!localStorage.getItem("jwtToken")) {
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <Container style={{ width: "100%" }}>
        <h1
          style={{
            margin: "60px",
            padding: "60px",
            textAlign: "center"
          }}
        >
          Merci d'avoir complété ce questionnaire. Vous pouvez désormais fermer
          l'onglet.
        </h1>
      </Container>
    );
  }
}
