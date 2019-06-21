import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.min.css";

import Routes from "./routes/routes";

import Footer from "./components/Footer";

import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <Routes />
        <Footer />
      </>
    );
  }
}

export default App;
