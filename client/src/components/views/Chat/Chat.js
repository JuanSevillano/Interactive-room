import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'redux'
import axios from '../../../axios-connect' // to start peer connection using http signaling 
import fb from '../../../firebase-config'

import SimplePeer from 'simple-peer' // currrent integration without redux 

import Overlay from '../../UI/Overlay/Overlay'
import Camera from './Camera/Camera'

import classes from './Chat.module.css'


// const isStarter = axios.get(`/chat/:${roomId}`)
/*
peer1.on('signal', data => {
    peer2.signal(data)
})

peer2.on('signal', data => {
    peer1.signal(data)
})

peer2.on('stream', stream => {
    // got remote video stream, now let's show it in a video tag
    var video = document.querySelector('video')

    if ('srcObject' in video) {
        video.srcObject = stream
    } else {
        video.src = window.URL.createObjectURL(stream) // for older browsers
    }

    video.play()
})
*/


const Chat = props => {

    // UI STATE 
    const [isLogin, setIsLogin] = useState(true)
    const [userId, setUserId] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')

    // CONNECTION STATE 
    let connection;
    const [rooms, setRooms] = useState('')
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // ADDING LISTENER TO FIREBASE ROOMS REAL-TIME-DATABASE
        // RETREIVING ALL THE EXISTING ROOMS 
        fb.getDbInstance().ref('rooms/').once('value', data => setRooms(data.val()));


        fb.getDbInstance().ref('rooms/').on('child_added', child => {
            // handle new room
            console.log('room on child added:', room)
        })

        fb.getDbInstance().ref('rooms/').on('child_changed', (snapshot) => handleData(snapshot))

    }, [])

    const handleData = snapshot => {
        console.log('room on child changed: ', room)
        // if my room had been updated
        console.log('updated room: => ', snapshot.val())
        const isMyRoom = rooms[room.trim()] || false ;
        if (connection && isMyRoom) {
            console.log('connection exist and isMyRoom')
            console.log('my room ', isMyRoom)
            connection.signal(isMyRoom.secondUser.candidate)
        }
        //setRooms(prev => ({ ...prev, prev[snapshot.val().room]: snapshot.val() }));
    }

    // INPUT HANDLERS 
    const userHandler = input => setUserId(input.target.value)
    const roomHandler = input => setRoom(input.target.value)
    const messageHandler = input => setMessage(input.target.value)


    const overlayHandler = () => setIsLogin(prevState => !prevState);


    const logginHandler = () => {
        // this should be update and dispatch with redux   
        // User session and stream should be move to redux logic, i think so. 


        const exist = rooms[room.trim()] || false;

        if (exist) {

            connection = new SimplePeer()
            const otherUser = exist.firstUser.candidate;
            connection.signal(otherUser)

            connection.on('signal', candidate => {

                const updated = {
                    ...exist
                    , secondUser: { id: userId.trim(), candidate }
                    , isFull: true
                }

                fb.getDbInstance().ref('rooms/' + exist.room).update(updated)
                setIsLogin(false)
            })

            connection.on('connect', () => {
                console.log('Connected when exist')
                setIsConnected(true)
            })


        } else {

            connection = new SimplePeer({ initiator: true, trickle: false });
            connection.on('signal', candidate => {

                const newRoom = {
                    room: room.trim(),
                    firstUser: { id: userId.trim(), candidate },
                    secondUser: { id: '', signal: '' },
                    isFull: false
                }
                fb.getDbInstance().ref('rooms/' + newRoom.room).set(newRoom)
                setIsLogin(false)
            })

            connection.on('connect', () => {
                console.log('connected when doesn\'t exist ');
                setIsConnected(true)
            })
        }

        console.log('room on login:', room)
        
    }

    const sendMessage = e => console.log('sending message') // use simple-peer

    return (< div className={classes.Chat} >

        <div className={classes.Message} >
            <input
                type="text"
                onChange={messageHandler}
                value={message}
                placeholder="write a message =)" />
            <button onClick={sendMessage} > send </button >

        </div>
        <div className={classes.Users} > Connected Users</div>
        <div className={classes.Login} >
        </div>
        <div className={classes.History} >
            {isLogin === false ? <Camera /> : null}
        </div>
        <Overlay
            color="rgba(0,0,0,0.8)"
            active={isLogin}
            closed={overlayHandler}>
            <input type="text"
                onChange={userHandler}
                placeholder="User name"
                value={userId} />
            <input
                type="text"
                placeholder="Room to join"
                onChange={roomHandler}
                value={room} />
            <button onClick={logginHandler} > login </button >
        </Overlay>
    </div >)
}

export default Chat