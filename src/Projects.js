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
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    Link,
    useRouteMatch,
} from "react-router-dom";
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
    var cardStyles = { backgroundColor: "#DEE0E3", height: "600x", minWidth: "40vw", maxWidth:"450px" }
    const classes = useStyles();
    const [projects, setProjects] = useState([]);
    const [projects2, setProjects2] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        let mounted = true;
        let mounted2 = true;
        database.collection('personalProjects').get()
            .then(response => {

                if(mounted){
                    
                
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
                    if(mounted2){
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
                    console.log("these are projects2" + setProjects2);}
                })

    }});
            return () => {mounted = false;
                mounted2 = false;};
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
                                <Link to={'/projects/personal/' + project.id} style={{ textDecoration: 'none' }}>
                                    <Card id="personal-card" className={classes.root} style={cardStyles} elevation={4}
                                    >
                                        <CardMedia

                                            component="img"
                                            alt="Project Image"
                                            height="300"
                                            image={project.img}
                                            title="Project Image"
                                        />
                                        <CardContent
                                        height = "200px">

                                            <h2 ><strong>{project.name}</strong></h2>


                                            {/* <h3>{project.date.startDate} - {project.date.endDate}</h3> 
                                        <ul >{project.description.map(bullet => (<li>{bullet}
                                        </li>))}</ul>
                                        {/* <ul>{project.technologies.map(technology => (
                                            <p>{technology}</p>

                                        ))}</ul> */}
                                        </CardContent>
                                    </Card>
                                </Link>
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
                                <Link to={'/projects/work/' + project2.id} style={{ textDecoration: 'none' }}>

                                    <Card id="work-card" className={classes.root} style={cardStyles} elevation={4}>
                                        <CardMedia
                                            component="img"
                                            alt="Project Image"
                                            height="300"
                                            image={project2.img}
                                            title="Project Image"
                                        />
                                        <CardContent>
                                            <h2><strong>{project2.title}</strong></h2>
                                        </CardContent>
                                    </Card>
                                </Link>
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