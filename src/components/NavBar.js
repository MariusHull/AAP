import React, { Component } from "react";
import scss from "../global.scss";
import logo from "../assets/logo.png";
import { Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";

const options = [
  { key: ".com", text: ".com", value: ".com" },
  { key: ".net", text: ".net", value: ".net" },
  { key: ".org", text: ".org", value: ".org" }
];

export default class NavBar extends Component {
  // Function to log out, clear the token in the front and go back to the login page
  logout = () => {
    if (window.confirm("Vous allez vous déconnecter, en êtes-vous sûr(e) ?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

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

        {localStorage.getItem("jwtToken") &&
          localStorage.getItem("User") &&
          localStorage.getItem("Status") && (
            <div>
              <div class="ui compact menu">
                <div class="ui simple dropdown item">
                  {localStorage.getItem("User")}
                  <i class="dropdown icon" />
                  <div class="menu">
                    {localStorage.getItem("Status") !== "Admin" && (
                      <Link class="item" to="/survey">
                        Questionnaire
                      </Link>
                    )}
                    {localStorage.getItem("Status") === "Admin" && (
                      <Link class="item" to="/admin">
                        Compte administrateur
                      </Link>
                    )}
                    <div class="ui divider" />
                    {localStorage.getItem("Status") === "Admin" && (
                      <Link class="item" to="/users">
                        Gestion utilisateurs
                      </Link>
                    )}
                    <div class="ui divider" />
                    <div class="item" onClick={this.logout}>
                      Logout
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    );
  }
}
