import types from '../actions/chat'

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
            return { ...state, ...payload }

        case types.ON_LOGIN:

            const check = state.rooms[payload.room] || false
            console.log('check', check);
            
            return {
                ...state,
                userName: payload.user,
                roomName: !check? payload.room : check
            }

        default:
            return state
    }
}
