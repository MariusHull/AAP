import React, { Component } from 'react'
import {Container, Form, Button, Radio, TextArea} from 'semantic-ui-react'

const checkboxPresence= ["Jamais", "Parfois",	"Souvent", "Toujours"];
const checkboxIntesity= ["Non concernée", "Faible", "Modérée", "Elevée"];
const checkboxUrgencyLevel= ["Très peu urgente", "Peu urgente", "Urgente", "Très urgente"];

export default class Cell extends Component {

  constructor(props) {
    super(props);
    this.state = {
      upToDate: true
    }
  }

  handleChange = (e, {name, value}) => {
    this.props.change(this.props.i, this.props.j, name, value)
    this.setState({upToDate: false})
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({upToDate: true})
    }
  }

  render() {
    const { topics, i, j} = this.props
    const subTopic = topics[i].subTopics[j]

    return (
        <Container>
              <Form>
              <Form.Field
                  id='form-textarea-control-opinion'
                  control={TextArea}
                  label='Exemples de situation'
                  placeholder='Exemples'
                  value={subTopic.data.situationsExamples}
                  name = 'situationsExamples'
                  onChange={this.handleChange}
                />
              <Form.Group inline>
                <label>Presence</label>
                {checkboxPresence.map((e, k) => (
                  <Form.Field
                  key={e+String(i)+String(j)}
                  control={Radio}
                  label={e}
                  value={k}
                  name="presence"
                  checked={subTopic.data.presence === k}
                  onChange={this.handleChange}
                  />
                ))}
              </Form.Group>
              <Form.Group inline>
                <label>Intensité</label>
                {checkboxIntesity.map((e, k) => (
                  <Form.Field
                  key={e+String(i)+String(j)}
                  control={Radio}
                  label={e}
                  value={k}
                  name="intensity"
                  checked={subTopic.data.intensity === k}
                  onChange={this.handleChange}
                  />
                ))}
              </Form.Group>
              <Form.Field
                  id='form-textarea-control-opinion'
                  control={TextArea}
                  label='Actions correctives'
                  value={subTopic.data.correctiveActions}
                  placeholder='Exemples'
                  name='correctiveActions'
                  onChange={this.handleChange}
                />
              <Form.Group inline>
                <label>Degré d'urgence de l'action</label>
                {checkboxUrgencyLevel.map((e, k) => (
                  <Form.Field
                  key={e+String(i)+String(j)}
                  control={Radio}
                  label={e}
                  value={k}
                  name="urgencyLevel"
                  checked={subTopic.data.urgencyLevel === k}
                  onChange={this.handleChange}
                  />
                ))}
              </Form.Group>
              <Form.Group inline widths='equal'>
              <Form.Field
                  id='form-textarea-control-opinion'
                  control={TextArea}
                  label='Actions déjà existantes'
                  value={subTopic.data.existingActions}
                  name='existingActions'
                  placeholder='Actions...'
                  onChange={this.handleChange}
                />
              <Form.Field
                  id='form-textarea-control-opinion'
                  control={TextArea}
                  label='Actions retenues'
                  value={subTopic.data.selectedActions}
                  name='selectedActions'
                  placeholder='Actions...'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group inline widths='equal'>
              <Form.Field
                  id='form-textarea-control-opinion'
                  control={TextArea}
                  label='Délais de réalisation'
                  value={subTopic.data.timeLimit}
                  name='timeLimit'
                  placeholder=''
                  onChange={this.handleChange}
                />
              <Form.Field
                  id='form-textarea-control-opinion'
                  control={TextArea}
                  label='Personnes en charge'
                  value={subTopic.data.inCharge}
                  name='inCharge'
                  placeholder='...'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Field
                  id='form-textarea-control-opinion'
                  control={TextArea}
                  label='Commentaires'
                  value={subTopic.data.comment}
                  name='comment'
                  placeholder='...'
                  onChange={this.handleChange}
                />
                <Form.Field right
                  id='form-button-control-public'
                  control={Button}
                  content='Confirm'
                />
              </Form>
        </Container>
    )}
}
