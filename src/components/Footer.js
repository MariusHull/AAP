import React, { Component } from "react";
import scss from "../global.scss";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import "../navbar.scss";

// const options = [
//   { key: ".com", text: ".com", value: ".com" },
//   { key: ".net", text: ".net", value: ".net" },
//   { key: ".org", text: ".org", value: ".org" }
// ];

export default class Footer extends Component {
  render() {
    return (
      <div
        className="navbar"
        style={{
          backgroundColor: `rgb(0,0,0,0)`
        }}
      >
        Powered by hullOne
      </div>
    );
  }
}
