import React, { Component } from 'react'
import { Accordion, Icon, Container } from 'semantic-ui-react'
import Cell from './Cell'

export default class AccordionExampleFluid extends Component {

  render() {
    const { struct, index, ChangeState, AccordionStates} = this.props

    return (
      <Accordion fluid>
        {struct[index].sub_themes.map((e, i) => (
            <Container key={e}>
                <Accordion.Title active={AccordionStates[index][i] === 1} onClick={(e) => ChangeState(index, i)}>
                    <h3><Icon name='dropdown' />{e}</h3>
                </Accordion.Title>
                <Accordion.Content active={AccordionStates[index][i] === 1}>
                    <p>
                        <Cell subject={struct[index][i]} change={this.props.change}></Cell>
                    </p>
                </Accordion.Content>
            </Container>
        ))}
      </Accordion>
    )
  }
}
