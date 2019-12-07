import React, { Component } from 'react';
import ColorPicker from '../ColorPicker/ColorPicker';

import Card from '../UI/Card/Card';
import Switcher from '../UI/Switcher/Switcher';

import classes from './Led.module.css';

class About extends Component {

    constructor(props){
        super(props);
        this.state = {
            color: '#66ff',
            displayColorPicker: false
        }
    }

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };
    
    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };
    
    handleColor = color => {
        this.setState({ color: color.hex })
    }

    render(){
        return (
            <div>
                <h2>Led:</h2>
                <Card>              
                        <fieldset>
                            <section className={classes.Section}>
                                <p>SelectColor</p>
                                <ColorPicker 
                                    clicked={this.handleClick}
                                    closed={this.handleClose}
                                    colorChanged={this.handleColor}
                                    currentColor={this.state.color}
                                    displayColorPicker={this.state.displayColorPicker}
                                /> 
                            </section>      
                            <section className={classes.Section}>
                                <p>Turn On/Off :</p>
                                <Switcher
                                    id="Led"
                                    changed={this.props.statusHanlder} 
                                />
                            </section>
                        </fieldset>
                </Card>
            </div>
        );
    }
};

export default About;