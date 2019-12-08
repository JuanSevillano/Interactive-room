const path = require('path');
const express = require('express');
const roomController = require('../controllers/room-controller');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('algo')
    /** ask to controller for the devices status */
    const devices = [{x: 1},{y: 2},{z: 3}];
    res.status(200).send(devices);
});

router.post('/', (req, res, next) => {
    const hex = Object.keys(req.body)[0]
    roomController('setColor', hex);
    res.status(200).send(hex);
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