import React from "react";
import ReactExport from "react-data-export";

import { Button, Modal, Icon, Container } from "semantic-ui-react";
import { url } from "../../config";
import axios from "axios";
import Export from "./Export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class ExportContent extends React.Component {
  state = { modalOpen: false };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    return (
      <>
        <Modal
          open={this.state.modalOpen}
          onClose={this.handleClose}
          size={"tiny"}
          trigger={
            <Button
              onClick={this.handleOpen}
              icon
              positive
              labelPosition="right"
              style={{
                margin: "10px",
                textAlign: "center"
              }}
              disabled={
                this.props.siteIndex === null ||
                this.props.populationIndex === null
              }
            >
              Télécharger les résultats
              <Icon name="download" />
            </Button>
          }
        >
          <Modal.Header>
            <Container>
              <div>Télécharger les résultats</div>

              <Button
                onClick={this.handleClose}
                primary
                style={{ position: "absolute", right: "10px", top: "15px" }}
              >
                <Icon name="x icon" />
              </Button>
            </Container>
          </Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <div style={{ width: "8vw" }}>
                <Export
                  company={this.props.company}
                  topics={this.state.topics}
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
