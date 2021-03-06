import React, { Component } from 'react';
import axios from '../../../axios-connect';

import ColorPicker from '../../tools/ColorPicker/ColorPicker';
import Switcher from '../../tools/Switcher/Switcher';

import Card from '../../UI/Card/Card';
import classes from './Led.module.css';


class LedController extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: 'led_controller',
            status: false, // false = off
            color: { hex: '#66ff00'},
            displayColorPicker: false
        }
    }

    componentDidMount(){
        /* TODO: call the current led state */
        this.getData();
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.state !== nextState){
            this.sendState(nextState);
            return true;
        }else{
            return false;
        }
    }

    getData = async () => {
        const opt = {
            url: '/room',
            method: 'get'
        }
        const data = await axios(opt);
        console.log(data) 
    }

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };
    
    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };
    
    handleColor = color => {
        this.setState({ color });
    }
    
    statusHandler = event => {
        this.setState({ status: !this.state.status })
    }

    sendState = async nextState => {
        const newState = JSON.stringify({...nextState})
        const opt = {
            url: '/room',
            method: 'post',
            data: newState
        }
     
        await axios(opt);
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
                                    currentColor={this.state.color.hex}
                                    displayColorPicker={this.state.displayColorPicker}
                                /> 
                            </section>      
                            <section className={classes.Section}>
                                <p>Turn On/Off :</p>
                                <Switcher
                                    id="Led"
                                    changed={this.statusHandler} 
                                />
                            </section>
                        </fieldset>
                </Card>
            </div>
        );
    }
};

export default LedController;