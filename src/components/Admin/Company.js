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
      company: { name: "", lastUpdate: new Date(), sites: [] }
    };
  }

  componentDidMount = () => {
    if (
      !(localStorage.getItem("jwtToken") && localStorage.getItem("level") >= 1)
    ) {
      this.props.history.push("/login");
    }
    axios.defaults.headers.common["Authorization"] =
      "JWT " + localStorage.getItem("jwtToken");
    axios
      .get(`http://localhost:3001/api/companies/${this.props.companyId}`)
      .then(company => {
        this.setState({
          company: company.data[0]
        });
      })
      .catch(error => {
        if (error) {
          this.props.history.push("/login");
        }
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
      options.push({ key: site.name, text: site.name, value: 1 });
    });
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
                  options={this.getSites()}
                  placeholder="Site"
                />
                <Form.Select
                  fluid
                  label="Population"
                  options={[
                    { key: "1", text: "Population 1", value: 1 },
                    { key: "2", text: "Population 2", value: 2 }
                  ]}
                  placeholder="Population"
                />
              </Form.Group>
            </Form>
          </Card.Content>
          <Card.Content extra>
            <ShowAnswers company={this.state.company} />
            <Export company={this.state.company} />
          </Card.Content>
        </Card>
      </div>
    );
  }
}
