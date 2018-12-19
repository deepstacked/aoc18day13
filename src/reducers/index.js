import * as actionTypes from '../actiontypes';

export default function cartReducer(state, action){
    switch (action.type) {
        case actionTypes.LOAD_INITIAL_DATA:
            return {...state, tracks:action.tracks, carts:action.carts, turn: action.turn};
        case actionTypes.DO_ONE_TURN:
            return {...state, carts: action.carts, turn: action.turn} ;
        case actionTypes.WARN_ABOUT_COLLISION:
            return {...state, collision: action.collision, collisionMsg: action.collisionMsg};
        default:
            return {...state};
    }    
}