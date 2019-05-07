import React, { Component } from "react";
import {
  Button,
  Divider,
  Grid,
  Image,
  Segment,
  Dropdown,
  Input,
  Label,
  Container,
  Dimmer,
  Loader,
  Icon,
  Step,
  Table,
  Comment,
  Form,
  Header,
  Statistic,
  List, 
  TextArea, 
  Select,
  Radio,
  Menu
} from "semantic-ui-react";

import AccordionExampleFluid from "./AccordionTheme"

const struct = [
  {
    theme: "Intensité et complexité du travail",
    sub_themes: [
      "Les contraintes de rythmes de travail",
      "La précision des objectifs de travail",
      "L'adéquation des objectifs de travail avec les moyens alloués et les responsabilités exercées", 
      "La compatibilité des instructions de travail entre elles",
      "La modalité d'organisation de la polyvalence",
      "Les interruptions perturbatrices au cours du travail",
      "Les niveaux d'attention et de vigilance requis dans le travail"],
  },
  {
    theme: "Horaires de travail",
    sub_themes: [
      "La durée hebdomadaire du travail",
      "Le travail en horaires atypiques",
      "L'extension de la disponibilité en dehors des horaires de travail",
      "La prévisibilité des horaires de travail et anticipation de leur changement",
      "La conciliation entre vie professionnelle et vie personnelle"]
  },
  {
    theme: "Exigences émotionnelles",
    sub_themes: [
      "Les tensions avec le public",
      "La confrontation à la souffrance d'autrui",
      "La maitrise des émotions (faire bonne figure)"]
  }, 
  {
    theme: "Autonomie au travail", 
    sub_themes: [
      "L'autonomie dans la tâche",
      "L'autonomie temporelle",
      "L'utilisation et le développement des compétences"]
  },
  {
    theme: "Rapports sociaux au travail",
    sub_themes: [
      "Le soutien de la part des collègues", 
      "Le soutien de la part des supérieurs hiérarchiques",
      "Les violences internes au travail",
      "La reconnaissance dans le travail"]
  },
  {
    theme: "Conflits de valeurs",
    sub_themes: [
      "La qualité empêchée",
      "L'utilité du travail"]
  },
  {
    theme: "Insécurité de l'emploi et du travail",
    sub_themes: [
      "L'insécurité/la sécurité socio-économique",
      "La conduite du changement"]
  }
  ]

const questions = [{title : 'Thème 1', 
    sub_themes : [{title : 'Sous-thème 1', questions : ["J'ai besoin d'écrire une question très longue pour voir ce que ça fait dans les items de ma liste... Est-ce que ça va bien se passer ??", "q2", "q3", "q4"]}, 
        {title : 'Sous-thème 2', questions : ["q1", "q2", "q3", "q4"]}]},
    {title : 'Thème 2', 
        sub_themes : [{title : 'Sous-thème 1', questions : ["q1", "q2", "q3", "q4"]}, 
            {title : 'Sous-thème 2', questions : ["q1", "q2", "q3", "q4"]}]}];

let value =1;

let index = 0;

export default class Survey extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: 0,
      AccordionStates: [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0, 0], [0, 0], [0, 0]],
      saved: true
    };
  }

  ChangeState = (i,j) => {
    var {AccordionStates} = this.state;
    AccordionStates[i][j] = (AccordionStates[i][j]+1)%2
    this.setState({AccordionStates})
    console.log(this.state)
  }

  handleItemClick = (e, i) => {
    this.setState({ activeItem: i })
    console.log(this.state.activeItem)
  }

  change = () => this.setState({saved:false})

  save = () => this.setState({saved:true})

  next = () => this.setState({activeItem: this.state.activeItem+1})

  previous = () => this.setState({activeItem: this.state.activeItem-1})

  render() {

    const { activeItem, saved} = this.state

    return (
      <Container style={{width:'70%', margin: '100px auto 0 auto'}}>
      <div>
        <Menu attached='top' tabular>
          {struct.map((e, i) => (
            <Menu.Item active={activeItem === i} onClick={e => this.handleItemClick(e, i)} style={{width:'14.28%', textAlign: 'center'}}>
              {e.theme}
            </Menu.Item>
          ))}
        </Menu>
        <Segment attached='bottom' style={{height:'60vh',overflowY: 'scroll'}}>
          <AccordionExampleFluid struct={struct} index={activeItem} ChangeState={this.ChangeState} AccordionStates={this.state.AccordionStates} change={this.change}></AccordionExampleFluid>
        </Segment>
      </div>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <Button icon labelPosition='left' style={{width:'15%', margin:'10px', textAlign:'center'}} disabled={activeItem===0} onClick={this.previous}>
          <Icon name='left arrow' />
          Précedent
        </Button>
        <Button icon positive labelPosition='right' style={{width:'15%', margin:'10px', textAlign:'center'}} disabled={saved} onClick={this.save}>
          Enregistrer
          <Icon name='save outline' />
        </Button>
        <Button icon labelPosition='right' style={{width:'15%', margin:'10px', textAlign:'center'}} disabled={activeItem===struct.length-1} onClick={this.next}>
          Suivant
          <Icon name='right arrow' />
        </Button>
      </div>
      </Container>
    );
  }
}
