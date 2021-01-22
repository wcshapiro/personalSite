import './App.css';
import './index.css';
import React, { Component } from "react";
import { init } from "ityped";

export default class Greeting extends Component {
  componentDidMount() {
    const myElement = document.querySelector("#myElement");
    
  }
  render() {
    return (
      <>
      <div id="welcome-container">
      <h1 className="welcome-statement">Hi, I'm Will!</h1>
    </div>
    
    </>
    );
    
  }
}