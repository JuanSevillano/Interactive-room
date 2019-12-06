import React, { Component } from 'react';
import classes from './Projects.module.css';
import Project from '../../components/Project/Project';
import projectDetails from '../../assets/data/projects.json';
//import imagen from '../../logo.svg'
const images = require.context('../../assets/images');

export default class Projects extends Component {

    constructor(props){
        super(props);
        let loaded = this.loadProjectsFromJson(projectDetails);
        this.state = {
            projects: loaded,
            currentProject: 0
        }
    }

    loadProjectsFromJson(details){
        if(Object.keys(details).length > 0){
            let loaded = Object.keys(details).map( key => {
                return details[key]
            }).map( project => {
                let myImage = images(`./${project.image}`)
                return (
                    <li className={classes.Item} key={project.id}>
                            <Project 
                            description={project.description}
                            image={myImage}
                            tags={project.tags}
                            id={project.id} />
                    </li>
                )
            });
            return loaded;
        }
        return "nothing";
    }

    checkPrevious(prev){
        if( prev >= 0){
            this.setState({ currentProject: prev, hashPrevious: true });
            return this.state.projects[prev].key;
        }else{
            this.setState({ hashPrevious: false });
            return null;
        }
    }

    previousProjectHandler = () => {
        let selector = this.checkPrevious(this.state.currentProject - 1);
        if(selector != null){
            let el = document.querySelector(`#${selector}`);
            let opts = {
                behavior: "smooth",
                block: "center",
                inline: "center"
            }
            this.checkPrevious();
            el.scrollIntoView(opts);
        }
    }

    checkNext(next){
        if( next < this.state.projects.length){
            this.setState({currentProject: next, hashNext: true});
            return this.state.projects[next].key;
        }else{
            this.setState({hashNext: false});
            return null;
        }
    }

    nextProjectHandler = () => {
        console.log('click')
        let selector = this.checkNext(this.state.currentProject+1);
        if(selector != null){
            let el = document.querySelector(`#${selector}`);
            let opts = {
                behavior: "smooth",
                block: "center",
                inline: "center"
            }
            el.scrollIntoView(opts);
        }
    }

    render() {
        return (
            <div className={classes.Projects}>
                <span className={classes.Before} onClick={ this.previousProjectHandler}>&#60;</span>
                    <ul className={classes.List}>{this.state.projects}</ul>
                <span className={classes.Next} onClick={this.nextProjectHandler}>&#62;</span>
            </div>
        )
    }
}