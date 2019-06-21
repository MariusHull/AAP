import React, { Component } from "react";
import scss from "../../global.scss";
import {
  Segment,
  Form,
  Grid,
  Container,
  Card,
  Button,
  Icon
} from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../NavBar";

import axios from "axios";
import { url } from "../../config";

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      adminCreated: false,
      usernameReg: "",
      companyName: "",
      message: "",
      users: []
    };
  }

  componentDidMount = () => {
    this.loadPage();
  };

  loadPage() {
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
        var level = localStorage.getItem("level");
        this.setState({
          users: users.data.filter(user => user.createdBy === id || level >= 2)
        });
      })
      .catch(error => {
        if (error) {
          this.props.history.push("/login");
        }
      });
  }

  initPassword = id => {
    axios.defaults.headers.common["Authorization"] =
      "JWT " + localStorage.getItem("jwtToken");
    axios
      .get(`${url}/api/auth/reset/${id}`)
      .then(() => {
        this.componentDidMount();
      })
      .catch(error => {
        if (error) {
          this.props.history.push("/login");
        }
      });
  };

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

  onSubmitRegister = e => {
    e.preventDefault();

    const { usernameReg, companyName, adminCreated } = this.state;

    console.log({ usernameReg, companyName, adminCreated });
    axios
      .post(`${url}/api/auth/register`, {
        username: usernameReg,
        name: companyName,
        adminCreated: adminCreated,
        createdBy: localStorage.getItem("id")
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
            companyName: "",
            adminCreated: false,
            message: res.data.msg
          });
        }
      });
  };

  handleChange = (e, { value }) => this.setState({ adminCreated: value });

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
      .get(`${url}/api/auth/reset/${id}`)
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
    const { companyName, adminCreated, usernameReg } = this.state;

    return (
      <>
        <NavBar logout={this.logout} />
        <Container>
          <Segment className="container">
            <Grid.Column>
              <h3> Créez un nouvel utilisateur </h3>
              <br />
              <form
                className="form-signin ui fluid form"
                onSubmit={this.onSubmitRegister}
              >
                {localStorage.getItem("level") >= 2 && (
                  <>
                    <Form.Group inline>
                      <Form.Radio
                        label="Compte avocat"
                        value={true}
                        checked={adminCreated}
                        onChange={this.handleChange}
                      />
                      <Form.Radio
                        label="Compte entreprise"
                        value={false}
                        checked={!adminCreated}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                  </>
                )}

                <br />
                {!adminCreated && (
                  <>
                    <label for="inputName" className="sr-only">
                      Nom de l'entreprise :
                    </label>
                    <div class="form">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nom de l'entreprise"
                        name="companyName"
                        value={companyName}
                        onChange={this.onChange}
                        required
                      />
                    </div>
                    <br />
                  </>
                )}

                <label for="inputEmail" className="sr-only">
                  Adresse mail :
                </label>
                <div class="form">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="mail@example.fr"
                    name="usernameReg"
                    value={usernameReg}
                    onChange={this.onChange}
                    required
                  />
                </div>
                <br />
                <label for="inputPassword" className="sr-only">
                  Mot de passe :
                </label>
                <div class="form">
                  <input
                    value={
                      "Par défault, l'utilisateur aura comme mot de passe son adresse mail. N'oubliez pas de lui signaler qu'il est important de changer ce mot de passe."
                    }
                    disabled
                  />
                </div>
                <br />
                <br />
                <button className="ui button" type="submit">
                  Créer cet utilisateur
                </button>
              </form>
            </Grid.Column>
          </Segment>
          <Segment className="container">
            <h1> Mes utilisateurs </h1>
            {this.state.users.map(user => (
              <Card fluid style={{ margin: `${scss.margin_large} 0px` }}>
                <Card.Content>
                  <Card.Header> {user.username} </Card.Header>
                  <Card.Meta>
                    <span>{user.level === 0 ? "" : "Administrateur"}</span>
                  </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  {user.level === 0 ? (
                    <Button
                      icon
                      color="red"
                      onClick={() => {
                        this.initPassword(user._id);
                      }}
                      labelPosition="right"
                    >
                      Réinitialiser son mot de passe
                      <Icon name="redo" />
                    </Button>
                  ) : (
                    <Button>
                      Vous ne pouvez pas clear le mot de passe d'un
                      administrateur
                    </Button>
                  )}
                </Card.Content>
              </Card>
            ))}
          </Segment>
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
