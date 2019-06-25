import React, { Component } from "react";
import {
  Container,
  Card,
  Icon,
  Form,
  Modal,
  Message,
  Header,
  Grid
} from "semantic-ui-react";
import im from "../../assets/writing.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
import { url } from "../../config";
import NavBar from "../NavBar";

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
      selectedSite: undefined,
    };
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = (type) => {
    if (type==="site"){
      const { siteName, sites } = this.state;
    console.log(siteName);
    axios.defaults.headers.common["Authorization"] =
      "JWT " + localStorage.getItem("jwtToken");
    axios
      .post(`${url}/api/companies/site/${localStorage.getItem("companyId")}`, {
        siteName
      })
      .then(r => {
        console.log(r.data);
        sites.push(r.data);
        this.setState({ sites });
        console.log(this.state.sites);
      });
      this.setState({modalOpenSite: false, siteName: ""});
    } else {
      const { populationName } = this.state;
      const populations = this.state.sites[this.state.selectedSite].populations
    console.log(populationName);
    axios.defaults.headers.common["Authorization"] =
      "JWT " + localStorage.getItem("jwtToken");
    axios
      .post(
        `http://localhost:3001/api/companies/population/${localStorage.getItem(
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
      this.setState({modalOpenPopulation: false, populationName: ""});
    }
  };

  componentDidMount() {
    if (
      !(localStorage.getItem("jwtToken") && localStorage.getItem("level") < 1)
    ) {
      this.props.history.push("/login");
    }
    axios.defaults.headers.common["Authorization"] =
      "JWT " + localStorage.getItem("jwtToken");
    axios
      .get(`${url}/api/companies/${localStorage.getItem("companyId")}`)
      .then(r => {
        console.log(r.data.sites);
        this.setState({ sites: r.data.sites, name: r.data.name });
        // axios.get(`${url}/api/companies/image/${r.data.name}`).then(img => {
        //   this.setState({ logo: btoa(img.data) });
        // });
        console.log("../../../../back/public/" + this.state.name + ".png");
      })
      .catch(error => {
        if (error) {
          console.log("error", error);
          this.props.history.push("/login");
        }
      });
  }

  render() {
    var { siteName, selectedSite, populationName } = this.state;

    return (
      <Container style={{ width: "100%" }}>
        <NavBar />

        <img
          src={`${url}/api/companies/image/${this.state.name}`}
          alt="Logo Entreprise"
          style={{ margin: `10px`, height: "30px" }}
        />

      <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
            <Container style={{ width: "50%" }}>
        <Message
          info
          style={{ width: "80%", margin: "10px auto" }}
          header={"Gestions de vos sites"}
          content={
            "Sur cette page vous pouvez consulter vos sites et en créer de nouveaux en cliquant sur '+'"
          }
        />
        <Container>
          {this.state.sites.map((e, i) => (
            <Card onClick={() => {this.setState({selectedSite: i}); console.log(i)}}>
              <Card.Content>
                <Card.Header>{e.name}</Card.Header>
              </Card.Content>
            </Card>
          ))}
          <Modal
            trigger={
              <Card onClick={() => this.setState({modalOpenSite: true})} centered fluid>
                <Card.Content>
                  <Card.Header>+</Card.Header>
                </Card.Content>
              </Card>
            }
            open={this.state.modalOpenSite}
            onClose={() => this.setState({modalOpenSite: false})}
            style={{ width: "30%", marginTop: "5%" }}
          >
            <Header icon="edit" content="Nouveau Site" />
            <Modal.Content>
              <Form onSubmit={() => this.handleSubmit('site')}>
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
        </Container>
            </Grid.Column>
            <Grid.Column>
              {(selectedSite!==undefined) ? (
                <Container style={{ width: "50%" }}>
        <Message
          info
          style={{ width: "23%", margin: "10px auto" }}
          header={"Gestions de vos populations"}
          content={
            "Sur cette page vous pouvez consulter vos populations et en créer de nouveaux en cliquant sur '+'"
          }
        />
        <Container>
          {this.state.sites[selectedSite].populations.map((e, i) => (
            <Card
              centered
              href={`/survey/${selectedSite},${i}`}
            >
              <Card.Content>
                <Card.Header>{e.name}</Card.Header>
              </Card.Content>
            </Card>
          ))}
          <Modal
            trigger={
              <Card onClick={() => this.setState({modalOpenPopulation: true})} centered>
                <Card.Content>
                  <Card.Header textAlign="center">
                    <Icon name="add" />
                  </Card.Header>
                </Card.Content>
              </Card>
            }
            open={this.state.modalOpenPopulation}
            onClose={() => this.setState({modalOpenPopulation: false})}
            style={{ width: "30%", marginTop: "5%" }}
          >
            <Header icon="edit" content="Nouvelle population" />
            <Modal.Content>
              <Form onSubmit={() => this.handleSubmit('population')}>
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
        </Container>
              ):(
                <Message
          info
          style={{ width: "80%", margin: "10px auto" }}
          header={"Aucun site sélectionné"}
          content={
            "Veuillez sélectionner un site pour accéder à la population"
          }
        />
              )}
            </Grid.Column>
          </Grid.Row>
      </Grid>
      </Container>
    );
  }
}
