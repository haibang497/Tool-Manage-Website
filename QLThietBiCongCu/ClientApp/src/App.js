import React, { Component } from "react";
import { Route } from "react-router";

import "./custom.css";
import { MainLayout } from "./components/MainComponent";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <div>
        <MainLayout/>
      </div>
    );
  }
}
