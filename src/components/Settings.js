import React, { Component } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Grid, Segment, Container } from "semantic-ui-react";
import "../global.scss";
import { url } from "../config";
var jwtDecode = require("jwt-decode");

// Basically, the page for login and register functions
export default class Settings extends Component {
  constructor() {
    super();
    this.state = {
      oldPassword: "",
      password: "",
      passwordCopy: "",
      companyName: "",
      message: ""
    };
  }

  componentDidMount() {
    if (!localStorage.getItem("jwtToken")) {
      this.props.history.push("/login");
    }
    this.setState({ password: "", passwordReg: "" });
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmitPassword = e => {
    e.preventDefault();

    const { oldPassword, password, passwordCopy } = this.state;
    if (password !== passwordCopy) {
      this.setState({
        message:
          "Les deux mots de passe ne correspondent pas... Veuillez réesayer"
      });
      toast.error(
        "Les deux mots de passe ne correspondent pas... Veuillez réesayer",
        {
          position: "top-center",
          autoClose: 10000
        }
      );
      return 0;
    }
    axios
      .post(`${url}/api/auth/changepass`, {
        password: oldPassword,
        newPassword: password,
        username: localStorage.getItem("User")
      })
      .then(res => {
        if (res.data.success) {
          var decoded = jwtDecode(res.data.token);
          localStorage.setItem("User", decoded.username);
          localStorage.setItem("level", decoded.level);
          localStorage.setItem("id", decoded._id);
          console.log(decoded);
          localStorage.setItem("jwtToken", res.data.token);
          localStorage.setItem("companyId", res.data.companyId);
          this.setState({
            oldPassword: "",
            password: "",
            passwordCopy: "",
            message: res.data.msg
          });
          toast.success(res.data.msg, {
            position: "top-center",
            autoClose: 10000
          });
        } else {
          toast.error(res.data.msg, {
            position: "top-center",
            autoClose: 10000
          });
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

  render() {
    const {
      oldPassword,
      password,
      passwordCopy,
      message,
      passwordReg
    } = this.state;
    console.log(`reg :${password}:, pass :${passwordReg}:`);
    return (
      <Container style={{ width: "100%" }}>
        <NavBar />

        <div className="container">
          <h1 className="title">Réglages du compte </h1>
          <Segment className="container" style={{ width: "50%" }}>
            <h3>Votre identifiant : </h3>
            <div>{localStorage.getItem("User")}</div>
            <h3>Changement de mot de passe : </h3>
            <br />
            <form onSubmit={this.onSubmitPassword} className="ui fluid form">
              <label for="inputEmail" className="sr-only">
                Ancien mot de passe :
              </label>
              <div class="form">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Ancien Mot de passe"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={this.onChange}
                  required
                />
              </div>
              <br />
              <label for="inputPassword" className="sr-only">
                Nouveau mot de passe :
              </label>
              <div class="form">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Mot de passe"
                  name="password"
                  value={password}
                  onChange={this.onChange}
                  required
                />
              </div>
              <br />
              <label for="inputPassword2" className="sr-only">
                Confirmer le nouveau mot de passe :
              </label>
              <div class="form">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Mot de passe"
                  name="passwordCopy"
                  value={passwordCopy}
                  onChange={this.onChange}
                  required
                />
              </div>
              <br />
              <br />
              <button className="ui button" type="submit">
                Changer le mot de passe!
              </button>
            </form>
            <br />
          </Segment>
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
