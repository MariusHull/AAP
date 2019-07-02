import React, { Component } from "react";
import {
  Container,
  Card,
  Icon,
  Form,
  Modal,
  Button,
  Message,
  Segment,
  Header,
  Step,
  Grid
} from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import { url } from "../../config";
import NavBar from "../NavBar";
import Background from "../../assets/Bureau_38.jpg";

export default class Sites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: [],
      siteName: "",
      populationName: "",
      modalOpenSite: false,
      modalOpenPopulation: false,
      name: "",
      logo: null,
      selectedSite: undefined
    };
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = type => {
    if (type === "site") {
      const { siteName, sites } = this.state;
      console.log(siteName);
      axios.defaults.headers.common["Authorization"] =
        "JWT " + localStorage.getItem("jwtToken");
      axios
        .post(
          `${url}/api/companies/site/${localStorage.getItem("companyId")}`,
          {
            siteName
          }
        )
        .then(r => {
          console.log(r.data);
          sites.push(r.data);
          this.setState({ sites });
          console.log(this.state.sites);
        });
      this.setState({ modalOpenSite: false, siteName: "" });
    } else {
      const { populationName } = this.state;
      const populations = this.state.sites[this.state.selectedSite].populations;
      console.log(populationName);
      axios.defaults.headers.common["Authorization"] =
        "JWT " + localStorage.getItem("jwtToken");
      axios
        .post(
          `${url}/api/companies/population/${localStorage.getItem(
            "companyId"
          )}`,
          { populationName, siteId: this.state.selectedSite }
        )
        .then(r => {
          console.log(r.data);
          populations.push(r.data);
          this.setState({ populations });
          console.log(this.state.populations);
        });
      this.setState({ modalOpenPopulation: false, populationName: "" });
    }
  };

  componentDidMount() {
    if (
      !(localStorage.getItem("jwtToken") && localStorage.getItem("level") < 1)
    ) {
      this.props.history.push("/");
    }
    axios.defaults.headers.common["Authorization"] =
      "JWT " + localStorage.getItem("jwtToken");
    axios
      .get(`${url}/api/companies/${localStorage.getItem("companyId")}`)
      .then(r => {
        this.setState({ sites: r.data.sites, name: r.data.name });
        var now = new Date();
        var then = new Date(r.data.lastPasswordUpdate);
        var milliseconds = now.getTime() - then.getTime();
        if (milliseconds > 61 * 24 * 60 * 60 * 1000) {
          toast.info(
            "Vous n'avez pas changé votre mot de passe depuis deux mois. Pour plus de sécurité, il est conseillé de le mettre à jour (via l'onglet Réglage du compte dans le menu).",
            {
              position: "top-center",
              autoClose: 10000
            }
          );
        }
      })
      .catch(error => {
        if (error) {
          console.log("error", error);
          this.props.history.push("/");
        }
      });
  }

  render() {
    var { siteName, selectedSite, populationName } = this.state;

    return (
      <>
        <Grid divided="vertically">
          <Grid.Row columns={1} centered>
            <Grid.Column centered>
              <Container style={{ width: "200px", marginTop: "20px" }}>
                <img
                  src={`${url}/api/companies/image/${this.state.name}`}
                  alt="Logo Entreprise"
                  style={{ width: "200px" }}
                />
              </Container>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1} centered>
            <Step.Group>
              <Step style={{ width: "400px" }}>
                <Icon name="map marker alternate" />
                <Step.Content>
                  <Step.Title>Choix du site</Step.Title>
                  <Step.Description>
                    Utiliser '+' pour créer un nouveau site
                  </Step.Description>
                </Step.Content>
              </Step>

              <Step style={{ width: "400px" }}>
                <Icon name="users" />
                <Step.Content>
                  <Step.Title>Choix de la population</Step.Title>
                  <Step.Description>
                    Utiliser '+' pour créer une nouvelle population
                  </Step.Description>
                </Step.Content>
              </Step>
            </Step.Group>
          </Grid.Row>
          <Grid.Row
            columns={4}
            centered
            style={{
              maxHeight: "calc(100vh - 327px)",
              overflow: "scroll",
              overflowX: "hidden"
            }}
          >
            <Grid.Column>
              <Container style={{ width: "500px" }}>
                {this.state.sites.map((e, i) => (
                  <Segment
                    inverted={i === selectedSite}
                    fluid
                    color={i === selectedSite && "blue"}
                    onClick={() => {
                      this.setState({ selectedSite: i });
                      console.log(i);
                    }}
                  >
                    {e.name}
                  </Segment>
                ))}
                <Modal
                  trigger={
                    <Button
                      primary
                      fluid
                      icon
                      onClick={() => this.setState({ modalOpenSite: true })}
                    >
                      <Icon name="add" />
                    </Button>
                  }
                  open={this.state.modalOpenSite}
                  onClose={() => this.setState({ modalOpenSite: false })}
                  style={{ width: "30%", marginTop: "5%" }}
                >
                  <Header icon="edit" content="Nouveau Site" />
                  <Modal.Content>
                    <Form onSubmit={() => this.handleSubmit("site")}>
                      <Form.Group>
                        <Form.Input
                          placeholder="Name"
                          name="siteName"
                          value={siteName}
                          onChange={this.handleChange}
                        />
                        <Form.Button content="Créer" />
                      </Form.Group>
                    </Form>
                  </Modal.Content>
                </Modal>
              </Container>
            </Grid.Column>
            <Grid.Column>
              {selectedSite !== undefined ? (
                <Container style={{ width: "500px" }}>
                  {this.state.sites[selectedSite].populations.map((e, i) => (
                    <Segment fluid centered>
                      <Link to={`/user/survey/${selectedSite},${i}`}>
                        <Container style={{ color: "#000" }}>
                          {e.name}
                        </Container>
                      </Link>
                    </Segment>
                  ))}
                  <Modal
                    trigger={
                      <Button
                        primary
                        icon
                        fluid
                        onClick={() =>
                          this.setState({ modalOpenPopulation: true })
                        }
                      >
                        <Icon name="add" />
                      </Button>
                    }
                    open={this.state.modalOpenPopulation}
                    onClose={() =>
                      this.setState({ modalOpenPopulation: false })
                    }
                    style={{ width: "30%", marginTop: "5%" }}
                  >
                    <Header icon="edit" content="Nouvelle population" />
                    <Modal.Content>
                      <Form onSubmit={() => this.handleSubmit("population")}>
                        <Form.Group>
                          <Form.Input
                            placeholder="Name"
                            name="populationName"
                            value={populationName}
                            onChange={this.handleChange}
                          />
                          <Form.Button content="Créer" />
                        </Form.Group>
                      </Form>
                    </Modal.Content>
                  </Modal>
                </Container>
              ) : (
                <Message
                  info
                  header={"Aucun site sélectionné"}
                  content={
                    "Veuillez sélectionner un site pour accéder à la population"
                  }
                />
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
      </>
    );
  }
}
