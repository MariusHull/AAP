import React, { Component } from "react";
import {
  Button,
  Divider,
  Image,
  Modal,
  Icon,
  Tab,
  Header
} from "semantic-ui-react";

import ContentSurvey from "./ContentSurvey";

export default class ShowAnswers extends Component {
  state = { modalOpen: false };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    const panes = [
      {
        menuItem: "Intensité de travail",
        render: () => (
          <Tab.Pane attached={false}>
            {" "}
            <Header as="h3">Les contraintes de rythme de travail</Header>
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            <Divider section />
            <Header as="h3">La précision des objectifs de travail</Header>
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Horaire de travail",
        render: () => (
          <Tab.Pane attached={false}>
            <Header as="h3">Sous thème 1</Header>
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Exigeances émotionnelles",
        render: () => (
          <Tab.Pane attached={false}>
            <Header as="h3">Encore un sous thème</Header>
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Tab.Pane>
        )
      }
    ];

    return (
      <>
        <Modal
          open={this.state.modalOpen}
          onClose={this.handleClose}
          trigger={
            <Button onClick={this.handleOpen} icon labelPosition="right">
              Voir les réponses
              <Icon name="eye" />
            </Button>
          }
        >
          <Modal.Header>Allianz</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <ContentSurvey id={this.props.id} />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.handleClose} primary>
              Revenir à la page principale <Icon name="right chevron" />
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}
