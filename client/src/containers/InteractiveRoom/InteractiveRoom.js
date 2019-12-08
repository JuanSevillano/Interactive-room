import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import RoomDevices from '../../components/views/RoomDevices/RoomDevices';
import Projects from '../../components/views/Projects/Projects';
import Menu from '../../components/UI/Menu/Menu';
import FullProject from '../../components/views/FullProject/FullProject';

import classes from './InteractiveRoom.module.css';

class InteractiveRoom extends Component {
    
    /** Main app Component */

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        
        const links = [
            {text: 'room', url: '/room'},
            {text: 'projects', url: '/projects'}
        ] ;

        return (
            <div className={classes.InteractiveRoom}> 
                    <Menu 
                        links={ links }/>
                    <Switch>
                        <Route path="/" exact component={RoomDevices} />
                        <Route path="/room" exact component={RoomDevices} />
                        <Route path="/projects" exact component={Projects} />
                        <Route path="/projects/:id" exact component={FullProject} />
                    </Switch>
            </div>
      )
    }
}

export default InteractiveRoom;
