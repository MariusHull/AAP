import React, { Component } from "react";
import {
  Accordion,
  Button,
  Divider,
  Grid,
  Image,
  Modal,
  Segment,
  Dropdown,
  Input,
  Card,
  Label,
  Container,
  Dimmer,
  Loader,
  Icon,
  Step,
  Table,
  Comment,
  Form,
  Header,
  Statistic
} from "semantic-ui-react";
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
              Télécharger les réponses sous excel
              <Icon name="download" />
            </Button>
          </Card.Content>
        </Card>
      </div>
    );
  }
}
