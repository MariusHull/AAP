import React, { Component } from "react";
import scss from "../global.scss";
import { Container, Card, Button, Icon } from "semantic-ui-react";
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
        if (error) {
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
            <Card fluid style={{ margin: `${scss.margin_large} 0px` }}>
              <Card.Content>
                <Card.Header> {user.username} </Card.Header>
              </Card.Content>
              <Card.Content extra>
                <Button icon color="red" labelPosition="right">
                  Supprimer cet utilisateur
                  <Icon name="delete" />
                </Button>
              </Card.Content>
            </Card>
          ))}
        </Container>
      </>
    );
  }
}
