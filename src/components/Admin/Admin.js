import React, { Component } from "react";

import { Container } from "semantic-ui-react";

import Company from "./Company";
import NavBar from "../NavBar";
import { url } from "../../config";

import axios from "axios";

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount = () => {
    if (
      !(localStorage.getItem("jwtToken") && localStorage.getItem("level") >= 1)
    ) {
      this.props.history.push("/login");
    }
    axios.defaults.headers.common["Authorization"] =
      "JWT " + localStorage.getItem("jwtToken");
    axios
      .get(`${url}/api/users`)
      .then(users => {
        var id = localStorage.getItem("id");
        console.log(users.data);
        this.setState({
          users: users.data.filter(
            user => user.createdBy === id && user.level < 1
          )
        });
      })
      .catch(error => {
        if (error) {
          console.log("error", error);
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
            <Company companyId={user.companyId} key={user._id} />
          ))}
        </Container>
      </>
    );
  }
}
