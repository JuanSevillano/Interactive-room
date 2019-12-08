const path = require('path');
const express = require('express');
const roomController = require('../controllers/room-controller');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('algo')
    /** ask to controller for the devices status */
    const devices = [{},{},{}];
    res.send(JSON.stringify(devices));
});

router.post('/', (req, res, next) => {
    console.log('[ roomRouter, 13 ] -', req.body); 
    const colour = req.body.color;
    console.log(colour)
    //roomController('setColor', colour);
    res.status(200).send('ok');
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