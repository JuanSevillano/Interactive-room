const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const roomRouter = require('./routes/room');

app.use(bodyParser.urlencoded({extended: false}));
app.use('/room', roomRouter);

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found, 404 Error! </h1>')
});

app.listen(5000, '192.168.1.46', err => {
    if(err)
        console.log('[ app.js, 16 ] - ', err)
    console.log('[ app.js, 16 ] - Server Stated! =D ');
});
console.log('[ app.js, 38 ] Starting Server...');