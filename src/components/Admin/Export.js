import React from "react";
import ReactExport from "react-data-export";
import { Button, Icon } from "semantic-ui-react";
import { url } from "../../config";
import axios from "axios";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class Export extends React.Component {
  componentDidMount() {
    axios.defaults.headers.common["Authorization"] =
      "JWT " + localStorage.getItem("jwtToken");
    axios.get(`${url}/api/companies/${this.props.company._id}`).then(r => {
      console.log(
        r.data.sites[this.props.siteIndex].populations[
          this.props.populationIndex
        ],
        this.props.populationIndex
      );
      this.setState({
        sites: r.data.sites,
        topics:
          r.data.sites[this.props.siteIndex].populations[
            this.props.populationIndex
          ].topics
      });
      console.log(r.data);
    });
  }

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
            Télécharger au format xslx
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
