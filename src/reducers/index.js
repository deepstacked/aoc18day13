import * as actionTypes from '../actiontypes';
import { createSelector } from 'reselect';

const initialState = {
    carts: [],
    tracks: [],
    collisions: [],    
    turn: 0,    
    running: false,
    timer: 0,
    crashoption: 'first',
    cartsalive: 0
}

export default function cartReducer(state = initialState, action){
    switch (action.type) {
        case actionTypes.LOAD_INITIAL_DATA:
            return {...state, tracks:action.tracks, carts:action.carts, turn: action.turn};
        case actionTypes.DO_ONE_TURN:
            return {...state, carts: action.carts, turn: action.turn} ;
        case actionTypes.WARN_ABOUT_COLLISION:
            return {...state, collisions: action.collisions, carts: action.carts, cartsalive: action.cartsalive, turn: action.turn};
        case actionTypes.START_TIMER_RUN:
            return {...state, timer: action.timer, running: action.running, crashoption: action.crashoption};
        case actionTypes.STOP_TIMER_RUN:
            return {...state, timer: action.timer, running: action.running};
        case actionTypes.RESET_CARTS_COLLISIONS:
            return {...state, carts: action.carts, collisions: action.collisions, turn: action.turn};
        default:
            return {...state};
    }    
}

const getCollisions = state => state.collisions;
