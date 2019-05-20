import React, { Component } from "react";
import { Container } from "semantic-ui-react";

import NavBar from "./NavBar";
import ContentSurvey from "./ContentSurvey";

export default class Survey extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: "",
    }
  }

  componentDidMount = () => {
    if (!localStorage.getItem("jwtToken")) {
      this.props.history.push("/login");
    }
    if (localStorage.getItem("id")){
      this.setState({id: localStorage.getItem("id")})
    }
  };

  render() {
    return (
      <Container style={{ width: "100%" }}>
        <NavBar />
        <div>{localStorage.getItem("id")}</div>
        <ContentSurvey id={this.state.id} />
      </Container>
    );
  }
}
