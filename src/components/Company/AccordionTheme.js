import React, { Component } from 'react'
import { Accordion, Icon, Container, Message, Modal, Button, Header, Form } from 'semantic-ui-react'
import Cell from './Cell'

export default class AccordionExampleFluid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      newName: "",
      targetPop: null
    };
  }

  change = (i, j, name, value) => {
    this.props.change(i, j, name, value)
  }

  deleteFactor = (i) => {
    this.props.changeDeleteFactor(i, this.state.targetPop)
    this.setState({ modalOpen: false})
  }

  handleNameChange = (i) => {
    this.props.changeNameFactor(i, this.state.targetPop, this.state.newName)
    this.setState({ modalOpen: false})
  }
  
  changeName = (e) => {
    this.setState({newName: e.target.value})
  }

  render() {
    const { topics, index, ChangeState, selected, form, newAction, changeAction, changeDeleteAction, change} = this.props
    
    return (
      <Accordion fluid>
        {topics[index] && topics[index].subTopics.map((e, i) => (
            <Container key={e._id}>
                <Accordion.Title active={selected && selected[0] === index && selected[1] === i} onClick={(e) => ChangeState(index, i)}>
                    <h3><Icon name='dropdown' />{e.name}</h3>
                </Accordion.Title>
                <Accordion.Content active={selected && selected[0] === index && selected[1] === i}>
                <Modal
                  trigger={<button class="ui button" onClick={() => this.setState({ modalOpen: true, newName: e.name, targetPop: i})} >
                  <i class="disabled edit icon"></i> Modifier ce facteur de risque
                  </button>}
                  open={this.state.modalOpen}
                  onClose={() => this.setState({ modalOpen: false})}
                  style={{ width: "30%", marginTop: "5%" }}
                >
                  <Header icon="edit" content="Modifier ce facteur de risque" />
                  <Modal.Content>
                  <h5>Vous pouvez modifier le nom de ce facteur de risque ou bien le supprimer.</h5>
                    <Form>
                        <Form.Input
                          placeholder="Nom du facteur"
                          name="factorName"
                          value={this.state.newName}
                          onChange={(e) => this.changeName(e)}
                          style={{width:"100%"}}
                        />
                        <br/>
                        <div className="centerer">
                          <Form.Button content="Modifier" onClick={() => this.handleNameChange(index)} />
                        </div>
                    </Form>
                    <div className="ui divider"></div>
                    <div className="centerer">
                      <button className="negative ui button" id={i} onClick={() => this.deleteFactor(index)}>Supprimer ce facteur de risque</button>
                    </div>
                  </Modal.Content>
                </Modal>
                  {form[index] && form[index].subTopics[i] && form[index].subTopics[i].subTitle && form[index].subTopics[i].details && <Message info header={form[index].subTopics[i].subTitle} content={form[index].subTopics[i].details}/>}
                  <Cell topics={topics} i={index} j={i} change={change} changeAction={changeAction} changeDeleteAction={changeDeleteAction} newAction = {newAction}></Cell>
                </Accordion.Content>
            </Container>
        ))}
      </Accordion>
    )
  }
}
