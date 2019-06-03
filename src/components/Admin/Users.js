import React, { Component } from "react";
import scss from "../../global.scss";
import { ToastContainer, toast } from "react-toastify";
import { Container, Card, Button, Icon } from "semantic-ui-react";
import NavBar from "../NavBar";

import axios from "axios";

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount = () => {
    this.loadPage();
  };

  loadPage() {
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
        console.log(users);
      })
      .catch(error => {
        if (error) {
          this.props.history.push("/login");
        }
      });
  }

  supprUser = id => {
    axios.defaults.headers.common["Authorization"] =
      "JWT " + localStorage.getItem("jwtToken");
    axios
      .delete(`http://localhost:3001/api/users/${id}`)
      .then(user => {
        this.loadPage();
      })
      .catch(error => {
        if (error) {
          this.props.history.push("/login");
        }
      });
  };

  resetMP = id => {
    if (
      !window.confirm(
        "Êtes-vous sûr.e de vouloir réinitialiser le mot de passe de cet utilisateur ? Cette action est irréversible."
      )
    ) {
      return 0;
    }
    axios.defaults.headers.common["Authorization"] =
      "JWT " + localStorage.getItem("jwtToken");
    axios
      .get(`http://localhost:3001/api/auth/reset/${id}`)
      .then(res => {
        toast.success(res.data.msg, {
          position: "top-center",
          autoClose: 10000
        });
      })
      .catch(error => {
        toast.error("Une erreur inconnue est survenue (code 500).", {
          position: "top-center",
          autoClose: 10000
        });
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
                <Card.Meta>
                  <span>
                    {user.status === "Company" ? "" : "Administrateur"}
                  </span>
                </Card.Meta>
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
                )}{" "}
                &nbsp;{" "}
                <Button
                  icon
                  color="blue"
                  onClick={() => {
                    this.resetMP(user._id);
                  }}
                  labelPosition="right"
                >
                  Réinitialiser le Mot de passe
                  <Icon name="edit" />
                </Button>
              </Card.Content>
            </Card>
          ))}
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            pauseOnHover
          />
        </Container>
      </>
    );
  }
}
