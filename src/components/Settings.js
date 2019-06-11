import React, { Component } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Segment, Container, Form, Button, Icon } from "semantic-ui-react";
import "../global.scss";
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
      .post(`http://localhost:3001/api/auth/changepass`, {
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
    const { oldPassword, password, passwordCopy, passwordReg } = this.state;
    console.log(`reg :${password}:, pass :${passwordReg}:`);
    return (
      <Container style={{ width: "100%" }}>
        <NavBar />

        <div className="container">
          <br />
          <Segment className="container" style={{ width: "50%" }}>
            <h2 className="title">Réglages du compte </h2>
            <Form>
              <Form.Input
                fluid
                label="Votre identifiant"
                type="text"
                className="form-control"
                value={localStorage.getItem("User")}
                disabled
              />
              <h3> Changement de mot de passe </h3>
              <br />
              <Form.Input
                fluid
                label="Ancien mot de passe"
                type="text"
                className="form-control"
                placeholder="Ancien mot de passe"
                name="oldPassword"
                value={oldPassword}
                onChange={this.onChange}
                required
              />
              <Form.Input
                fluid
                label="Nouveau mot de passe"
                type="password"
                className="form-control"
                placeholder="Mot de passe"
                name="password"
                value={password}
                onChange={this.onChange}
                required
              />

              <Form.Input
                fluid
                label="Confirmer le nouveau mot de passe"
                type="password"
                className="form-control"
                placeholder="Mot de passe"
                name="passwordCopy"
                value={passwordCopy}
                onChange={this.onChange}
                required
              />
              <Button
                icon
                color="blue"
                onClick={this.onSubmitPassword}
                labelPosition="right"
              >
                Changer le mot de passe !
                <Icon name="redo" />
              </Button>
            </Form>
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
