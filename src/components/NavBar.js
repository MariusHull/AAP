import React, { Component } from "react";
import scss from "../global.scss";
import logo from "../assets/logo.png";

import { Link } from "react-router-dom";

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
        <Link to="/">
          <img
            src={logo}
            alt="Logo Alter Alliance"
            style={{ margin: `10px`, height: "30px" }}
          />
        </Link>

        {localStorage.getItem("jwtToken") && (
          <button class="btn btn-primary" onClick={this.props.logout}>
            Logout
          </button>
        )}
      </div>
    );
  }
}
