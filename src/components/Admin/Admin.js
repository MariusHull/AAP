import React, { Component } from "react";

import { Container } from "semantic-ui-react";

import Company from "./Company";
import NavBar from "../NavBar";

import axios from "axios";

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: []
    };
  }

  componentDidMount = () => {
    if (
      !(
        localStorage.getItem("jwtToken") &&
        localStorage.getItem("Status") === "Admin"
      )
    ) {
      this.props.history.push("/login");
    }
    axios.defaults.headers.common["Authorization"] =
      "JWT " + localStorage.getItem("jwtToken");
    axios
      .get(`http://localhost:3001/api/companies/names`)
      .then(companies => {
        console.log(companies);
        this.setState({ companies: companies.data });
      })
      .catch(error => {
        if (error) {
          this.props.history.push("/login");
        }
      });
  };

  render() {
    return (
      <>
        <NavBar logout={this.logout} />
        <Container>
          {this.state.companies.map(company => (
            <Company company={company} key={company._id} />
          ))}
        </Container>
      </>
    );
  }
}
