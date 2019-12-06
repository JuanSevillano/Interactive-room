import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../../containers/Home/Home';
import Projects from '../../containers/Projects/Projects';
import Menu from '../../components/Menu/Menu';
import FullProject from '../../components/FullProject/FullProject';

import classes from './Portfolio.module.css';

class Portfolio extends Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <div className={classes.Portfolio}> 
                    <Menu />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/projects" exact component={Projects} />
                        <Route path="/projects/:id" exact component={FullProject} />
                    </Switch>
            </div>
      )
    }
}

export default Portfolio;
