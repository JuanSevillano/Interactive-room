const path = require('path');
const express = require('express');
const roomController = require('../controllers/room-controller');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'room.html'))
});

router.post('/', (req, res, next) => {
    console.log('[ roomRouter, 13 ] -', req.body)
    const status = req.body.swtich ? 'on' : 'off'; 
    const colour = req.body.color;
    roomController('setColor', colour);
    res.status(303).redirect('/room');
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