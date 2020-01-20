import SimplePeer from 'simple-peer';
import fb from '../../firebase-config';
import types from '../actions/chat'

let connection;
const initialState = {

    rooms: {},
    userName: 'invited',
    roomName: '',
    isConnected: false,
    isInitial: false,
    myPeer: '',
    otherPeer: '',

}


export default (state = initialState, { type, payload }) => {
    switch (type) {

        case types.ON_INITIAL_ROOMS:
            console.log('entra aquí papu')
            return { ...state, ...payload }

        case types.ON_LOGIN:

            const check = state.rooms[payload.room] || false
            if (check) {
                console.log('check', check)

                const updated = {
                    ...check,
                    secondUser: { id: payload.user, candidate: '' },
                    isFull: true
                }

                fb.getDbInstance()
                    .ref('rooms/' + check.room )
                    .update(updated)

                return {
                    ...state,
                    userName: payload.user,
                    roomName: payload.room,
                    isInitial: false,
                }
            } else {
                console.log('new room')
                connection = new SimplePeer()
                const newRoom = {
                    room: payload.room,
                    firstUser: { id: payload.user, candidate: '' },
                    secondUser: { id: '', candidate: '' },
                    isFull: false
                }
                fb.getDbInstance()
                    .ref('rooms/' + payload.room)
                    .set(newRoom)
                return {
                    ...state,
                    userName: payload.user,
                    roomName: payload.room,
                    isInitial: true,
                }
            }

        case types.ON_ROOM_ADDED:
            console.log('payload', payload.roomAdded)
            return {
                ...state,
                rooms: { ...state.rooms, ...payload.room }
            }

        case types.ON_ROOM_UPDATED:
            console.log(payload)
            return {
                ...state,
            }

        default:
            return initialState
    }
}
