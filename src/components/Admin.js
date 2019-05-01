import React, { Component } from "react";
import {
  Button,
  Divider,
  Grid,
  Image,
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
import Company from "./Company";
import NavBar from "./NavBar";

export default class Admin extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Container>
          <Company />
          <Company />
          <Company />
          <Company />
        </Container>
      </>
    );
  }
}
