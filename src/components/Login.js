import React, { Component } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Button, Form, Grid, Container } from "semantic-ui-react";
import "../global.scss";
import { url } from "../config";
import Background from "../assets/background.jpg";
var jwtDecode = require("jwt-decode");

// Basically, the page for login and register functions
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      usernameReg: "",
      companyName: "",
      passwordReg: "",
      message: ""
    };
  }

  componentWillMount() {
    console.log(
      `reg :${this.state.password}:, pass :${this.state.passwordReg}:`
    );
    this.setState({ password: "", passwordReg: "", companyName: "" });
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
      .post(`${url}/api/auth/login`, { username, password })
      .then(res => {
        if (res.data.success) {
          var decoded = jwtDecode(res.data.token);
          localStorage.setItem("User", decoded.username);
          localStorage.setItem("level", decoded.level);
          localStorage.setItem("id", decoded._id);
          console.log(decoded);
          localStorage.setItem("jwtToken", res.data.token);
          localStorage.setItem("companyId", res.data.companyId);
          this.setState({ message: "" });
          if (res.data.level >= 2) {
            this.props.history.push("/admin");
          } else if (res.data.level >= 1) {
            this.props.history.push("/users");
          } else if (res.data.level === 0) {
            this.props.history.push("/user/sites");
          } else {
            this.setState({
              message:
                "Cet utilisateur n'a pas de niveau. Merci de contacter l'administrateur en précisant ce problème."
            });
            toast.info(
              "Cet utilisateur n'a pas de status. Merci de contacter l'administrateur en précisant ce problème.",
              {
                position: "top-center",
                autoClose: 10000
              }
            );
          }
        } else {
          toast.error(res.data.msg, {
            position: "top-center",
            autoClose: 10000
          });
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          toast.error("Erreur inconnue, veuillez réessayer", {
            position: "top-center",
            autoClose: 10000
          });
        } else {
          toast.error("Erreur inconnue, veuillez réessayer", {
            position: "top-center",
            autoClose: 10000
          });
        }
      });
  };

  onSubmitRegister = e => {
    e.preventDefault();

    const { usernameReg, passwordReg, companyName } = this.state;

    console.log({ usernameReg, passwordReg, companyName });
    axios
      .post(`${url}/api/auth/register`, {
        username: usernameReg,
        password: passwordReg,
        name: companyName
      })
      .then(res => {
        console.log(res);
        if (!res.data.success) {
          toast.error(res.data.msg, {
            position: "top-center",
            autoClose: 10000
          });
        } else {
          this.setState({
            usernameReg: "",
            passwordReg: "",
            companyName: "",
            message: res.data.msg
          });
          toast.success(res.data.msg, {
            position: "top-center",
            autoClose: 10000
          });
        }
      });
  };

  render() {
    const { username, password, message, passwordReg } = this.state;
    console.log(`reg :${password}:, pass :${passwordReg}:`);
    return (
      <Container
        style={{
          width: "100%",
          height: "auto",
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover"
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            height: "calc(100vh - 40px)",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <Container
            className="container"
            style={{
              width: "50vw",
              background: "rgba(255,255,255,0.9)",
              padding: "30px",
              borderRadius: "3px"
            }}
          >
            <Grid verticalAlign="middle" centered>
              <Grid.Row centered>
                <Grid.Column verticalAlign="middle" centered>
                  <Form onSubmit={this.onSubmitLogin}>
                    <h3 style={{ color: "#A5673F" }}>
                      {" "}
                      Bienvenue sur la plateforme AlterAlliance{" "}
                    </h3>
                    <br />
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
                    <Form.Group widths="equal">
                      <Form.Input
                        fluid
                        label="Nom de l'entreprise"
                        type="text"
                        className="form-control"
                        placeholder="ex : AlterAlliance"
                        name="username"
                        value={username}
                        onChange={this.onChange}
                        required
                      />
                      <Form.Input
                        fluid
                        label="Mot de passe"
                        type="password"
                        className="form-control"
                        placeholder="Mot de passe"
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        required
                      />
                    </Form.Group>
                    <br />
                    <Form.Group>
                      <div style={{ margin: "auto" }}>
                        <Button
                          className="ui button"
                          type="submit"
                          basic
                          color="brown"
                        >
                          {" "}
                          Me connecter{" "}
                        </Button>
                        <Button
                          class="ui button"
                          data-tooltip="Envoyez un email à vanessa.boissard@alteralliance.com"
                          data-position="top center"
                          basic
                        >
                          {" "}
                          Mot de passe oublié{" "}
                        </Button>
                      </div>
                    </Form.Group>
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </div>
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
    );
  }
}
