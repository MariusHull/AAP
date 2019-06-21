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
          RGPD compliant | D’après le document de travail de l’{" "}
          <a href="http://www.inrs.fr/"> INRS </a>{" "}
        </p>
        <img
          src={logo}
          alt="Logo INRS"
          style={{ margin: "0px 10px", height: "25px" }}
        />
      </div>
    );
  }
}
