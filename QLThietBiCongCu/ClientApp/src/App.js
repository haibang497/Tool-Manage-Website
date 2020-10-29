import React, { Component } from "react";
import { Route } from "react-router";

import "./custom.css";
import { DangNhap } from "./components/DangNhap";
import { MainLayout } from "./components/MainComponent";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <div>
        <MainLayout/>
        <Route path='/dangnhap' component={DangNhap}/>
      </div>
    );
  }
}
