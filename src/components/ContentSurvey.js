import React, { Component } from "react";
import {
  Button,
  Segment,
  Container,
  Icon,
  Menu,
  Popup
} from "semantic-ui-react";

import { Link } from 'react-router-dom'

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

const initData = {situationsExamples:'', presence:-1, intensity:-1, correctiveActions:'', urgencyLevel:-1, existingActions:'', selectedActions:'', timeLimit:'', inCharge:'', comment:''}

export default class ContentSurvey extends Component {

    constructor(props) {
        super(props);
        this.state = {
          activeItem: 0,
          accordionStates: [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0, 0], [0, 0], [0, 0]],
          saved: true,
          topics:[
            {
                name: "Intensité et complexité du travail",
                subTopics: [
                    {name: "Les contraintes de rythmes de travail", data:initData},
                    {name: "La précision des objectifs de travail", data:initData},
                    {name: "L'adéquation des objectifs de travail avec les moyens alloués et les responsabilités exercées", data:initData},
                    {name: "La compatibilité des instructions de travail entre elles", data:initData},
                    {name: "La modalité d'organisation de la polyvalence", data:initData},
                    {name: "Les interruptions perturbatrices au cours du travail", data:initData},
                    {name: "Les niveaux d'attention et de vigilance requis dans le travail", data:initData}
                    ]
            },
            {
                name: "Horaires de travail",
                subTopics: [
                    {name: "La durée hebdomadaire du travail", data:initData},
                    {name: "Le travail en horaires atypiques", data:initData},
                    {name: "L'extension de la disponibilité en dehors des horaires de travail", data:initData},
                    {name: "La prévisibilité des horaires de travail et anticipation de leur changement", data:initData},
                    {name: "La conciliation entre vie professionnelle et vie personnelle", data:initData}
                    ]
            },
            {
                name: "Exigences émotionnelles",
                subTopics: [
                    {name: "Les tensions avec le public", data:initData},
                    {name: "La confrontation à la souffrance d'autrui", data:initData},
                    {name: "La maitrise des émotions (faire bonne figure)", data:initData}
                    ]
            },
            {
                name: "Autonomie au travail",
                subTopics: [
                    {name: "L'autonomie dans la tâche", data:initData},
                    {name: "L'autonomie temporelle", data:initData},
                    {name: "L'utilisation et le développement des compétences", data:initData}
                    ]
            },
            {
                name: "Rapports sociaux au travail",
                subTopics: [
                    {name: "Le soutien de la part des collègues", data:initData},
                    {name: "Le soutien de la part des supérieurs hiérarchiques", data:initData},
                    {name: "Les violences internes au travail", data:initData},
                    {name: "La reconnaissance dans le travail", data:initData}
                    ]
            },
            {
                name: "Conflits de valeurs",
                subTopics: [
                    {name: "La qualité empêchée", data:initData},
                    {name: "L'utilité du travail", data:initData}
                    ]
            },
            {
                name: "Insécurité de l'emploi et du travail",
                subTopics: [
                    {name: "L'insécurité/la sécurité socio-économique", data:initData},
                    {name: "La conduite du changement", data:initData}
                    ]
            }
            ]
        };
      }
    
      ChangeState = (i,j) => {
        var {accordionStates} = this.state;
        accordionStates[i][j] = (accordionStates[i][j]+1)%2
        this.setState({accordionStates})
      }
    
      handleItemClick = (e, i) => {
        this.setState({ activeItem: i })
      }
    
      change = (i, j, name, value) => {
          var {topics} = this.state
          topics[i].subTopics[j].data = {...topics[i].subTopics[j].data,[name]:value}
          this.setState({saved:false, topics})
      }
    
      save = () => {
          this.setState({saved:true})
      }
    
      next = () => this.setState({activeItem: this.state.activeItem+1})
    
      previous = () => this.setState({activeItem: this.state.activeItem-1})

  render() {

    const {activeItem, accordionStates, saved, topics} = this.state

    return (
      <Container style={{width:'70%', margin: '20px auto'}}>
      <div>
        <Menu attached='top' tabular>
          {topics.map((e, i) => (
            <Menu.Item key={e.theme} active={activeItem === i} onClick={e => this.handleItemClick(e, i)} style={{width:'14.28%', textAlign: 'center'}}>
              {e.name}
            </Menu.Item>
          ))}
        </Menu>
        <Segment attached='bottom' style={{height:'60vh',overflowY: 'scroll'}}>
          <AccordionExampleFluid topics={topics} index={activeItem} ChangeState={this.ChangeState} accordionStates={accordionStates} change={this.change}></AccordionExampleFluid>
        </Segment>
      </div>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <Button icon labelPosition='left' style={{width:'15%', margin:'10px', textAlign:'center'}} disabled={activeItem===0} onClick={this.previous}>
          <Icon name='left arrow' />
          Précedent
        </Button>

        <Popup content='Vos modifications sont déjà enregistrées.' disabled={!saved} trigger={
            <Button icon positive labelPosition='right' style={{width:'15%', margin:'10px', textAlign:'center'}} onClick={this.save}>
                Enregistrer
                <Icon name='save outline' />
            </Button>
        } />

        {activeItem<struct.length-1 ? (
        <Button icon labelPosition='right' style={{width:'15%', margin:'10px', textAlign:'center'}} onClick={this.next}>
          Suivant
          <Icon name='right arrow' />
        </Button>
      ) : (
        <Link to="/thankyou" style={{width:'15%', margin:'10px', textAlign:'center'}}><Button icon labelPosition='right'>
          Terminer
          <Icon name='home' />
        </Button></Link>
      )}
      </div>
      </Container>
    );
  }
}
