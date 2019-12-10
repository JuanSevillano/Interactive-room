const path = require('path');
const express = require('express');
const RoomController = require('../controllers/room-controller');
const instance = new RoomController(); 
const router = express.Router();

router.get('/', (req, res, next) => {
    /** ask to controller for the devices status */
    res.status(200).send('ok');
});

router.post('/', (req, res, next) => {
    /** TODO: this need to be re-make, it's a quickly test */

    const device = JSON.parse(Object.keys(req.body)[0])
    const id = device.id; // to indentify devices. Room controller is bad designed so far it's fixed to a LED only. 
    const status = device.status;
    const color = device.color;
    console.log(device)
    
    if(status){
        instance.ledOn(id);
        instance.ledColor(id, color);
    }else{
        instance.ledOff();
    }

    res.status(200).send(id);
});

router.get('/off', (req, res, next) => {
    instance.ledOff();
    res.send('<h1>Turned off</h1>');
});

router.get('/blink', (req, res, next) => {
    instance.ledBlink();
    res.send('<h1>Led is now red</h1>');
});

module.exports = router; 