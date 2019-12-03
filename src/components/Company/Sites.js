import React, { Component } from "react";
import { css } from 'glamor';
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
import ShowAnswers from "../Admin/ShowAnswers";

export default class Sites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: [],
      siteName: "",
      populationName: "",
      populationName2: "",
      modalOpenSite: false,
      modalOpenPopulation: false,
      name: "",
      logo: null,
      selectedSite: undefined,
      modalOpen: false
    };
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = (type, site, pop) => {
    console.log(`hanlding : ${site} ${pop}`)
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
    } else if (type === "population" && this.state.populationName !== "") {
      const { populationName } = this.state;
      const populations = this.state.sites[this.state.selectedSite].populations;
      console.log(populationName);
      axios.defaults.headers.common["Authorization"] =
        "JWT " + localStorage.getItem("jwtToken");
      axios
        .post(
          `${url}/api/companies/populationscratch/${localStorage.getItem(
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
    } else if (type === "population2" && this.state.populationName2 !== "") {
      const { populationName2 } = this.state;
      const populations = this.state.sites[this.state.selectedSite].populations;
      console.log(populationName2);
      axios.defaults.headers.common["Authorization"] =
        "JWT " + localStorage.getItem("jwtToken");
      axios
        .post(
          `${url}/api/companies/populationfrom/${localStorage.getItem(
            "companyId"
          )}`,
          { populationName2: populationName2, siteId: this.state.selectedSite, siteIndex: site, popIndex: pop }
        )
        .then(r => {
          console.log(r.data);
          populations.push(r.data);
          this.setState({ populations });
          console.log(this.state.populations);
        });
      this.setState({ modalOpenPopulation: false, populationName2: "" });
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
              autoClose: 15000,
              className: "aablue"
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

  deleteSite = (i) => {
    const { sites } = this.state;
    console.log("SITE", i)
    if (window.confirm("Êtes-vous sûr(e) de vouloir supprimer ce site ? La suppression sera irreversible.")) {
      sites.splice(i,1);
      this.save();
    }
  }

  deletePop = (i, j) => {
    const { sites } = this.state;
    console.log("POP", i, j)
    if (window.confirm("Êtes-vous sûr(e) de vouloir supprimer ce site ? La suppression sera irreversible.")) {
      sites[i].populations.splice(j,1);
      this.save();
    }
  }


  save = () => {
    // const siteIndex = this.props.siteIndex
    const { sites } = this.state;
    console.log(`DEBUG : \n ${sites}`)
    axios.defaults.headers.common["Authorization"] =
      "JWT " + localStorage.getItem("jwtToken");
    axios
      .post(`${url}/api/companies/save/${localStorage.getItem("companyId")}`, {
        sites
      })
      .then(r => {
        this.setState({ selectedSite: undefined });
        toast.info(
          "Vos modifications ont bien été enregistrées",
          {
            position: "top-center",
            autoClose: 10000,
            className: "aablue"
          }
        );
      });
  };

  render() {
    var { sites, siteName, selectedSite, populationName, populationName2 } = this.state;

    return (
      <>
      <div style={{maxHeight: "75vh",
              width: "100%",
              'min-height': "200px",
              padding: "10px",
              overflow: "scroll",
              overflowX: "hidden"
              }} >
        <Grid divided="vertically">
          <Grid.Row columns={1} centered>
            <Grid.Column centered>
              <Container className="centerer" style={{ width: "200px", marginTop: "20px" }}>
                <img
                  src={`${url}/api/companies/image/${this.state.name}`}
                  alt="Logo Entreprise"
                  style={{ width: "auto", maxHeight: "150px" }}
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
              maxHeight: "calc(95vh - 327px)",
            }}
          >
            <Grid.Column>
              <Container style={{ width: "500px" }}>
                {this.state.sites.map((e, i) => (
                  <Segment
                    inverted={i === selectedSite}
                    fluid
                    className={i === selectedSite ? "flexed aablue" : "flexed"}
                    onClick={() => {
                      this.setState({ selectedSite: i });
                      console.log(i);
                    }}
                    style={{ padding: "5px", paddingLeft: "10px"}}
                  >
                    {e.name}
                    <button 
                      className="negative ui button" 
                      style={{ height: "30px", width: "auto", padding : "5px", margin: "5px" }}
                      onClick={() => this.deleteSite(i)}>
                    <i class="disabled close icon" style={{ margin: "0px"}}></i>
                    </button>
                  </Segment>
                ))}
                <Modal
                  trigger={
                    <Button
                      primary
                      fluid
                      icon
                      style = {{ backgroundColor: "#52768F" }}
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
                    <Form onSubmit={() => this.handleSubmit("site", 0, 0)}>
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
            <Grid.Column style={{paddingBottom: "20px"}}>
              {selectedSite !== undefined ? (
                <Container style={{ width: "500px" }}>
                  {this.state.sites[selectedSite] && this.state.sites[selectedSite].populations.map((e, i) => (
                    <Segment fluid centered className="flexed" style={{ padding: "5px", paddingLeft: "10px"}}>
                      <Link to={`/user/survey/${selectedSite},${i}`} style={{ width: "80%" }}>
                        <Container style={{ color: "#000" }}>
                          {e.name}
                        </Container>
                      </Link>
                      <button 
                      className="negative ui button" 
                      style={{ height: "30px", width: "auto", padding : "5px", margin: "5px" }}
                      onClick={() => this.deletePop(selectedSite, i)}>
                    <i class="disabled close icon" style={{ margin: "0px"}}></i>
                    </button>
                    </Segment>
                  ))}
                  <Modal
                    trigger={
                      <Button
                        primary
                        icon
                        fluid
                        style = {{ backgroundColor: "#52768F"}}
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
                    <h3>Créer une nouvelle population  : </h3>
                    <h5>Saisissez le nom de la population à créer, puis cliquez "Créer"</h5>
                      <Form onSubmit={() => this.handleSubmit("population", 0, 0)}>
                        <Form.Group>
                          <Form.Input
                            placeholder="Nom de la population"
                            name="populationName"
                            value={populationName}
                            onChange={this.handleChange}
                          />
                          <Form.Button content="Créer" />
                        </Form.Group>
                      </Form>
                      <h3>Créer une population à partir d'une population déjà existante : </h3>
                      <h5>Saisissez le nom de la population à créer, puis cliquez sur le nom de la population que vous souhaitez copier</h5>


                          <Form.Input
                            placeholder="Nom de la population"
                            name="populationName2"
                            value={populationName2}
                            onChange={this.handleChange}
                          />
                          {sites && sites.map((site, index) => (
                            <div> {site.populations && site.populations.map((pop, subindex) => (
                              <div style={{paddingTop: "10px"}}> <Form.Button content={`${site.name} - ${pop.name}`} onClick={() => this.handleSubmit("population2", index, subindex)} /></div>
                            ))}</div>
                          ))}

                      
                    </Modal.Content>
                  </Modal>
                </Container>
              ) : (
                <Message
                  info
                  className="aabluetr"
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
        </div>
      </>
    );
  }
}
