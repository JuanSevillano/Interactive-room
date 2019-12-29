import React, { useState, useEffect, useRef } from 'react'
import axios from '../../../axios-connect' // to start peer connection using http signaling 
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


    const [isLogin, setIsLogin] = useState(true);
    const [userId, setUserId] = useState('')
    const [room, setRoom] = useState('');

    const [message, setMessage] = useState('')

    const [userdLogged, setUserLogged] = useState({});
    const [isStarter, setIsStarter] = useState(true);


    const connection = new SimplePeer({ initiator: true });
    const connectionTwo = new SimplePeer();

    connection.on('signal', data => {
        connectionTwo.signal(data);
    })


    const userHandler = input => setUserId(input.target.value)
    const messageHandler = input => setMessage(input.target.value)
    const roomHandler = input => setRoom(input.target.value)

    const starterHandler = input => setIsStarter(prevState => !prevState);

    const overlayHandler = () => setIsLogin(prevState => !prevState);

    const logginHandler = async () => {
        // this should be update and dispatch with redux   
        // User session and stream should be move to redux logic, i think so. 
        const data = { userId, room }
        const response = await axios.post('/chat', data);
        setIsLogin(false)
        console.log(response)

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