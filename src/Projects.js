import React, { useState, useEffect } from "react";
import firebase from "firebase";
import './Projects.css';
import firestore from "./firestore";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import CardMedia from '@material-ui/core/CardMedia';

import Paper from '@material-ui/core/Paper';
import { colors } from "@material-ui/core";

const database = firebase.firestore();

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

const Projects = () => {
    const [spacing, setSpacing] = React.useState(2);
    var cardStyles = { backgroundColor: "#DEE0E3", height: "400px", width: "600px" }
    const classes = useStyles();
    const [projects, setProjects] = useState([]);
    const [projects2, setProjects2] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        database.collection('personalProjects').get()
            .then(response => {
                const fetchedProjects = [];
                response.docs.forEach(document => {
                    const fetchedProject = {
                        id: document.id,
                        ...document.data()
                    };
                    fetchedProjects.push(fetchedProject);
                });
                setProjects(fetchedProjects);
                console.log("these are projects" + setProjects);



                database.collection('workProjects').get().then(response2 => {
                    const fetchedProjects2 = [];
                    response2.docs.forEach(document2 => {

                        const fetchedProject2 = {
                            id: document2.id,
                            ...document2.data()
                        };
                        console.log("this is doc2" + fetchedProject2)
                        fetchedProjects2.push(fetchedProject2);
                    });
                    setProjects2(fetchedProjects2);
                    console.log("these are projects2" + setProjects2);
                })

            })
            .catch(error => {
                setError(error);
            });
    }, []);

    return (

        <>

            <div className="projects-background">

                <Grid container className={classes.root}
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                    spacing={2}>

                    <Grid container item xs={12} md={6} sm={12} className={classes.root} spacing={8} direction="column"

                        justify="space-evenly"

                        alignItems="center"
                    >

                        <h1 className="personal-projects">Personal Projects</h1>
                        {error ? (
                            <p>Oops, there is an error </p>
                        ) : null}

                        {projects.map(project => (<>

                            <Grid item >
                                <Card id="personal-card" className={classes.root} style={cardStyles} elevation={4}  >
                                    <CardContent>
                                    <CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"
                                            height="300"
                                            image={project.img}
                                            title="Contemplative Reptile"
                                        />
                                        <h2><strong>{project.name}</strong></h2>
                                        {/* <h3>{project.date.startDate} - {project.date.endDate}</h3> 
                                        <ul >{project.description.map(bullet => (<li>{bullet}
                                        </li>))}</ul>
                                        {/* <ul>{project.technologies.map(technology => (
                                            <p>{technology}</p>

                                        ))}</ul> */}
                                    </CardContent>
                                </Card>
                            </Grid>

                        </>
                        ))}
                    </Grid>

                    <Grid container item xs={12} md={6} sm={12} className={classes.root} spacing={8} direction="column"
                        justify="space-evenly"
                        alignItems="center">
                        <h1 className="work-projects">Work Projects</h1>
                        {error ? (
                            <p>Oops, there is an error </p>
                        ) : null}
                        {projects2.map(project2 => (<>
                            <Grid item >

                                <Card id="work-card" className={classes.root} style={cardStyles} elevation={4}>
                                    <CardContent>
                                        
                                        <h2><strong>{project2.title}</strong></h2>
                                        {/* <h3>{project2.date.startDate} - {project2.date.endDate}</h3> 
                                        <h3>{project2.employer}</h3>
                                        {/* <h3>{project2.location}</h3> */}
                                        {/* <ul >{project2.description.map(bullet => (<li>{bullet}
                                        </li>))}</ul> */}
                                    </CardContent>
                                </Card>

                            </Grid>
                        </>
                        ))}
                    </Grid>
                </Grid >
            </div>
        </>

    );
}

export default Projects;