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
            status: 'off',
            color: '#66ff',
            displayColorPicker: false
        }
    }

    componentDidMount(){
        /* TODO: call the current led state */
        this.getData();
    }

    getData = async () => {
        const opt = {
            url: '/room',
            method: 'get'
        }
        const data = await axios(opt);
        const res = await data.response;
        console.log(res) 
    }

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };
    
    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };
    
    handleColor = color => {
        console.log(color.rgb)
       // this.sendColor( color.hex )
        this.setState({ color: color.hex })
    }

    sendColor = async color => {
        console.log('..seding colour to the server')
        const opt = {
            url: '/room',
            method: 'post',
            data: color 
        }
        const data = await axios(opt);
        //const res = await data.response; 
        console.log(data)
        
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

export default LedController;