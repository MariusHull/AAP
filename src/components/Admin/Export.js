import React from "react";
import ReactExport from "react-data-export";
import { Button, Icon } from "semantic-ui-react";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class Export extends React.Component {
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
          { title: "Thèmes" },
          { title: "Sous-thèmes" },
          { title: "Thèmes" },
          { title: "Exemples de situations" },
          { title: "Présence du risque" },
          { title: "Intensité du risque" },
          { title: "Actions correctives" },
          { title: "Degré d'urgence de l'action", width: { wch: 40 } },
          { title: "Actions déjà existantes", width: { wch: 40 } },
          { title: "Actions retenues" },
          { title: "Délais de réalisation" },
          { title: "Personne en charge du suivi" },
          { title: "Commentaires" }
        ],
        data: [
          [
            {
              value: this.props.company.name,
              style: { font: { sz: "12", bold: true } }
            },
            { value: this.props.company._id }
          ]
        ]
      }
    ];

    const now = new Date();
    const title = `${
      this.props.company.name
    }_${now.getDate()}/${now.getMonth() +
      1}/${now.getFullYear()}@${now.getHours()}:${now.getMinutes()}`;
    return (
      <ExcelFile
        filename={title}
        element={
          <Button icon positive labelPosition="right">
            Télécharger les réponses
            <Icon name="download" />
          </Button>
        }
      >
        <ExcelSheet dataSet={dataSetPage1} name="Feuille 1" />
        <ExcelSheet data={dataSet1} name="Feuille 2">
          <ExcelColumn label="Name" value="name" />
          <ExcelColumn label="Id" value="id" />
        </ExcelSheet>
      </ExcelFile>
    );
  }
}
