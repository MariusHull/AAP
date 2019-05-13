import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Container } from "semantic-ui-react";

import Company from "./Company";
import NavBar from "./NavBar";

import axios from "axios";

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: []
    };
  }

  componentDidMount = () => {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    axios
      .get(`http://localhost:3001/api/companies/names`)
      .then(companies => {
        this.setState({ companies: companies.data });
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  };

  logout = () => {
    localStorage.removeItem("jwtToken");
    window.location.reload();
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
