import React, { Component } from "react";
import { Container, Card, Icon, Form, Modal, Message, Header} from "semantic-ui-react";
import im from "../../assets/writing.jpg";
import axios from "axios";
import { Link } from 'react-router-dom'

import NavBar from "../NavBar";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          sites:[],
          siteName: '',
          modalOpen: false
        }
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { siteName, sites} = this.state
        console.log(siteName);
        axios.defaults.headers.common["Authorization"] =
          "JWT " + localStorage.getItem("jwtToken");
        axios
          .post(`http://localhost:3001/api/companies/site/${localStorage.getItem("companyId")}`, {siteName})
          .then(r => {
              console.log(r.data)
              sites.push(r.data);
              this.setState({sites})
              console.log(this.state.sites)
          });
        this.handleClose();
    }

    componentDidMount() {
        axios.defaults.headers.common["Authorization"] =
          "JWT " + localStorage.getItem("jwtToken");
        axios
          .get(`http://localhost:3001/api/companies/${localStorage.getItem("companyId")}`)
          .then(r => {
              console.log(r.data.sites)
            this.setState({ sites: r.data.sites });
          });
      }

  render() {

    var { siteName } = this.state

    return (
      <Container style={{ width: "100%" }}>
        <NavBar />

        <Message info style={{ width: "23%", margin:'10px auto'}} header={"Gestions de vos sites"} content={"Sur cette page vous pouvez consulter vos sites et en créer de nouveaux en cliquant sur '+'"}/>

        {this.state.sites.map((e, i) => (
                <Card centered href={`/survey/${i}`}>
                    <Card.Content>
                    <Card.Header>
                    {e.name}
                    </Card.Header>
                    </Card.Content>
                </Card>
        ))}
        <Modal trigger={
            <Card onClick={this.handleOpen} centered>
            <Card.Content>
            <Card.Header textAlign = 'center'>
            <Icon name='add'></Icon>
            </Card.Header>
            </Card.Content>
        </Card>
        } open={this.state.modalOpen}
        onClose={this.handleClose} closeIcon>
            <Header icon='edit' content='Nouveau Site' />
            <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Input placeholder='Name' name='siteName' value={siteName} onChange={this.handleChange} />
                    <Form.Button content='Créer' />
                </Form.Group>
            </Form>
            </Modal.Content>
        </Modal>
      </Container>
    );
  }
}
