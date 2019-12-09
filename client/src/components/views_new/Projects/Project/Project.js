import React from 'react';
import classes from './Project.module.css';
import { Link } from 'react-router-dom';

const project = props => {
    
    const tags = [...props.tags].map( tag => {
        return <li key={tag} className={classes.Tag}>{tag.toString()}</li>
    });
    
    return (
        <div className={classes.Project} id={props.id}>
             <Link 
                        exact="true" 
                        to={'/projects/' + props.id}>
                <div className={classes.Bubble}>
                    <h1>{props.id}</h1>
                    <img className={classes.Image} alt={props.id} src={props.image} />
                    <section><ul className={classes.Tags}>{tags}</ul></section>
                </div>
            </Link>
        </div>
    )
}
    

export default project; 