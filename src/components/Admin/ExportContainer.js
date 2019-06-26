import React from "react";
import ReactExport from "react-data-export";
import { Button, Icon } from "semantic-ui-react";
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
    const dataSet1 = [
      {
        name: this.props.company.name,
        id: this.props.company._id
      }
    ];

    const dataSetPage1 = [
      {
        columns: [
          { title: "Thèmes", width: { wch: 15 } },
          { title: "Sous-thèmes", width: { wch: 15 } },
          { title: "Exemples de situations", width: { wch: 22 } },
          { title: "Présence du risque", width: { wch: 20 } },
          { title: "Intensité du risque", width: { wch: 20 } },
          { title: "Actions correctives", width: { wch: 20 } },
          { title: "Degré d'urgence de l'action", width: { wch: 30 } },
          { title: "Actions déjà existantes", width: { wch: 30 } },
          { title: "Actions retenues", width: { wch: 20 } },
          { title: "Délais de réalisation", width: { wch: 30 } },
          { title: "Personne chargée du suivi", width: { wch: 28 } },
          { title: "Commentaires", width: { wch: 15 } }
        ],
        data: [
          [
            {
              value: this.props.company.name,
              style: { font: { sz: "12", bold: true } }
            },
            { value: this.props.company._id },
            { value: this.props.company._id },
            { value: this.props.company._id },
            { value: this.props.company._id },
            { value: this.props.company._id },
            { value: this.props.company._id },
            { value: this.props.company._id },
            { value: this.props.company._id },
            { value: this.props.company._id },
            { value: this.props.company._id },
            { value: this.props.company._id }
          ]
        ]
      }
    ];

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
              positive
              labelPosition="right"
              disabled={
                this.props.siteIndex === null ||
                this.props.populationIndex === null
              }
            >
              Télécharger les réponses
              <Icon name="download" />
            </Button>
          }
        >
          <Modal.Header>
            <Container>
              <div>Télécharger</div>

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
