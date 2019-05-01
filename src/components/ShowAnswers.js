import React, { Component } from "react";
import {
  Accordion,
  Button,
  Divider,
  Grid,
  Image,
  Modal,
  Segment,
  Dropdown,
  Input,
  Card,
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
  Statistic
} from "semantic-ui-react";

const inlineStyle = {
  modal: {
    margin: "0 auto!important",
    top: "auto !important",
    left: "auto !important",
    transformOrigin: "center !important",
    transition: "all ease .5s"
  }
};

export default class ShowAnswers extends Component {
  state = { activeIndex: 0 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    return (
      <>
        <Modal
          trigger={
            <Button icon labelPosition="right">
              Voir les réponses au questionnaire
              <Icon name="eye" />
            </Button>
          }
        >
          <Modal.Header>Allianz</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Accordion styled>
                <Accordion.Title
                  active={activeIndex === 0}
                  index={0}
                  onClick={this.handleClick}
                >
                  <Icon name="dropdown" />
                  Thème 1 : bla bla
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                  <p>
                    A dog is a type of domesticated animal. Known for its
                    loyalty and faithfulness, it can be found as a welcome guest
                    in many households across the world.
                  </p>
                </Accordion.Content>

                <Accordion.Title
                  active={activeIndex === 1}
                  index={1}
                  onClick={this.handleClick}
                >
                  <Icon name="dropdown" />
                  Thème 2 : bla bla
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 1}>
                  <p>
                    There are many breeds of dogs. Each breed varies in size and
                    temperament. Owners often select a breed of dog that they
                    find to be compatible with their own lifestyle and desires
                    from a companion.
                  </p>
                </Accordion.Content>

                <Accordion.Title
                  active={activeIndex === 2}
                  index={2}
                  onClick={this.handleClick}
                >
                  <Icon name="dropdown" />
                  Thème 3 : bla bla
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 2}>
                  <p>
                    Three common ways for a prospective owner to acquire a dog
                    is from pet shops, private owners, or shelters.
                  </p>
                  <p>
                    A pet shop may be the most convenient way to buy a dog.
                    Buying a dog from a private owner allows you to assess the
                    pedigree and upbringing of your dog before choosing to take
                    it home. Lastly, finding your dog from a shelter, helps give
                    a good home to a dog who may not find one so readily.
                  </p>
                </Accordion.Content>
              </Accordion>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button primary>
              Revenir à la page principale <Icon name="right chevron" />
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}
