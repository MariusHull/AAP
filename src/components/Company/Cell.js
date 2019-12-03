import React, { Component } from "react";
import {
  Container,
  Form,
  Radio,
  TextArea,
  Icon,
  Popup,
  Button,
  Card,
  Input,
  Select,
  Checkbox
} from "semantic-ui-react";
import scss from "../../global.scss";

const checkboxPresence = ["Jamais", "Parfois", "Souvent", "Toujours"];
const checkboxIntesity = ["Non concernée", "Faible", "Modérée", "Elevée"];
const checkboxUrgencyLevel = [
  "Très peu urgente",
  "Peu urgente",
  "Urgente",
  "Très urgente"
];
const colors = ["green", "yellow", "orange", "red"];

export default class Cell extends Component {
  handleChange = (e, { name, value }) => {
    this.props.change(this.props.i, this.props.j, name, value);
  };

  handleChangeAction = (e, { name, value }, k) => {
    console.log(e, name, value, k);
    this.props.changeAction(this.props.i, this.props.j, name, value, k);
  };

  handleDeleteAction = (k) => {
    this.props.changeDeleteAction(this.props.i, this.props.j, k);
  }

  render() {
    const { topics, i, j } = this.props;
    const subTopic = topics[i].subTopics[j];

    return (
      <Container style={{ marginBottom: "10px" }}>
        <Form>
          <Form.Field
            id="form-textarea-control-opinion"
            control={TextArea}
            label="Vos situations concrètes"
            placeholder="Exemples"
            value={subTopic.data.situationsExamples}
            name="situationsExamples"
            onChange={this.handleChange}
          />
          <Form.Group inline widths="equal">
            <label>Fréquence</label>
            <Popup
              content="Fréquence du facteur de risque."
              trigger={
                <Icon
                  name="question circle outline"
                  size="large"
                  style={{ margin: "0 30px 0 0" }}
                />
              }
            />
            {checkboxPresence.map((e, k) => (
              <Form.Field
                key={e + String(i) + String(j)}
                control={Radio}
                label={e}
                value={k}
                name="presence"
                checked={subTopic.data.presence === k}
                onChange={this.handleChange}
              />
            ))}
          </Form.Group>
          <Form.Group inline widths="equal">
            <label>Intensité</label>
            <Popup
              content="Intensité du facteur de risque."
              trigger={
                <Icon
                  name="question circle outline"
                  size="large"
                  style={{ margin: "0 30px 0 0" }}
                />
              }
            />
            {checkboxIntesity.map((e, k) => (
              <Form.Field
                key={e + String(i) + String(j)}
                control={Radio}
                label={e}
                value={k}
                name="intensity"
                checked={subTopic.data.intensity === k}
                onChange={this.handleChange}
              />
            ))}
          </Form.Group>
          <Form.Group inline widths="equal">
            <label>Vos actions correctives et leurs caractéristiques</label>
          </Form.Group>
          {subTopic.data.actions &&
            subTopic.data.actions.map((action, l) => (
              <Card style={{ width: "100%" }}>
                <Card.Content>
                  <Card.Meta>
                    <Form.Group inline>
                      <label style={{ width: "50px" }}>{`Action ${l + 1}`}</label>
                      <Form.Field
                        control={TextArea}
                        id="form-textarea-control-opinion"
                        value={action.name}
                        placeholder="Libellé de l'action"
                        name="name"
                        onChange={(e, d) => this.handleChangeAction(e, d, l)}
                        style={{ height: "41px" }}
                        width={14}
                      />
                      <button 
                        className="negative ui button" 
                        style={{ height: "38px", width: "auto", padding : "8px" }}
                        onClick={() => this.handleDeleteAction(l)}>
                      <i class="disabled close icon" style={{ margin: "0px"}}></i>
                      </button>
                    </Form.Group>
                    <Form.Group inline>
                      <label>Degré d'urgence de l'action</label>
                      {checkboxUrgencyLevel.map((e, k) => (
                        <Form.Field
                          style={{ marginLeft: "3vw" }}
                          key={
                            e + String(i) + String(j) + String(l) + String(k)
                          }
                          control={Checkbox}
                          label={e}
                          value={k}
                          name={`emergency`}
                          checked={action.emergency === k}
                          onChange={(e, d) => this.handleChangeAction(e, d, l)}
                        />
                      ))}
                    </Form.Group>
                    <Form.Group inline widths="equal">
                      <Form.Field
                        id="form-textarea-control-opinion"
                        control={TextArea}
                        label="Action(s) déjà existante(s)"
                        value={action.alreadyExisting}
                        name="alreadyExisting"
                        placeholder="Description"
                        onChange={(e, d) => this.handleChangeAction(e, d, l)}
                        style={{ height: "41px" }}
                      />
                      <Form.Field
                        id="form-textarea-control-opinion"
                        control={TextArea}
                        label="Action(s) retenue(s)"
                        value={action.new}
                        name="new"
                        placeholder="Description"
                        onChange={(e, d) => this.handleChangeAction(e, d, l)}
                        style={{ height: "41px" }}
                      />
                      <Form.Field
                        id="form-textarea-control-opinion"
                        control={TextArea}
                        label="Délais de réalisation"
                        value={action.timeLimit}
                        name="timeLimit"
                        placeholder="..."
                        onChange={(e, d) => this.handleChangeAction(e, d, l)}
                        style={{ height: "41px" }}
                      />
                      <Form.Field
                        id="form-textarea-control-opinion"
                        control={TextArea}
                        label="Personne(s) en charge"
                        value={action.inCharge}
                        name="inCharge"
                        placeholder="..."
                        onChange={(e, d) => this.handleChangeAction(e, d, l)}
                        style={{ height: "41px" }}
                      />
                    </Form.Group>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          <Form.Group>
            <Button
              primary
              icon
              fluid
              style = {{ backgroundColor: "#52768F" }}
              onClick={() => this.props.newAction(i, j)}
            >
              Ajouter une action
            </Button>
          </Form.Group>
          <Form.Field
            id="form-textarea-control-opinion"
            control={TextArea}
            label="Commentaires"
            value={subTopic.data.comment}
            name="comment"
            placeholder="..."
            onChange={this.handleChange}
          />
        </Form>
      </Container>
    );
  }
}
