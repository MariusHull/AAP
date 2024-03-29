import React, { Component } from "react";
import { Button, Modal, Icon, Container } from "semantic-ui-react";
import "../../App.css"
import { Link } from "react-router-dom";

import ContentSurvey from "../Company/ContentSurvey";

export default class ShowAnswers extends Component {
  state = { modalOpen: false };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  redirect = (id, site, pop) => {
    console.log(id)
    window.location.href =  `/admin/survey/${id}/${site},${pop}`;
  }

  render() {
    return (
      <>
        <Modal
          open={this.state.modalOpen}
          onClose={this.handleClose}
          centered={true}
          size={"fullscreen"}
          trigger={
            <Button
              // onClick={this.handleOpen}
              onClick={() => this.redirect(this.props.company._id, this.props.siteIndex, this.props.populationIndex)}
              icon
              labelPosition="right"
              disabled={
                this.props.siteIndex === null ||
                this.props.populationIndex === null
              }
            >
              Consulter les données
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
                className="aablue"
                style={{ position: "absolute", right: "10px", top: "15px" }}
              >
                Revenir à la page principale <Icon name="right chevron" />
              </Button>
            </Container>
          </Modal.Header>
          <Modal.Content
          className="modalrep"
          image>
            <Modal.Description>
              <div style={{ width: "88vw", height: "85vh", margin: "auto" }}>
                <ContentSurvey
                  className="modalrep"
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
