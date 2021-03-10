import React, { useState, useEffect } from "react";
import firebase from "firebase";
import './Projects.css';
import firestore from "./firestore";
import { makeStyles } from '@material-ui/core/styles';
import Nav from './Nav'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));
export default function ProjectPage() {
  return (<>
    <Nav />
    <Child />
  </>
  );
}

function Child() {
  const classes = useStyles();

  var cardStyles = {
    backgroundColor: "#DEE0E3", height: "150px", width: "150px"
  }
  const [title, setTitle] = useState();
  const [img, setImg] = useState();
  const [desc, setDesc] = useState(new Array());
  const [tech, setTech] = useState(new Array());
  const [date, setDate] = useState();
  const [endDate, setEndDate] = useState();
  const [employer, setEmployer] = useState();
  const db = firebase.firestore();


  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id, type } = useParams();
  useEffect(() => {
    let mounted = true;
    db.collection(type == 'personal' ? 'personalProjects' : 'workProjects')
      .doc(id)
      .get()
      .then(doc => {
        if (mounted) {
          const data = doc.data();
          if (type == 'personal') {
            setTitle(data.name);

          }
          else {
            setTitle(data.title);
            setEmployer(data.employer);

          }
          setImg(data.img);
          setDesc(data.description);
          setTech(data.technologies);
          setEndDate(data.date.endDate);
          setDate(data.date.startDate);
        };
      });
  }, []);



  return (
    <>
      <img id="jobImg" alt="" src={img} ></img>
      <div id="mainDiv">

        <h3 id="jobTitle">{title}</h3>
        <h3 id="jobDate">{date} - {endDate}</h3>
        <h3 id="jobEmployer">{employer ? employer : ''}</h3>
        <div id="jobDesc">{desc.map((key, value) => (
          <>
            <p>{key}</p>
            <br></br>
          </>
        ))}</div>
        <div id="TechDiv">
          <h3 id="techHead">Technologies Used</h3>
          <div>
            
              <ul id="jobTech">{tech.map((key, value) => (
                <>
                  
                        <li>{key}</li>
                      

                </>
              ))
              }</ul>
            
          </div>
        </div>
      </div>
    </>
  );
}