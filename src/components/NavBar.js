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
      window.location.replace("/");
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
        {localStorage.getItem("jwtToken") &&
          localStorage.getItem("User") &&
          localStorage.getItem("level") && 
          localStorage.getItem("level") === "0" && (
        <Link to="/user/sites">
          <img
            src={logo}
            alt="Logo Alter Alliance"
            style={{ margin: `10px`, height: "30px" }}
          />
        </Link>)}
        {localStorage.getItem("jwtToken") &&
          localStorage.getItem("User") &&
          localStorage.getItem("level") && 
          localStorage.getItem("level") === "1" && (
        <Link to="/admin/users">
          <img
            src={logo}
            alt="Logo Alter Alliance"
            style={{ margin: `10px`, height: "30px" }}
          />
        </Link>)}
        {localStorage.getItem("jwtToken") &&
          localStorage.getItem("User") &&
          localStorage.getItem("level") && 
          localStorage.getItem("level") === "2" && (
        <Link to="/admin/home">
          <img
            src={logo}
            alt="Logo Alter Alliance"
            style={{ margin: `10px`, height: "30px" }}
          />
        </Link>)}

        {localStorage.getItem("jwtToken") &&
          localStorage.getItem("User") &&
          localStorage.getItem("level") && (
            <div className="navright">
              <div className="ui compact menu">
                <div className="ui simple dropdown item">
                  {localStorage.getItem("User")}
                  <i className="dropdown icon" />
                  <div className="left menu">
                    {localStorage.getItem("level") === "0" && (
                      <Link className="item" to="/user/sites">
                        Choix du site
                      </Link>
                    )}
                    {localStorage.getItem("level") >= 2 && (
                      <>
                        <Link className="item" to="/admin/home">
                          Compte administrateur
                        </Link>
                        <div className="ui divider" />
                      </>
                    )}
                    {localStorage.getItem("level") == 1 && (
                      <>
                        <Link className="item" to="/admin/home">
                          Accès aux comptes
                        </Link>
                        <div className="ui divider" />
                      </>
                    )}
                    {localStorage.getItem("level") >= 1 && (
                      <>
                        <Link className="item" to="/admin/users">
                          Gestion utilisateurs
                        </Link>
                      </>
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
