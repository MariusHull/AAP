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
        className="navbar"
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
            <div className="navright">
              <div className="ui compact menu">
                <div className="ui simple dropdown item">
                  {localStorage.getItem("User")}
                  <i className="dropdown icon" />
                  <div className="left menu">
                    {localStorage.getItem("Status") !== "Admin" && (
                      <Link className="item" to="/survey">
                        Questionnaire
                      </Link>
                    )}
                    {localStorage.getItem("Status") === "Admin" && (
                      <Link className="item" to="/admin">
                        Compte administrateur
                      </Link>
                    )}
                    {localStorage.getItem("Status") === "Admin" && (
                      <div className="ui divider" />
                    )}
                    {localStorage.getItem("Status") === "Admin" && (
                      <Link className="item" to="/users">
                        Gestion utilisateurs
                      </Link>
                    )}
                    <div className="ui divider" />
                    <Link className="item" to="/settings">
                      Réglages du compte
                    </Link>
                    <div className="item" onClick={this.logout}>
                      Se Déconnecter
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
