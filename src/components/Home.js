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
  Statistic
} from "semantic-ui-react";

const options = [
  { key: ".com", text: ".com", value: ".com" },
  { key: ".net", text: ".net", value: ".net" },
  { key: ".org", text: ".org", value: ".org" }
];

const colors = ["red", "olive"];

export default class Home extends Component {
  render() {
    return (
      <Container>
        <Button>Click Here</Button>

        <Segment>
          <Grid columns={2} relaxed="very">
            <Grid.Column>
              <p>
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
              </p>
              <p>
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
              </p>
              <p>
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
              </p>
              <p>
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
              </p>
            </Grid.Column>
            <Grid.Column>
              <p>
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
              </p>
              <p>
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
              </p>
              <p>
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
              </p>
              <p>
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
              </p>
            </Grid.Column>
          </Grid>

          <Divider vertical>And</Divider>
        </Segment>

        <Input
          label={<Dropdown defaultValue=".com" options={options} />}
          labelPosition="right"
          placeholder="Find domain"
        />

        <Input
          action={{
            color: "teal",
            labelPosition: "right",
            icon: "copy",
            content: "Copy"
          }}
          defaultValue="http://ww.short.url/c0opq"
        />

        <Segment>
          <Label as="a" color="blue" image>
            <img src="https://react.semantic-ui.com/images/avatar/small/veronika.jpg" />
            Veronika
            <Label.Detail>Friend</Label.Detail>
          </Label>
          <Label as="a" color="teal" image>
            <img src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" />
            Veronika
            <Label.Detail>Friend</Label.Detail>
          </Label>
          <Label as="a" color="yellow" image>
            <img src="https://react.semantic-ui.com/images/avatar/small/christian.jpg" />
            Helen
            <Label.Detail>Co-worker</Label.Detail>
          </Label>
        </Segment>

        <Segment>
          <Dimmer active>
            <Loader>Loading</Loader>
          </Dimmer>

          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>

        <Step.Group unstackable>
          <Step>
            <Icon name="plane" />
            <Step.Content>
              <Step.Title>Shipping</Step.Title>
              <Step.Description>Choose your shipping options</Step.Description>
            </Step.Content>
          </Step>
          <Step active>
            <Icon name="dollar" />
            <Step.Content>
              <Step.Title>Billing</Step.Title>
              <Step.Description>Enter billing information</Step.Description>
            </Step.Content>
          </Step>
          <Step disabled>
            <Icon name="info circle" />
            <Step.Content>
              <Step.Title>Confirm Order</Step.Title>
              <Step.Description>Verify order details</Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>

        {colors.map(color => (
          <Table color={color} key={color} inverted>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Food</Table.HeaderCell>
                <Table.HeaderCell>Calories</Table.HeaderCell>
                <Table.HeaderCell>Protein</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>Apples</Table.Cell>
                <Table.Cell>200</Table.Cell>
                <Table.Cell>0g</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Orange</Table.Cell>
                <Table.Cell>310</Table.Cell>
                <Table.Cell>0g</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        ))}
        <Comment.Group>
          <Header as="h3" dividing>
            Comments
          </Header>

          <Comment>
            <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
            <Comment.Content>
              <Comment.Author as="a">Matt</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:42PM</div>
              </Comment.Metadata>
              <Comment.Text>How artistic!</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>

          <Comment>
            <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
            <Comment.Content>
              <Comment.Author as="a">Elliot Fu</Comment.Author>
              <Comment.Metadata>
                <div>Yesterday at 12:30AM</div>
              </Comment.Metadata>
              <Comment.Text>
                <p>
                  This has been very useful for my research. Thanks as well!
                </p>
              </Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
            <Comment.Group>
              <Comment>
                <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" />
                <Comment.Content>
                  <Comment.Author as="a">Jenny Hess</Comment.Author>
                  <Comment.Metadata>
                    <div>Just now</div>
                  </Comment.Metadata>
                  <Comment.Text>Elliot you are always so right :)</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>
          </Comment>

          <Comment>
            <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/joe.jpg" />
            <Comment.Content>
              <Comment.Author as="a">Joe Henderson</Comment.Author>
              <Comment.Metadata>
                <div>5 days ago</div>
              </Comment.Metadata>
              <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>

          <Form reply>
            <Form.TextArea />
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </Comment.Group>

        <Segment inverted>
          <Statistic color="green" inverted>
            <Statistic.Value>14</Statistic.Value>
            <Statistic.Label>green</Statistic.Label>
          </Statistic>
          <Statistic color="teal" inverted>
            <Statistic.Value>82</Statistic.Value>
            <Statistic.Label>teal</Statistic.Label>
          </Statistic>
          <Statistic color="blue" inverted>
            <Statistic.Value>1'</Statistic.Value>
            <Statistic.Label>blue</Statistic.Label>
          </Statistic>
          <Statistic color="violet" inverted>
            <Statistic.Value>22</Statistic.Value>
            <Statistic.Label>violet</Statistic.Label>
          </Statistic>
          <Statistic color="purple" inverted>
            <Statistic.Value>23</Statistic.Value>
            <Statistic.Label>purple</Statistic.Label>
          </Statistic>
          <Statistic color="pink" inverted>
            <Statistic.Value>15</Statistic.Value>
            <Statistic.Label>pink</Statistic.Label>
          </Statistic>
          <Statistic color="brown" inverted>
            <Statistic.Value>36</Statistic.Value>
            <Statistic.Label>brown</Statistic.Label>
          </Statistic>
          <Statistic color="grey" inverted>
            <Statistic.Value>49</Statistic.Value>
            <Statistic.Label>grey</Statistic.Label>
          </Statistic>
        </Segment>
      </Container>
    );
  }
}
