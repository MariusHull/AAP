import React, { Component } from "react";
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
    axios.get(`http://localhost:3001/companies/names`).then(companies => {
      this.setState({ companies: companies.data });
    });
  };

  render() {
    return (
      <>
        <NavBar />
        <Container>
          {this.state.companies.map(company => (
            <Company name={company.name} key={company._id} />
          ))}
        </Container>
      </>
    );
  }
}
