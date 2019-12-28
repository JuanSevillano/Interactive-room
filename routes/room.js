const path = require('path');
const express = require('express');
const RoomController = require('../controllers/room-controller');
const instance = new RoomController(); 
const router = express.Router();
const { parse , stringify } = require('flatted/cjs');

router.get('/', async (req, res, next) => {
    /** ask to controller for the devices status */
    const data = stringify(instance.getDevices())
    
    res.status(200).send(data);
});

router.post('/', (req, res, next) => {
    /** TODO: this need to be re-make, it's a quickly test */

    const device = JSON.parse(Object.keys(req.body)[0])
    //console.log(device)
    const id = device.id; // to indentify devices. Room controller is bad designed so far it's fixed to a LED only. 
    const status = device.status;
    const color = device.color['hex'];
    
    if(status){
        console.log(' im the colour ' , color )
        instance.ledOn(id);
        instance.ledColor(id, color);
        res.status(200).send(id);
    }else{
        instance.ledOff();
        res.status(200).send(id);
    }

    
});


module.exports = router; 