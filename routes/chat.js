const express = require('express');
const router = express.Router();

const rooms = [];

router.get('/', (req, res, next) => {
    res.status(200).send('ok');
})

router.post('/', (req, res, next) => {

    const roomName = req.body.room;
    const user = req.body.userId;

    if (rooms.some(r => r.id === roomName)) {

        const existingRoom = rooms.find(r => r.id === roomName);
        console.log('la habication existe', existingRoom)

        if (existingRoom.secondUser === 'waiting') {

            const secondUserAdded = { ...existingRoom, secondUser: user }
            res.status(200).send(existingRoom)

        } else {

            res.status(400).send({ room: 'full' })

        }

    } else {

        const room = {
            id: roomName,
            firstUser: user,
            secondUser: ''
        }

        res.status(200).send(rooms);
    }

})


module.exports = router;