import React, { Component } from 'react'
import { Accordion, Icon, Container, Message } from 'semantic-ui-react'
import Cell from './Cell'

export default class AccordionExampleFluid extends Component {

  change = (i, j, name, value) => {
    this.props.change(i, j, name, value)
  }

  render() {
    const { topics, index, ChangeState, accordionStates, form} = this.props

    return (
      <Accordion fluid>
        {topics[index].subTopics.map((e, i) => (
            <Container key={e.name}>
                <Accordion.Title active={accordionStates[index][i] === 1} onClick={(e) => ChangeState(index, i)}>
                    <h3><Icon name='dropdown' />{e.name}</h3>
                </Accordion.Title>
                <Accordion.Content active={accordionStates[index][i] === 1}>
                  <Message info header={form[index].subTopics[i].subTitle} content={form[index].subTopics[i].details}/>
                  <Cell topics={topics} i={index} j={i} change={this.change}></Cell>
                </Accordion.Content>
            </Container>
        ))}
      </Accordion>
    )
  }
}
