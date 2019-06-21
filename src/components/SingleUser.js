import React, { Component } from "react";
import scss from "../global.scss";
import { Container, Card, Button, Icon } from "semantic-ui-react";
import NavBar from "./NavBar";
import { url } from "../../config";

import axios from "axios";

export default class User extends Component {
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
      .get(`${url}/api/users`)
      .then(users => {
        this.setState({ users: users.data });
        console.log(users);
      })
      .catch(error => {
        if (error) {
          this.props.history.push("/login");
        }
      });
  };

  supprUser = id => {
    if (
      window.confirm(
        "Êtes-vous sûr(e) de vouloir supprimer cet utilisateur ? Cette action est irréversible"
      )
    ) {
      axios.defaults.headers.common["Authorization"] =
        "JWT " + localStorage.getItem("jwtToken");
      axios
        .delete(`${url}/api/users/${id}`)
        .then(user => {
          this.componentDidMount();
        })
        .catch(error => {
          if (error) {
            this.props.history.push("/login");
          }
        });
    }
  };

  render() {
    return (
      <>
        <NavBar logout={this.logout} />
        <Container>
          {this.state.users.map(user => (
            <Card fluid style={{ margin: `${scss.margin_large} 0px` }}>
              <Card.Content>
                <Card.Header
                  onClick={() => this.props.history.push(`/users/${user._id}`)}
                >
                  {" "}
                  {user.username}{" "}
                </Card.Header>
              </Card.Content>
              <Card.Content extra>
                {user.status === "Company" ? (
                  <Button
                    icon
                    color="red"
                    onClick={() => {
                      this.supprUser(user._id);
                    }}
                    labelPosition="right"
                  >
                    Supprimer cet utilisateur
                    <Icon name="delete" />
                  </Button>
                ) : (
                  <Button>Vous ne pouvez supprimer un administrateur</Button>
                )}
              </Card.Content>
            </Card>
          ))}
        </Container>
      </>
    );
  }
}
