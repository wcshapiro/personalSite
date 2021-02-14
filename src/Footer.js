import './index.css';
import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';


export default class Footer extends Component {
    componentDidMount() {

    }
    render() {

        return (
            <>
                <footer id="footer">
                    <div id="gridcontainer">
                    <Grid container
                        direction="row"
                        justify="space-evenly"
                        alignItems="center"
                        spacing={2}>

                        <Grid container item xs={12} md={6} sm={12} spacing={8} direction="column"

                            justify="space-evenly"

                            alignItems="center"
                        > <div id="contact-info">
                                <h3>Contact Information</h3>
                                <p>Name: Will Shapiro</p>
                                <p>Email: willcshapiro@gmail.com</p>
                                <p>Phone: (347)-907-9209</p>
                                <a href="https://github.com/wcshapiro">Github</a> <br></br><br></br>
                                <a href="https://www.linkedin.com/in/willcshapiro">linkedIn</a>
                            </div>

                        </Grid>
                        <Grid container item xs={12} md={6} sm={12} spacing={8} direction="column"

                            justify="space-evenly"

                            alignItems="center"
                        >
                            <div id="contact-info">
                                <h3>About Me</h3>
                                <p>
                                    I'm a computer Science and Computer Engineering graduate of the University of Kentucky class of 2021.
                                    I am currently looking for an entry-level position in the field of fintech, biotech, or web development (frontend or backend).
                                </p>
                                <br>
                                </br>
                                <br>
                                </br>
                                <br>
                                </br>
                                <br>
                                </br>
                                <br>
                                </br>
                                <br>
                                </br>
                            </div>
                        </Grid>
                    </Grid>
                    </div>
                </footer>
            </>
        );

    }
}