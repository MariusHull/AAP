import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";
import {
  Button,
  Divider,
  Grid,
  Image,
  Segment,
  Dropdown,
  Input,
  Label,
  Container,
  Dimmer,
  Loader,
  Icon,
  Step,
  Table,
  Comment,
  Form,
  Header,
  Statistic
} from "semantic-ui-react";

// Basically, the page for login and register functions
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      usernameReg: "",
      passwordReg: "",
      message: ""
    };
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmitLogin = e => {
    e.preventDefault();

    const { username, password } = this.state;

    axios
      .post(`http://localhost:3001/api/auth/login`, { username, password })
      .then(result => {
        localStorage.setItem("jwtToken", result.data.token);
        this.setState({ message: "" });
        this.props.history.push("/admin");
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.setState({
            message:
              "La connexion a échoué, veuillez réessayer en vérifiant vos identifiants."
          });
        }
      });
  };

  onSubmitRegister = e => {
    e.preventDefault();

    const { usernameReg, passwordReg } = this.state;

    console.log({ usernameReg, passwordReg });
    axios
      .post("http://localhost:3001/api/auth/register", {
        username: usernameReg,
        password: passwordReg
      })
      .then(result => {
        if (!result.success) {
          this.setState({
            message:
              "Une erreur est survenue en essayant de créer votre compte, veuillez réessayer."
          });
        } else {
          this.setState({
            usernameReg: "",
            passwordReg: "",
            message:
              "Vous avez bien été inscrit, veuillez vous connecter maintenant!"
          });
        }
      });
  };

  render() {
    const {
      username,
      password,
      message,
      passwordReg,
      usernameReg
    } = this.state;
    return (
      <Container style={{ width: "100%" }}>
        <NavBar />

        <div className="container">
          <h1>Bienvenue, merci de vous connecter : </h1>
          <Segment className="container">
            <Grid columns={2} relaxed="very">
              <Grid.Column>
                <h3>Déjà inscrit ? Connectez-vous !</h3>
                <br />
                {message !== "" && (
                  <div
                    className="alert alert-warning alert-dismissible"
                    role="alert"
                  >
                    {message}
                    <br />
                  </div>
                )}
                <form onSubmit={this.onSubmitLogin}>
                  <label for="inputEmail" className="sr-only">
                    Adresse mail :
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="mail@exemple.fr"
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    required
                  />
                  <br />
                  <label for="inputPassword" className="sr-only">
                    Mot de passe :
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Mot de passe"
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    required
                  />
                  <button
                    className="btn btn-lg btn-primary btn-block"
                    type="submit"
                  >
                    Me connecter !
                  </button>
                </form>
              </Grid.Column>
              <Grid.Column>
                <h3>Nouveau ? Inscrivez-vous !</h3>
                <br />
                <form className="form-signin" onSubmit={this.onSubmitRegister}>
                  <label for="inputEmail" className="sr-only">
                    Adresse mail :
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="mail@example.fr"
                    name="usernameReg"
                    value={usernameReg}
                    onChange={this.onChange}
                    required
                  />
                  <br />
                  <label for="inputPassword" className="sr-only">
                    Mot de passe :
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="passwordReg"
                    value={passwordReg}
                    onChange={this.onChange}
                    required
                  />
                  <button
                    className="btn btn-lg btn-primary btn-block"
                    type="submit"
                  >
                    Register
                  </button>
                </form>
              </Grid.Column>
            </Grid>

            <Divider vertical>Ou</Divider>
          </Segment>
        </div>
      </Container>
    );
  }
}
