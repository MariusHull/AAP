import React, { Component } from "react";
import { Button, Modal, Icon, Container } from "semantic-ui-react";

import ContentSurvey from "../Company/ContentSurvey";

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
            <Button
              onClick={this.handleOpen}
              icon
              labelPosition="right"
              disabled={
                this.props.siteIndex === null ||
                this.props.populationIndex === null
              }
            >
              Voir les réponses
              <Icon name="eye" />
            </Button>
          }
        >
          <Modal.Header>
            <Container>
              <div>{this.props.company.name}</div>

              <Button
                onClick={this.handleClose}
                primary
                style={{ position: "absolute", right: "10px", top: "15px" }}
              >
                Revenir à la page principale <Icon name="right chevron" />
              </Button>
            </Container>
          </Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <div style={{ width: "78vw" }}>
                <ContentSurvey
                  id={this.props.company._id}
                  siteIndex={this.props.siteIndex}
                  populationIndex={this.props.populationIndex}
                />
              </div>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </>
    );
  }
}
