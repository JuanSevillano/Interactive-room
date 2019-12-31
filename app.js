const bodyParser = require('body-parser');
const logger = require('morgan');
const express = require('express');

const app = express();
//Routes
const roomRouter = require('./routes/room');
const chatRouter = require('./routes/chat');
//express steroids  
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev')); 

// Setting routers 
app.use('/room', roomRouter);
app.use('/chat', chatRouter);
app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found, 404 Error! </h1>');
});

app.listen(5000, '0.0.0.0', err => {
    if(err)
        console.log('[ app.js, 23 ] - ', err)
    console.log('[ app.js, 24 ] - Server Started! =D ');
});

console.log('[ app.js, 26 ] - Starting Server...');