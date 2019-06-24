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

import NavBar from "../NavBar";

export default class Sites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      populations: [],
      populationName: "",
      modalOpen: false
    };
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { populationName, populations } = this.state;
    console.log(populationName);
    axios.defaults.headers.common["Authorization"] =
      "JWT " + localStorage.getItem("jwtToken");
    axios
      .post(
        `http://localhost:3001/api/companies/population/${localStorage.getItem(
          "companyId"
        )}`,
        { populationName, siteId: this.props.match.params.index }
      )
      .then(r => {
        console.log(r.data);
        populations.push(r.data);
        this.setState({ populations });
        console.log(this.state.populations);
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
      .get(
        `http://localhost:3001/api/companies/${localStorage.getItem(
          "companyId"
        )}`
      )
      .then(r => {
        console.log(r.data.sites[this.props.match.params.index].populations);
        this.setState({
          populations: r.data.sites[this.props.match.params.index].populations
        });
      });
  }

  render() {
    var { populationName } = this.state;

    return (
      <Container style={{ width: "100%" }}>
        <NavBar />
        <Message
          info
          style={{ width: "23%", margin: "10px auto" }}
          header={"Gestions de vos populations"}
          content={
            "Sur cette page vous pouvez consulter vos populations et en créer de nouveaux en cliquant sur '+'"
          }
        />
        <Container>
          {this.state.populations.map((e, i) => (
            <Card
              centered
              href={`/survey/${this.props.match.params.index},${i}`}
            >
              <Card.Content>
                <Card.Header>{e.name}</Card.Header>
              </Card.Content>
            </Card>
          ))}
          <Modal
            trigger={
              <Card onClick={this.handleOpen} centered>
                <Card.Content>
                  <Card.Header textAlign="center">
                    <Icon name="add" />
                  </Card.Header>
                </Card.Content>
              </Card>
            }
            open={this.state.modalOpen}
            onClose={this.handleClose}
            style={{ width: "30%", marginTop: "5%" }}
          >
            <Header icon="edit" content="Nouvelle population" />
            <Modal.Content>
              <Form onSubmit={this.handleSubmit}>
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
    );
  }
}
