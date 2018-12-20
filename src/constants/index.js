export const CARTDIRECTION = {up: '^', down: 'v', left: '<', right: '>'};
export const TURNORDER = ['left', 'straight', 'right'];
export const TRACK_SECTIONS = {
    vertical:{svg: '#vertical', display: '|', corner: false},     
    horizontal:{svg: '#horizontal', display: '-', corner: false},    
    tlc:{svg: '#topcornerleft', display: '/', corner: true},
    blc:{svg: '#bottomcornerleft', display: '\\', corner: true},
    trc:{svg: '#topcornerright', display: '\\', corner: true},
    brc:{svg: '#bottomcornerright', display: '/', corner: true},
    intersection:{svg: '#intersection', display: '+', corner: false}    
}

export const CARTCOLORS = ['cDBlue','cDCyan','cDGold','cDGreen','cDKhaki','cDOrange','cDOrchid','cDRed','cDSGreen','cDSBlue','cDSGray','cDTurquois','cDViolet','cDSkyBlue','cDPink','cGreenYellow','cOliveDrab']
const MOVEINSTRUCTIONS = [
    {
        turn: '+',               
    },
    {
        up: '|',
        x: 0,
        y: -1
    },
    {
        down: '|',
        x: 0,
        y: 1
    },
    {
        left: '-',
        x: -1,
        y: 0
        
    },
    {
        right: '-',
        x: 1,
        y: 0
    }
];

let uniqueId = 0;
export function generateUniqueId(){
    return uniqueId++;
}

export function getNextTurn(currentMove){
    switch (currentMove){
        case TURNORDER[0]:
            return TURNORDER[1];
        case TURNORDER[1]:
            return TURNORDER[2];
        case TURNORDER[2]:
            return TURNORDER[0];
        default:
            return TURNORDER[0];
    }
}

export function makeCornerTurn(currentDirection, tracksection){    
    if(tracksection.corner === true ){
        if(tracksection.svg === '#topcornerleft'){
            if(currentDirection === CARTDIRECTION.up) return changeCartDirection(currentDirection, TURNORDER[2]);
            if(currentDirection === CARTDIRECTION.left) return changeCartDirection(currentDirection, TURNORDER[0]);
        }
        if(tracksection.svg === '#bottomcornerleft'){
            if(currentDirection === CARTDIRECTION.down) return changeCartDirection(currentDirection, TURNORDER[0]);
            if(currentDirection === CARTDIRECTION.left) return changeCartDirection(currentDirection, TURNORDER[2]);
        }
        if(tracksection.svg === '#topcornerright'){
            if(currentDirection === CARTDIRECTION.up) return changeCartDirection(currentDirection, TURNORDER[0]);
            if(currentDirection === CARTDIRECTION.right) return changeCartDirection(currentDirection, TURNORDER[2])
        }
        if(tracksection.svg === '#bottomcornerright'){
            if(currentDirection === CARTDIRECTION.down) return changeCartDirection(currentDirection, TURNORDER[2]);
            if(currentDirection === CARTDIRECTION.right) return changeCartDirection(currentDirection, TURNORDER[0])
        }

    }
    return changeCartDirection(currentDirection, TURNORDER[1]);

}
export function changeCartDirection(currentDirection, turn){
    switch(turn){
        case TURNORDER[0]:   //left
            switch(currentDirection){
                case CARTDIRECTION.up:
                    return CARTDIRECTION.left;
                case CARTDIRECTION.down:
                    return CARTDIRECTION.right;
                case CARTDIRECTION.left:
                    return CARTDIRECTION.down;
                case CARTDIRECTION.right:
                    return CARTDIRECTION.up;
                default:
                    break;
            }
            break;
        case TURNORDER[1]: //straight
            return currentDirection;
        case TURNORDER[2]: // right
            switch(currentDirection){
                case CARTDIRECTION.up:
                    return CARTDIRECTION.right;
                case CARTDIRECTION.down:
                    return CARTDIRECTION.left;
                case CARTDIRECTION.left:
                    return CARTDIRECTION.up;
                case CARTDIRECTION.right:
                    return CARTDIRECTION.down;
                default:
                    break;
            }
            break;
        default:
            break;
    }
}

export function getMoveInstruction(cartDirection){
    switch (cartDirection) {
        case CARTDIRECTION.up:
            return MOVEINSTRUCTIONS[1];            
        case CARTDIRECTION.down:
            return MOVEINSTRUCTIONS[2];
        case CARTDIRECTION.left:
            return MOVEINSTRUCTIONS[3];
        case CARTDIRECTION.right:
            return MOVEINSTRUCTIONS[4];

        default:
            break;
    }
}


export class CartCollisionException {
    constructor(x, y) {
        this.value = [{ x, y }];
        this.message = `collison at (${x},${y})`;
        this.toString = this.message;
    }
}