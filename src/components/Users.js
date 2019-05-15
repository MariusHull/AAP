import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";

import axios from "axios";

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount = () => {
    if (
      !(
        localStorage.getItem("jwtToken") &&
        localStorage.getItem("Status") === "Admin"
      )
    ) {
      this.props.history.push("/login");
    }
    axios.defaults.headers.common["Authorization"] =
      "JWT " + localStorage.getItem("jwtToken");
    axios
      .get(`http://localhost:3001/api/users`)
      .then(users => {
        this.setState({ users: users.data });
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  };

  render() {
    return (
      <>
        <NavBar logout={this.logout} />
        <Container>
          {this.state.users.map(user => (
            <div>{user.username} Et plus d'infos par la suite</div>
          ))}
        </Container>
      </>
    );
  }
}
