import React, { Component } from 'react'
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


class Chat extends Component {

    // UI STATE 
    constructor(props) {
        super(props);
        this.connection = undefined;
        this.state = {
            currentSession: {},
            rooms: {},
            isLogin: true,
            isConnected: false,
            userId: '',
            room: '',
            message: ''
        }

    }

    componentDidMount() {
        // Retriving initial data 
        fb.getDbInstance()
            .ref('rooms/')
            .once('value', snapshot => this.setState({ rooms: snapshot.val() }))

        fb.getDbInstance()
            .ref('rooms/')
            .on('child_changed', this.roomUpdatedHandler)
    }

    // CONNECTION STATE 
    roomAddedHandler = value => {
        const rooms = {
            ...this.state.rooms,
            [value.room]: value
        }
        this.setState({ rooms })
    }



    roomUpdatedHandler = snapshot => {
        // if my room had been updated
        const updated = snapshot.val();
        console.log(updated)
        if (this.state.room === updated.room) {
            if (!this.state.isConnected) {
                if (this.state.initiator) {
                    if(updated.secondUser.candidate !== ""){
                        this.connection.signal(updated.secondUser.candidate)
                    }
                } else {
                    this.connection.signal(updated.firstUser.candidate)
                }
            }
            this.setState({ currentSession: updated })
        }

    }


    overlayHandler = () => this.setState({ isLogin: !this.state.isLogin });
    // INPUT HANDLERS 
    userHandler = input => {
        const value = input.target.value.trim()
        this.setState({ userId: value })
    }
    roomHandler = input => {
        const value = input.target.value.trim()
        this.setState({ room: value })
    }
    messageHandler = input => {
        const value = input.target.value
        this.setState({ message: value })
    }


    logginHandler = () => {

        const exist = Object.keys(this.state.rooms).find(key => key.room == this.state.room)
        console.log(exist)

        if (exist) {
            console.log('cuando existe')
            this.setState({
                isLogin: false,
                initiator: false,
                currentSession: exist
            })
        } else {
            console.log('cuando no existe')
            this.setState({
                isLogin: false,
                initiator: true
            })
        }

    }

    sendMessage = () => {
        if (this.connection) {
            const message = {
                user: this.state.userId,
                message: this.state.message
            };
            this.connection.send(message)
        }
    }


    handleLocalStream = (stream) => {
        console.log('entro')
        if (!this.connection) {

            this.connection = this.state.initiator
                ? new SimplePeer({ initiator: true, stream: stream })
                : new SimplePeer({ stream: stream })

            this.connection.on('signal', candidate => {
                if (!this.state.currentSession.room) {
                    console.log('entro x1')
                    const newRoom = {
                        room: this.state.room,
                        firstUser: { id: this.state.userId, candidate },
                        secondUser: { id: '', candidate: '' },
                        isFull: false
                    }
                    fb.getDbInstance()
                        .ref('rooms/' + this.state.room)
                        .set(newRoom)

                } else {
                    console.log('entro x2')
                    const updated = {
                        ...this.state.currentSession,
                        secondUser: { id: this.state.userId, candidate },
                        isFull: true
                    }
                    fb.getDbInstance()
                        .ref('rooms/' + updated.room)
                        .update(updated)

                }
            })

            this.connection.on('connect', data => {
                console.log('Conectadoooooo')
                this.setState({ isConnected: true })
            })

        } else {


        }
    }


    render() {

        const chatContainer = this.state.isLogin === false ? (
            <div className={classes.History}>
                <video id="remote-video" className={classes.RemoteVideo} />
                <div className={classes.LocalVideo}>
                    <Camera stream={this.handleLocalStream} />
                </div>
            </div>
        ) : null

        return (<div className={classes.Chat} >
            <div className={classes.Message} >
                <input
                    type="text"
                    onChange={this.messageHandler}
                    value={this.state.message}
                    placeholder="write a message =)" />
                <button onClick={this.sendMessage} > send </button >

            </div>
            <div className={classes.Users} > Connected Users</div>
            <div className={classes.Login} >
                <p>Usuario: {this.state.userId}</p>
                <p>Room: {this.state.room}</p>
            </div>

            {chatContainer}

            <Overlay
                color="rgba(0,0,0,0.8)"
                active={this.state.isLogin}
                closed={this.overlayHandler}>
                <input type="text"
                    onChange={this.userHandler}
                    placeholder="User name"
                    value={this.state.userId} />
                <input
                    type="text"
                    placeholder="Room to join"
                    onChange={this.roomHandler}
                    value={this.state.room} />
                <button onClick={this.logginHandler} > login </button >
            </Overlay>
        </div >)
    }
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
        onRoomAdded: roomAdded => dispatch({ type: types.ON_ROOM_ADDED, payload: { roomAdded } }),
        onRoomUpdated: room => dispatch({ type: types.ON_ROOM_UPDATED, payload: { room } }),
        onLogin: (user, room) => dispatch({ type: types.ON_LOGIN, payload: { user, room } })
    }
}

export default Chat