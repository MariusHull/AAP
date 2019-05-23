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

    return (
      <ExcelFile
        element={
          <Button icon positive labelPosition="right">
            Télécharger les réponses
            <Icon name="download" />
          </Button>
        }
      >
        <ExcelSheet data={dataSet1} name="Réponses au questionnaire">
          <ExcelColumn label="Name" value="name" />
          <ExcelColumn label="Id" value="id" />
        </ExcelSheet>
      </ExcelFile>
    );
  }
}
