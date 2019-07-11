import React, { Component } from "react";
import logo from "../assets/inrs.png";
import "../navbar.scss";

export default class Footer extends Component {
  render() {
    return (
      <div
        style={{
          position: "fixed",
          bottom: "0px",
          background: "#fefefe",
          width: "100%",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <p style={{ color: "#888", margin: "0px" }}>
          {" "}
          RGPD compliant | D’après le modèle de Document Unique des risques
          psychosociaux (RPS) proposé par l'{" "}
          <a href="http://www.inrs.fr/"> INRS </a>{" "}
        </p>
        <img
          src={logo}
          alt="Logo INRS"
          style={{ margin: "0px 10px", height: "25px" }}
        />
        <p style={{ color: "#888", margin: "0px" }}>
          | Réalisé en partenariat avec la junior entreprise de{" "}
          <a href="https://www.juniorcs.fr/"> CentraleSupélec </a>{" "}
        </p>
      </div>
    );
  }
}
