const bodyParser = require('body-parser');
const logger = require('morgan')
const express = require('express');

const app = express();
//Routes
const roomRouter = require('./routes/room');
//express steroids  
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev')); 

// Setting routers 
app.use('/room', roomRouter);
app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found, 404 Error! </h1>')
});

app.listen(5000, '0.0.0.0', err => {
    if(err)
        console.log('[ app.js, 16 ] - ', err)
    console.log('[ app.js, 16 ] - Server Started! =D ');
});
console.log('[ app.js, 38 ] - Starting Server...');