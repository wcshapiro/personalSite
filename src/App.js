import './App.css';
import './index.css';
import React, { Component } from "react";
import { init } from "ityped";
import Graph from './Graph';
import Projects from './Projects'

export default class Greeting extends Component {
  componentDidMount() {
    const myElement = document.querySelector("#myElement");
    
  }
  render() {
    return (
      <>
      {/* <NavigationContainer> */}
    <div className="main-container">
    <Graph />
    <div id="welcome-container">
      <h1 className="welcome-statement">Hi, I'm Will!</h1>
      <h3 className="welcome-bio">Engineer, Developer, Entrepreneur</h3>

    </div>    </div>
    
    {/* <Screener /> */}
    <Projects />
    {/* <Example /> */}
    {/* </NavigationContainer> */}
     {/* <Nav /> */}
      
    
    </>
    );
    
  }
}