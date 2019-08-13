import React, { Component } from 'react'
import { Accordion, Icon, Container, Message } from 'semantic-ui-react'
import Cell from './Cell'

export default class AccordionExampleFluid extends Component {

  change = (i, j, name, value) => {
    this.props.change(i, j, name, value)
  }

  render() {
    const { topics, index, ChangeState, selected, form, newAction, changeAction, change} = this.props

    return (
      <Accordion fluid>
        {topics[index] && topics[index].subTopics.map((e, i) => (
            <Container key={e._id}>
                <Accordion.Title active={selected && selected[0] === index && selected[1] === i} onClick={(e) => ChangeState(index, i)}>
                    <h3><Icon name='dropdown' />{e.name}</h3>
                </Accordion.Title>
                <Accordion.Content active={selected && selected[0] === index && selected[1] === i}>
                  {form[index] && form[index].subTopics[i] && form[index].subTopics[i].subTitle && form[index].subTopics[i].details && <Message info header={form[index].subTopics[i].subTitle} content={form[index].subTopics[i].details}/>}
                  <Cell topics={topics} i={index} j={i} change={change} changeAction={changeAction} newAction = {newAction}></Cell>
                </Accordion.Content>
            </Container>
        ))}
      </Accordion>
    )
  }
}
