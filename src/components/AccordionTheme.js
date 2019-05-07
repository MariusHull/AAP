import React, { Component } from 'react'
import { Accordion, Icon, Container } from 'semantic-ui-react'
import Cell from './Cell'

export default class AccordionExampleFluid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      upToDate: true
    }
  }

  change = (i, j, name, value) => {
    this.setState({upToDate: false})
    this.props.change(i, j, name, value)
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({upToDate: true})
    }
  }

  render() {
    const { topics, index, ChangeState, accordionStates} = this.props

    return (
      <Accordion fluid>
        {topics[index].subTopics.map((e, i) => (
            <Container key={e.name}>
                <Accordion.Title active={accordionStates[index][i] === 1} onClick={(e) => ChangeState(index, i)}>
                    <h3><Icon name='dropdown' />{e.name}</h3>
                </Accordion.Title>
                <Accordion.Content active={accordionStates[index][i] === 1}>
                    <p>
                        <Cell topics={topics} i={index} j={i} change={this.change}></Cell>
                    </p>
                </Accordion.Content>
            </Container>
        ))}
      </Accordion>
    )
  }
}
