import React, { useState } from 'react'
import SimplePeer from 'simple-peer'
import classes from './Chat.module.css'

const Chat = props => {

    const [userId, setUserId] = useState('')
    const [message, setMessage] = useState('')
    const [isStarter, setIsStarter] = useState(true);

    const userHandler = input => setUserId(input.target.value)
    const messageHandler = input => setMessage(input.target.value)
    const starterHandler = input => setIsStarter( prevState => !prevState);

    const logginHandler = e => console.log(isStarter) // dispatch with redux 
    const sendMessage = e => console.log('sending message') // use simple-peer

    return (< div className={classes.Chat} >
        <div className={classes.Overlay} > </div>
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
            <input type="text"
                onChange={userHandler}
                placeholder="username"
                value={userId} />
                 <input
                type="checkbox"
                onChange={starterHandler}
                defaultChecked
                value={isStarter}
            />
            <button onClick={logginHandler} > login </button >
        </div>
        <div className={classes.History} > History chat</div>
    </div>)
}

export default Chat