import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";
import { Divider, Grid, Segment, Container } from "semantic-ui-react";
var jwtDecode = require("jwt-decode");

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
      .then(res => {
        if (res.data.success) {
          var decoded = jwtDecode(res.data.token);
          localStorage.setItem("User", decoded.username);
          localStorage.setItem("Status", decoded.status);
          console.log(decoded);
          localStorage.setItem("jwtToken", res.data.token);
          this.setState({ message: "" });
          this.props.history.push("/survey");
        } else {
          this.setState({ message: res.data.msg });
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.setState({
            message: "error.data.msg"
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
      .then(res => {
        console.log(res);
        if (!res.data.success) {
          this.setState({
            message: res.data.msg
          });
        } else {
          this.setState({
            usernameReg: "",
            passwordReg: "",
            message: res.data.msg
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
                  <br />
                  <br />
                  <button className="ui button" type="submit">
                    Me connecter !
                  </button>
                </form>
                <br />
                <br />
                <div
                  class="ui button"
                  data-tooltip="Envoyez un email à admin@aap.fr"
                  data-position="top center"
                >
                  Mot de passe oublié ?
                </div>
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
                  <br />
                  <br />
                  <button className="ui button" type="submit">
                    M'inscrire
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
