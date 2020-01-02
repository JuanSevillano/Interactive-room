import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import axios from '../../../axios-connect' // to start peer connection using http signaling 
import fb from '../../../firebase-config' // using firebase for signalining

import SimplePeer from 'simple-peer' // currrent integration without redux 

import Overlay from '../../UI/Overlay/Overlay'
import Camera from './Camera/Camera'

import classes from './Chat.module.css'

import types from '../../../store/actions/chat'

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
    const [enteredRoom, setEnteredRoom] = useState('')
    const [rooms, setRooms] = useState('')
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // ADDING LISTENER TO FIREBASE ROOMS REAL-TIME-DATABASE 
        // AND DISPATCHING REDUX HANDLERS 
        fb.getDbInstance()
            .ref('rooms/').
            once('value', data => props.onInitialRooms(data.val()))


        fb.getDbInstance()
            .ref('rooms/')
            .on('child_added', child => props.onRoomAdded(child.val()))

        fb.getDbInstance()
            .ref('rooms/')
            .on('child_changed', (child) => props.onRoomUpdated(child.val()))

    }, [])

    const handleData = snapshot => {
        // if my room had been updated
        console.log('room on child changed: ', enteredRoom)
        console.log('updated room: => ', snapshot.val())
        const isMyRoom = rooms[enteredRoom];
        console.log('is my Room: ', isMyRoom)
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
        props.onLogin(room, userId)

        const exist = rooms[room.trim()] || false;
        setEnteredRoom(room)


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
            })

            connection.on('connect', () => {
                console.log('connected when doesn\'t exist ');
                setIsConnected(true)
            })
        }

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
            <p>Usuario{props.user}</p>
            <p>Room{props.room}</p>
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


const mapStateToProps = state => {
    return {
        room: state.roomName,
        user: state.userName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitialRooms: rooms => dispatch({ type: types.ON_INITIAL_ROOMS, payload: { rooms } }),
        onRoomUpdated: room => dispatch({ type: types.ON_ROOM_UPDATED, payload: { room } }),
        onRoomAdded: room => dispatch({ type: types.ON_ROOM_ADDED, payload: { room } }),
        onLogin: (user, room) => dispatch({ type: types.ON_LOGIN, payload: { user, room } })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)