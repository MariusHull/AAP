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
  List

} from "semantic-ui-react";

const questions = [{title : 'Thème 1', 
    sub_themes : [{title : 'Sous-thème 1', questions : ["q1", "q2", "q3", "q4"]}, 
        {title : 'Sous-thème 2', questions : ["q1", "q2", "q3", "q4"]}]},
    {title : 'Thème 2', 
        sub_themes : [{title : 'Sous-thème 1', questions : ["q1", "q2", "q3", "q4"]}, 
            {title : 'Sous-thème 2', questions : ["q1", "q2", "q3", "q4"]}]}];

export default class Survey extends Component {
  render() {
    return (
      <Container>
        {questions.map((theme, i) => (
          <Container>
          <h3>{theme.title}</h3>
            {theme.sub_themes.map((sub_theme, j) => (
              <Container>
                <h4>{sub_theme.title}</h4>
                {sub_theme.questions.map((question, k) => (
                  <List selection divided verticalAlign='middle'>
                    <List.Item>
                      <List.Content floated='right'>
                        <Button.Group>
                          <Button inverted color='green'>
                            Jamais
                          </Button>
                          <Button inverted color='yellow'>
                            Parfois
                          </Button>
                          <Button inverted color='orange'>
                            Souvent
                          </Button>
                          <Button inverted color='red'>
                            Toujours
                          </Button>
                        </Button.Group>
                      </List.Content>
                      <List.Content>{question}</List.Content>
                    </List.Item>
                  </List>
                ))}
              </Container>
            ))}
          </Container>
          ))}
      </Container>
    );
  }
}
