import React, { Component } from "react";

import { Container } from "semantic-ui-react";

import Company from "./Company";
import NavBar from "../NavBar";
import { url } from "../../config";

import axios from "axios";

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount = () => {
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
        console.log(users.data);
        this.setState({
          users: users.data.filter(
            user => user.createdBy === id && user.level < 1
          )
        });
      })
      .catch(error => {
        if (error) {
          console.log("error", error);
          this.props.history.push("/");
        }
      });
  };

  render() {
    return (
      <>
        <Container>
        <h2>Vos utilisateurs </h2>
        <div style={{maxHeight: "75vh",
              width: "100%",
              padding: "10px",
              overflow: "scroll",
              overflowX: "hidden"}} >
          {this.state.users.length> 0 ? (this.state.users.map(user => (
            <Company companyId={user.companyId} key={user._id} />
          ))) : (<div> <br/><br/> <p> Vous n'avez pas encore d'utilisateurs à votre actif. Pour en créer un, rendez vous sur l'onglet "Gestion utilisateurs"</p></div>)}</div>
        </Container>
      </>
    );
  }
}
