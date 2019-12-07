import React, { Component } from 'react'
import classes from './Switcher.module.css'

const switcher = props => {

        return (
            <div className={classes.Switcher}>
                <label className={classes.Switch}>
                    <input type="checkbox" 
                        id={props.id}
                        onChange={props.changed}
                        className={classes.Input}
                        />
                    <span className={classes.SliderRound}></span>
                </label>
            </div>
        );
}

export default switcher;

