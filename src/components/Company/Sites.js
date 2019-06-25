import React, { Component } from "react";
import {
  Container,
  Card,
  Icon,
  Form,
  Modal,
  Message,
  Header
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
      modalOpen: false,
      name: "",
      logo: null
    };
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
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
    this.handleClose();
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
    var { siteName } = this.state;

    return (
      <Container style={{ width: "100%" }}>
        <NavBar />

        <img
          src={`${url}/api/companies/image/${this.state.name}`}
          alt="Logo Entreprise"
          style={{ margin: `10px`, height: "30px" }}
        />

        <Message
          info
          style={{ width: "23%", margin: "10px auto" }}
          header={"Gestions de vos sites"}
          content={
            "Sur cette page vous pouvez consulter vos sites et en créer de nouveaux en cliquant sur '+'"
          }
        />
        <Container>
          {this.state.sites.map((e, i) => (
            <Card centered href={`/population/${i}`}>
              <Card.Content>
                <Card.Header>{e.name}</Card.Header>
              </Card.Content>
            </Card>
          ))}
          <Modal
            trigger={
              <Card onClick={this.handleOpen} centered>
                <Card.Content>
                  <Card.Header>+</Card.Header>
                </Card.Content>
              </Card>
            }
            open={this.state.modalOpen}
            onClose={this.handleClose}
            style={{ width: "30%", marginTop: "5%" }}
          >
            <Header icon="edit" content="Nouveau Site" />
            <Modal.Content>
              <Form onSubmit={this.handleSubmit}>
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
    );
  }
}
