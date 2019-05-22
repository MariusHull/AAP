import React, { Component } from "react";
import { Button, Modal, Icon } from "semantic-ui-react";

import ContentSurvey from "./ContentSurvey";

export default class ShowAnswers extends Component {
  state = { modalOpen: false };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    return (
      <>
        <Modal
          open={this.state.modalOpen}
          onClose={this.handleClose}
          size={"large"}
          trigger={
            <Button onClick={this.handleOpen} icon labelPosition="right">
              Voir les réponses
              <Icon name="eye" />
            </Button>
          }
        >
          <Modal.Header> {this.props.company.name} </Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <div style={{ width: "78vw" }}>
                <ContentSurvey id={this.props.company._id} />
              </div>
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
