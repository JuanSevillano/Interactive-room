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
            return {
                ...state,
                userName: payload.user,
                roomName: payload.room
            }

        default:
            return state
    }
}
