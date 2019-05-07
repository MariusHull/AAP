import React, { Component } from "react";
import { Button, Card, Icon } from "semantic-ui-react";
import ShowAnswers from "./ShowAnswers";
import scss from "../global.scss";

export default class Company extends Component {
  render() {
    return (
      <div>
        <Card fluid style={{ margin: `${scss.margin_large} 0px` }}>
          <Card.Content>
            <Card.Header>Allianz</Card.Header>
            <Card.Meta>
              <span className="date">Dernière réponse le 01/05/2019</span>
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <ShowAnswers />
            <Button icon positive labelPosition="right">
              Télécharger les réponses
              <Icon name="download" />
            </Button>
          </Card.Content>
        </Card>
      </div>
    );
  }
}
