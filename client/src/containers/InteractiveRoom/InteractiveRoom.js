import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import RoomDevices from './RoomDevices/RoomDevices';
import Projects from './Projects/Projects';
import Menu from '../../components/Menu/Menu';
import FullProject from '../../components/FullProject/FullProject';

import classes from './InteractiveRoom.module.css';

class InteractiveRoom extends Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <div className={classes.InteractiveRoom}> 
                    <Menu />
                    <Switch>
                        <Route path="/" exact component={RoomDevices} />
                        <Route path="/projects" exact component={Projects} />
                        <Route path="/projects/:id" exact component={FullProject} />
                    </Switch>
            </div>
      )
    }
}

export default InteractiveRoom;
