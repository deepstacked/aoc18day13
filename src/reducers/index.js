import * as actionTypes from '../actiontypes';

const initialState = {
    carts: [],
    tracks: [],
    collisions: [],    
    turn: 0,    
    running: false,
    timer: 0
}

export default function cartReducer(state = initialState, action){
    switch (action.type) {
        case actionTypes.LOAD_INITIAL_DATA:
            return {...state, tracks:action.tracks, carts:action.carts, turn: action.turn};
        case actionTypes.DO_ONE_TURN:
            return {...state, carts: action.carts, turn: action.turn} ;
        case actionTypes.WARN_ABOUT_COLLISION:
            return {...state, collisions: action.collisions, carts: action.carts};
        case actionTypes.START_TIMER_RUN:        
        case actionTypes.STOP_TIMER_RUN:
            return {...state, timer: action.timer, running: action.running};            
        default:
            return {...state};
    }    
}