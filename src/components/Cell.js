import React, { Component } from 'react'
import {Container, Form, Button, Radio, TextArea, FeedLabel} from 'semantic-ui-react'

const value=0;

export default class Cell extends Component {

  handleChange = () => {
    this.props.change()
  }

  render() {
    const { subject } = this.props

    return (
        <Container>
              <h3>{subject}</h3>
              <Form>
              <Form.Field
                  id='form-textarea-control-opinion'
                  control={TextArea}
                  label='Exemples de situation'
                  placeholder='Exemples'
                  onChange={this.props.change}
                />
              <Form.Group inline>
                <label>Presence</label>
                <Form.Field
                  control={Radio}
                  label='Jamais'
                  value='1'
                  checked={value === '1'}
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Radio}
                  label='Parfois'
                  value='2'
                  checked={value === '2'}
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Radio}
                  label='Souvent'
                  value='3'
                  checked={value === '3'}
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Radio}
                  label='Toujours'
                  value='3'
                  checked={value === '3'}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group inline>
                <label>Intensité</label>
                <Form.Field
                  control={Radio}
                  label='Non concernée'
                  value='1'
                  checked={value === '1'}
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Radio}
                  label='Faible'
                  value='2'
                  checked={value === '2'}
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Radio}
                  label='Modérée'
                  value='3'
                  checked={value === '3'}
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Radio}
                  label='Elevée'
                  value='3'
                  checked={value === '3'}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Field
                  id='form-textarea-control-opinion'
                  control={TextArea}
                  label='Actions correctives'
                  placeholder='Exemples'
                  height='20px'
                />
              <Form.Group inline>
                <label>Degré d'urgence de l'action</label>
                <Form.Field
                  control={Radio}
                  label='Très peu urgente'
                  value='1'
                  checked={value === '1'}
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Radio}
                  label='Peu urgente'
                  value='2'
                  checked={value === '2'}
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Radio}
                  label='Urgente'
                  value='3'
                  checked={value === '3'}
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Radio}
                  label='Très urgente'
                  value='3'
                  checked={value === '3'}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group inline widths='equal'>
              <Form.Field
                  id='form-textarea-control-opinion'
                  control={TextArea}
                  label='Actions déjà existantes'
                  placeholder='Actions...'
                />
              <Form.Field
                  id='form-textarea-control-opinion'
                  control={TextArea}
                  label='Actions retenues'
                  placeholder='Actions...'
                />
              </Form.Group>
              <Form.Group inline widths='equal'>
              <Form.Field
                  id='form-textarea-control-opinion'
                  control={TextArea}
                  label='Délais de réalisation'
                  placeholder=''
                />
              <Form.Field
                  id='form-textarea-control-opinion'
                  control={TextArea}
                  label='Personnes en charge'
                  placeholder='...'
                />
              </Form.Group>
              <Form.Field
                  id='form-textarea-control-opinion'
                  control={TextArea}
                  label='Commentaires'
                  placeholder='...'
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
