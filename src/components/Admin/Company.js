import React, { Component } from "react";
import { Card, Form } from "semantic-ui-react";
import ShowAnswers from "./ShowAnswers";
import scss from "../../global.scss";
import Export from "./Export";

import axios from "axios";

export default class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: { name: "", lastUpdate: new Date(), sites: [] },
      selectedPopulation: null,
      selectedSite: null,
      site: null,
      populations: null,
      topics: null,
      populationIndex: null,
      siteIndex: null
    };
  }

  getIndex = (array, name) => {
    for (var i = 0; i < array.length; i++) {
      if (array[i].name === name) {
        return i;
      }
    }
  };

  componentDidMount = () => {
    axios
      .get(`http://localhost:3001/api/companies/${this.props.companyId}`)
      .then(company => {
        this.setState({
          company: company.data
        });
      });
  };

  handleChange = (e, { value }) => {
    this.setState({ value });
    var i = this.getIndex(this.state.company.sites, value);
    this.setState({
      populations: this.state.company.sites[i].populations,
      siteIndex: i,
      populationIndex: null
    });
  };

  handleChangePop = (e, { value }) => {
    this.setState({ value });
    var i = this.getIndex(this.state.populations, value);
    this.setState({
      topics: this.state.populations[i].topics,
      populationIndex: i
    });
  };

  date = date => {
    if (date) {
      var d = new Date(date);
      return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
    } else return "";
  };

  getSites = () => {
    var options = [];
    this.state.company.sites.forEach(site => {
      options.push({ key: site.name, text: site.name, value: site.name });
    });
    return options;
  };

  getPopulations = () => {
    var options = [];
    if (this.state.populations) {
      this.state.populations.forEach(pop => {
        options.push({ key: pop.name, text: pop.name, value: pop.name });
      });
    }
    return options;
  };

  render() {
    return (
      <div>
        <Card fluid style={{ margin: `${scss.margin_large} 0px` }}>
          <Card.Content>
            <Card.Header> {this.state.company.name} </Card.Header>
            <Card.Meta>
              <span className="date">
                Dernière réponse le {this.date(this.state.company.lastUpdate)}
              </span>
            </Card.Meta>
          </Card.Content>
          <Card.Content>
            <Form>
              <Form.Group>
                <Form.Select
                  fluid
                  label="Site"
                  name="selectedSite"
                  onChange={this.handleChange}
                  options={this.getSites()}
                  placeholder="Site"
                />
                <Form.Select
                  fluid
                  label="Population"
                  onChange={this.handleChangePop}
                  options={this.getPopulations()}
                  placeholder="Population"
                />
              </Form.Group>
            </Form>
          </Card.Content>
          <Card.Content extra>
            <ShowAnswers
              company={this.state.company}
              siteIndex={this.state.siteIndex}
              populationIndex={this.state.populationIndex}
            />
            <Export company={this.state.company} topics={this.state.topics} />
          </Card.Content>
        </Card>
      </div>
    );
  }
}
