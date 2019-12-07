import React from 'react';
import LedController from '../../../components/Led/Led';

import classes from './RoomDevices.module.css';

const roomDevices = props => {

    const colorHandler = color => {
        console.log(color)
    }
    
    return (
        <div className={classes.RoomDevices}>
            <h1>Room's devices</h1>
            <LedController 
                colorHandler={colorHandler}/>
        </div>
    );
};

export default roomDevices;