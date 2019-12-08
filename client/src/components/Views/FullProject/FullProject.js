import React, { Component } from 'react';
import classes from './FullProject.module.css';
import detailProjects from '../../../assets/data/projects.json';
import image from '../../../assets/images/trending.png';
const images = require.context('../../../assets/images');

class FullProject extends Component {

    state = {
        loadedProject: null,
        loadedImage: null
    }

    componentDidMount(){

        const urlParams = this.props.match.params;

        if(urlParams.id){
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)){                
                this.setState({loadedProject: detailProjects[urlParams.id]});
                this.setState({loadedImage: image});
            }
        }
    }

    closeHandler = () => {
        
        this.props.history.goBack();
    }

    render() {

        let project = (
            <div className={classes.FullProject} >
                <div className={classes.Overlay}>
                <span className={classes.Close}></span>
                    <p>Loading...</p>
                </div>
            </div>
        );
        
        if(this.state.loadedProject){
            let image = images(`./${this.state.loadedProject.image}`);
            project = (
                <div className={classes.FullProject} >
                    <img src={image} alt={this.state.loadedProject.id} className={classes.ImageBackground} />
                    <div className={classes.Overlay}>
                    <span className={classes.Close} onClick={this.closeHandler}></span>
                        <section className={classes.Content}>
                            <div className={classes.Title}>
                                <h1>{this.state.loadedProject.id}</h1>
                            </div>
                            <div className={classes.Description}>
                                <p>{this.state.loadedProject.description}</p>
                            </div>
                        </section>
                    </div>
                </div>
            );
        }

        return project
    }
}

export default FullProject;
