import React, { Component } from "react";
import scss from "../../global.scss";
import {
  Segment,
  Form,
  Grid,
  Container,
  Label,
  Card,
  Button,
  Message,
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
      file: null,
      adminCreated: false,
      usernameReg: "",
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
      this.props.history.push("/");
    }
    axios.defaults.headers.common["Authorization"] =
      "JWT " + localStorage.getItem("jwtToken");
    axios
      .get(`${url}/api/users`)
      .then(users => {
        var id = localStorage.getItem("id");
        this.setState({
          users: users.data.filter(user => user.createdBy === id|| user._id === id)
        });
      })
      .catch(error => {
        if (error) {
          this.props.history.push("/");
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
          this.props.history.push("/");
        }
      });
  };

  componentWillMount() {
    console.log(
      `reg :${this.state.password}:, pass :${this.state.passwordReg}:`
    );
    this.setState({ password: "", passwordReg: "" });
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmitRegister = e => {
    e.preventDefault();

    const { usernameReg, adminCreated } = this.state;

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    const formData = new FormData();
    formData.append("file", this.state.file);

    axios.post(`${url}/api/auth/upload/${usernameReg}`, formData, config);

    axios
      .post(`${url}/api/auth/register`, {
        username: usernameReg,
        adminCreated: adminCreated,
        createdBy: localStorage.getItem("id")
      })
      .then(res => {
        console.log("user created", res);
        if (!res.data.success) {
          this.setState({
            message: res.data.msg
          });
        } else {
          this.setState({
            usernameReg: "",
            adminCreated: false,
            message: res.data.msg,
            file: null
          });
          toast.success("Vous avez crée un nouvel utilisateur !", {
            position: "top-center",
            autoClose: 10000
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

  suppress = id => {
    if (
      !window.confirm(
        "Êtes-vous sûr.e de vouloir supprimer cet utilisateur ? Cette action est irréversible!"
      )
    ) {
      return 0;
    }
    if (!window.confirm("En êtes-vous vraiment certain ? ")) {
      return 0;
    }
    axios.defaults.headers.common["Authorization"] =
      "JWT " + localStorage.getItem("jwtToken");
    axios
      .get(`${url}/api/auth/suppress/${id}`)
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
    const { adminCreated, usernameReg } = this.state;

    return (
      <>
        <br />
        <Container>
          <Segment className="container">
            <Grid.Column>
              <h2> Créez un nouvel utilisateur </h2>
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

                <Form.Input
                  fluid
                  label="Nom de l'entreprise"
                  type="text"
                  className="form-control"
                  placeholder="ex : AlterAlliance"
                  name="usernameReg"
                  value={usernameReg}
                  onChange={this.onChange}
                  required
                />
                <Form.Input
                  fluid
                  label="Téléchargez le logo de l'entreprise en format .png"
                  type="file"
                  className="form-control"
                  accept="image/x-png"
                  name="file"
                  hidden
                  onChange={e => {
                    this.setState({ file: e.target.files[0] });
                  }}
                  required
                />

                {/* <Label as="label" htmlFor="file" size="large">
                  <Icon name="file" />
                  Téléchargez le logo de l'entreprise en format .png
                </Label>
                <input
                  id="file"
                  className="form-control"
                  accept="image/x-png"
                  name="file"
                  hidden
                  type="file"
                  onChange={e => {
                    this.setState({ file: e.target.files[0] });
                  }}
                  required
                /> */}

                <Message info className="aabluetr">
                  <Message.Header>Mot de passe</Message.Header>
                  <p>
                    Par défaut, le mot de passe est le nom de l'entreprise.
                    N'oubliez pas de signaler au client de le changer dès que
                    possible !
                  </p>
                </Message>
                <br />
                <button className="ui button aablue" type="submit">
                  Créer cet utilisateur
                </button>
              </form>
            </Grid.Column>
          </Segment>
          <Segment style={{maxHeight: "calc(65vh - 327px)",
              overflow: "scroll",
              overflowX: "hidden"}}
          className="container">
            <h2> Mes utilisateurs </h2>
            {this.state.users.map(user => (
              <Card fluid style={{ margin: `${scss.margin_large} 0px` }}>
                <Card.Content>
                  <Card.Header> {user.username} </Card.Header>
                  <Card.Meta>
                    <span>{user.level === 0 ? "" : "Administrateur"}</span>
                  </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <Button
                    icon
                    color="red"
                    onClick={() => {
                      this.resetMP(user._id);
                    }}
                    labelPosition="right"
                  >
                    Réinitialiser son mot de passe
                    <Icon name="redo" />
                  </Button>
                  <Button
                    icon
                    color="red"
                    onClick={() => {
                      this.suppress(user._id);
                    }}
                    labelPosition="right"
                  >
                    Supprimer cet utilisateur
                    <Icon name="times" />
                  </Button>
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
