import React from 'react';
import App from './App';
import Graph from './Graph';
// import { About } from './views/About';
// import { NavBar } from './components/NavBar';
import Projects from './Projects';
import ProjectPage from './ProjectPage'
import { Route, Switch, Redirect} from 'react-router-dom';

export const Routes = () => {
  return (
    <div>
      <Switch>
      <Route exact path="/projects" component={Projects} />
        <Route exact path="/projects/:type/:id" component={ProjectPage} />
        <Route exact path="/ca" component={Graph} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route exact path="/Home" component={App} />
      </Switch>
    </div>
  );
};