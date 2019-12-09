import React from 'react';
import LedController from '../../controllers/Led/Led';

import classes from './RoomDevices.module.css';

const roomDevices = props => {
    
    return (
        <div className={classes.RoomDevices}>
            <h1>Room's devices</h1>
            <LedController/>
        </div>
    );
};

export default roomDevices;