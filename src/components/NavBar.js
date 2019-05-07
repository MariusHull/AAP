import React, { Component } from "react";
import scss from "../global.scss";
import logo from "../assets/logo.png";

export default class NavBar extends Component {
  render() {
    return (
      <div
        style={{
          backgroundImage: `linear-gradient(to right, ${scss.blue}, ${
            scss.blue
          })`
        }}
      >
        <img
          src={logo}
          alt="Logo Alter Alliance"
          style={{ margin: `10px`, height: "30px" }}
        />
      </div>
    );
  }
}
