import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Nav from './Nav';
import Example from './RechartsGraph';
import Graph from './Graph';
import Projects from './Projects'
import reportWebVitals from './reportWebVitals';
import firebase from "firebase";
import Screener from './Screener'
import { HashRouter as Router } from 'react-router-dom';
import Footer from './Footer'

import { Routes } from './routes'; // where we are going to specify our routes
// import { NavigationContainer } from '@react-navigation/native';
// import 'react-native-gesture-handler';


ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Routes />

  </Router>
  <Footer/>

    
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//     <Nav />
