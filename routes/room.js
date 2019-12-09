const path = require('path');
const express = require('express');
const roomController = require('../controllers/room-controller');

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
    if(status){
        roomController('on');
        roomController('setColor', color);
    }else{
        roomController('off');
    }

    res.status(200).send(id);
});

router.get('/off', (req, res, next) => {
    roomController('off');
    res.send('<h1>Turned off</h1>');
});

router.get('/blink', (req, res, next) => {
    roomController('blink');
    res.send('<h1>Led is now red</h1>');
});

module.exports = router; 