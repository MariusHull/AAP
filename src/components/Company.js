import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import ShowAnswers from "./ShowAnswers";
import scss from "../global.scss";
import Export from "./Export";

export default class Company extends Component {
  date = date => {
    if (date) {
      var d = new Date(date);
      return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
    } else return "";
  };

  render() {
    return (
      <div>
        <Card fluid style={{ margin: `${scss.margin_large} 0px` }}>
          <Card.Content>
            <Card.Header> {this.props.company.name} </Card.Header>
            <Card.Meta>
              <span className="date">
                Dernière réponse le {this.date(this.props.company.lastUpdate)}
              </span>
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <ShowAnswers company={this.props.company} />
            <Export company={this.props.company} />
          </Card.Content>
        </Card>
      </div>
    );
  }
}
