import React, { useState, useEffect, useRef } from 'react'
import SimplePeer from 'simple-peer'
import classes from './Chat.module.css'

const Chat = props => {

    const [userId, setUserId] = useState('')
    const [message, setMessage] = useState('')
    const [isStarter, setIsStarter] = useState(true);

    const peerRef = useRef(null)
    const peer1Ref = useRef(null)

    useEffect(() => {

        // Older browsers might not implement mediaDevices at all, so we set an empty object first
        if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {};
        }

        // Some browsers partially implement mediaDevices. We can't just assign an object
        // with getUserMedia as it would overwrite existing properties.
        // Here, we will just add the getUserMedia property if it's missing.
        if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = function (constraints) {

                // First get ahold of the legacy getUserMedia, if present
                var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

                // Some browsers just don't implement it - return a rejected promise with an error
                // to keep a consistent interface
                if (!getUserMedia) {
                    return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                }

                // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
                return new Promise(function (resolve, reject) {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
            }
        }

        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .then(function (stream) {
                peerRef.current = new SimplePeer({ initiator: true, stream: stream })
                peer1Ref.current = new SimplePeer({ stream: stream })

                peerRef.current.on('signal', data => {
                    peer1Ref.current.signal(data)
                })

                peer1Ref.current.on('signal', data => {
                    peerRef.current.signal(data)
                })

                peer1Ref.current.on('stream', stream => {
                    // got remote video stream, now let's show it in a video tag
                    var video = document.querySelector('video')

                    if ('srcObject' in video) {
                        video.srcObject = stream
                    } else {
                        video.src = window.URL.createObjectURL(stream) // for older browsers
                    }

                    video.play()
                })
            })
            .catch(function (err) {
                console.log(err.name + ": " + err.message);
            });



    }, [])


    const userHandler = input => setUserId(input.target.value)
    const messageHandler = input => setMessage(input.target.value)
    const starterHandler = input => setIsStarter(prevState => !prevState);

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
        <div className={classes.History} >
            <video> Not suported video </video>
        </div>
    </div>)
}

export default Chat