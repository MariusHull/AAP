import React from "react";
import ReactExport from "../../react-data-export";
import { Button, Icon } from "semantic-ui-react";
import { url } from "../../config";
import axios from "axios";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class Export extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSetPage1: [
        {
          columns: [
            {
              title:
                "Document généré automatiquement par le site alteralliancesolutionduer.com"
            }
          ],
          data: [[{ value: " " }]]
        },
        {
          xSteps: 0, // Will start putting cell with 1 empty cell on left most
          ySteps: 1, //will put space of 5 rows,
          columns: [
            { title: "Thèmes", width: { wch: 30 } },
            { title: "Sous-thèmes", width: { wch: 30 } },
            { title: "Exemples de situations", width: { wch: 22 } },
            { title: "Présence du risque", width: { wch: 17 } },
            { title: "Intensité du risque", width: { wch: 17 } },
            { title: "Commentaires", width: { wch: 25 } },
            { title: "Action corrective", width: { wch: 20 } },
            { title: "Degré d'urgence de l'action", width: { wch: 24 } },
            { title: "Actions déjà existantes", width: { wch: 30 } },
            { title: "Actions retenues", width: { wch: 25 } },
            { title: "Délais de réalisation", width: { wch: 21 } },
            { title: "Personne chargée du suivi", width: { wch: 25 } }
          ],
          data: []
        }
      ]
    };
  }

  color = value => {
    switch (value) {
      case -1:
        return {};
      case 0:
        return {
          fill: {
            patternType: "solid",
            fgColor: { rgb: "FFC7D6A0" }
          }
        };
      case 1:
        return {
          fill: {
            patternType: "solid",
            fgColor: { rgb: "FFF1EF7D" }
          }
        };
      case 2:
        return {
          fill: {
            patternType: "solid",
            fgColor: { rgb: "FFF1C295" }
          }
        };
      case 3:
        return {
          fill: {
            patternType: "solid",
            fgColor: { rgb: "FFD09996" }
          }
        };
      default:
        break;
    }
  };

  componentDidMount() {
    const { dataSetPage1 } = this.state;
    axios.defaults.headers.common["Authorization"] =
      "JWT " + localStorage.getItem("jwtToken");
    axios.get(`${url}/api/companies/${this.props.company._id}`).then(r => {
      let topics =
        r.data.sites[this.props.siteIndex].populations[
          this.props.populationIndex
        ].topics;
      topics.forEach(theme => {
        theme.subTopics.forEach(sousTheme => {
          if (sousTheme.data.actions.length > 0) {
            sousTheme.data.actions.forEach((action, index) => {
              let line = [];
              if (index === 0) {
                line.push({
                  value: theme.name,
                  style: { alignment: { wrapText: true } }
                });
                line.push({
                  value: sousTheme.name,
                  style: { alignment: { wrapText: true } }
                });
                line.push({
                  value: sousTheme.data.situationsExamples,
                  style: { alignment: { wrapText: true } }
                });
                line.push({
                  value: "",
                  style: this.color(sousTheme.data.presence)
                }); // TODO : handle colors
                line.push({
                  value: "",
                  style: this.color(sousTheme.data.intensity)
                });
                line.push({
                  value: sousTheme.data.comment,
                  style: { alignment: { wrapText: true } }
                });
              } else {
                line.push({ value: " " });
                line.push({ value: " " });
                line.push({ value: " " });
                line.push({ value: " " });
                line.push({ value: " " });
                line.push({ value: " " });
              }
              line.push({
                value: action.name,
                style: { alignment: { wrapText: true } }
              });
              line.push({
                value: "",
                style: this.color(action.emergency)
              });
              line.push({
                value: action.alreadyExisting,
                style: { alignment: { wrapText: true } }
              });
              line.push({
                value: action.new,
                style: { alignment: { wrapText: true } }
              });
              line.push({
                value: action.timeLimit,
                style: { alignment: { wrapText: true } }
              });
              line.push({
                value: action.inCharge,
                style: { alignment: { wrapText: true } }
              });

              dataSetPage1[1].data.push(line);
            });
          } else {
            let line = [];
            line.push({
              value: theme.name,
              style: { alignment: { wrapText: true } }
            });
            line.push({
              value: sousTheme.name,
              style: { alignment: { wrapText: true } }
            });
            line.push({
              value: sousTheme.data.situationsExamples,
              style: { alignment: { wrapText: true } }
            });
            line.push({
              value: "",
              style: this.color(sousTheme.data.presence)
            }); // TODO : handle colors
            line.push({
              value: "",
              style: this.color(sousTheme.data.intensity)
            });
            line.push({
              value: sousTheme.data.comment,
              style: { alignment: { wrapText: true } }
            });
            dataSetPage1[1].data.push(line);
          }
        });
      });
      console.log("topics : ", topics, this.props.populationIndex);
      this.setState({
        sites: r.data.sites,
        topics: topics,
        dataSetPage1
      });
      //console.log(r.data);
    });
  }

  render() {
    const { dataSetPage1 } = this.state;

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
      </ExcelFile>
    );
  }
}
