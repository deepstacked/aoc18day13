import * as actionTypes from '../actiontypes';
import * as common from '../constants';
import * as input from '../constants/input';

/*var initialTracks = [
    "/->-\\ ",
    "|   |  /----\\ ",
    "| /-+--+-\\  |",
    "| | |  | v  |",
    "\\-+-/  \\-+--/ ",
    "  \\------/ ",
];*/

var initialTracks = input.initialTracks;

var _turn = 0;

function makeTracks(trackInput){
    let yIdx = 0;
    let tracks = [];
    trackInput.forEach(element => {
        let x = 0;
        let y = yIdx++;
        tracks.push(y);
        tracks[y] = [];
        let sawtcl, sawbcl = false;
        
        [...element].forEach(char => {
            tracks[y].push(x);
            let trackLetter = char;
            let intersection;
            let track = true;
            let tracksection = '';

            trackLetter = updateOccupiedTrackLetter(trackLetter);

            if(trackLetter === ' '){
                track = false;                
            }
            if(trackLetter === '+'){
                intersection = true;
                tracksection = common.TRACK_SECTIONS.intersection;
            }
            if(trackLetter === '|'){
                tracksection = common.TRACK_SECTIONS.vertical;
            }
            if(trackLetter === '-'){
                tracksection = common.TRACK_SECTIONS.horizontal;
            }

            ({ tracksection, sawbcl, sawtcl } = calculateCorners(trackLetter, tracksection, sawbcl, sawtcl));
            
            let trackPiece = {id: common.generateUniqueId(), x: x, y: y, display: trackLetter, intersection: intersection, track: track, tracksection: tracksection};
            tracks[y][x]= (trackPiece)
            x++                        
        })        
    })
    return tracks;
}

// because the same characters are used for the top left/bottom right 
// and then bottom left/top right we need to figure out which it is.
// processing happens from left to right in a row. Use that to figure out
// what corner it is based on the previous (if any) results.
function calculateCorners(trackLetter, tracksection, sawbcl, sawtcl) {    
    if (trackLetter === '/') {
        if (sawbcl === true) {
            tracksection = common.TRACK_SECTIONS.brc;
            sawbcl = false;
        }
        else {
            tracksection = common.TRACK_SECTIONS.tlc;
            sawtcl = true;
        }
    }
    if (trackLetter === '\\') {
        if (sawtcl === true) {
            tracksection = common.TRACK_SECTIONS.trc;
            sawtcl = false;
        }
        else {
            tracksection = common.TRACK_SECTIONS.blc;
            sawbcl = true;
        }
    }
    return { tracksection, sawbcl, sawtcl };
}

// if the character is a cart we still need to figure out 
// the underlying track piece so when the cart moves we can 
// know what track it is
function updateOccupiedTrackLetter(trackLetter) {
    if (trackLetter === '>' || trackLetter === '<') {
        trackLetter = '-';
    }
    if (trackLetter === '^' || trackLetter === 'v') {
        trackLetter = '|';
    }
    return trackLetter;
}

function createCarts(trackInput){
    let yIdx = 0;
    let carts = [];
    let colorize = 0;
    trackInput.forEach(element => {
        let x = 0;
        let y = yIdx++;
        
        [...element].forEach(trackLetter => {            
            let newCart = false;
            let direction = '';            
            
            if(trackLetter === '>'){
                direction = common.CARTDIRECTION.right;
                newCart = true;
            }
            if(trackLetter === '<'){
                direction = common.CARTDIRECTION.left
                newCart = true;
            }
            if(trackLetter === '^'){
                direction = common.CARTDIRECTION.up;
                newCart = true;
            }
            if(trackLetter === 'v'){
                direction = common.CARTDIRECTION.down;
                newCart = true;
            }
           
            if(newCart === true){
                carts.push({id: common.generateUniqueId(), x: x++, y: y, display: trackLetter, direction: direction, nextTurn: common.TURNORDER[0], css: common.CARTCOLORS[colorize++]});
            } else { 
                x++;                
            }
        })
    })
    return carts;
}

// carts are sorted first by the Y (up or down) and then by the X.
// we need carts that are lower Y to go first. If the y is the 
// same then look at the X coord
function sortCarts(a, b){    
    if(a.y > b.y) return 1;
    if(a.y < b.y) return -1;    
    if(a.y === b.y && a.x < b.x) return -1;
    if(a.y === b.y && a.x > b.x ) return 1;
    return 0;    
}

function findOccupiedTracks(tracks, carts){
    let filteredTracks = carts.map(cart => {
        return tracks[cart.y][cart.x]       
    })
    return filteredTracks.map(track => {return {x: track.x, y: track.y}});
}

function doOneTurn(tracks, carts){
    // need to mutate carts but do not want to change original until at the end so state is updated properly.    
    let movedCarts = carts.map(cart => {return {id: cart.id, x: cart.x, y: cart.y, display: cart.display, direction: cart.direction, nextTurn: cart.nextTurn, css: cart.css}} );
    let collisions = [];

    movedCarts.sort(sortCarts);    

    for (let cartIdx = 0; cartIdx < carts.length; cartIdx++) {
        let cart = movedCarts[cartIdx];
        let occupiedTracks = findOccupiedTracks(tracks, movedCarts);
        let { direction, x, y, nextTurn, display} = cart;
        let moveInstruction = common.getMoveInstruction(direction);
        let nextTrack = tracks[y+moveInstruction.y][x+moveInstruction.x];
        if(nextTrack.track === true){
            let isOccupied = false;           
            for (let x = 0; x < occupiedTracks.length; x++) {
                let occupiedTrack = occupiedTracks[x];
                if(nextTrack.x === occupiedTrack.x && nextTrack.y === occupiedTrack.y){
                    isOccupied = true;
                    break;
                }                
            }
            if(isOccupied === true){
                collisions.push({id: common.generateUniqueId(), x: nextTrack.x, y: nextTrack.y, cartid: cart.id});
                break;
            } else {
                if(nextTrack.intersection === true){
                    direction = common.changeCartDirection(direction, nextTurn);
                    display = direction;
                    nextTurn = common.getNextTurn(nextTurn);
                }
                if(nextTrack.tracksection.corner === true){
                    direction = common.makeCornerTurn(direction, nextTrack.tracksection);
                    display = direction;
                }
                
                cart.x = nextTrack.x;
                cart.y = nextTrack.y;
                cart.display = display;
                cart.direction = direction;
                cart.nextTurn = nextTurn;                
            }                        
        } else {
            // some error. Has to be a track.
        }
    }

    return {movedCarts, collisions};
}

export function loadInitialData(){    
    return {
        type: actionTypes.LOAD_INITIAL_DATA,
        tracks: makeTracks(initialTracks),
        carts: createCarts(initialTracks),
        turn: _turn++   
    }
}

export function advanceCarts(tracks, carts){
    var { movedCarts, collisions} = doOneTurn(tracks, carts);
    
    if(collisions.length > 0) {
        return {
            type: actionTypes.WARN_ABOUT_COLLISION,
            collisions: collisions,
            carts: movedCarts
        }
    } else {
        return {
            type: actionTypes.DO_ONE_TURN,
            carts: movedCarts,             
            turn: _turn++
        }
    }
}

export function startTimer(timer){
    return {
        type: actionTypes.START_TIMER_RUN,
        timer: timer,
        running: true
    }
}

export function stopTimer(timer){
    if(timer !== 0) clearInterval(timer);
    return {
        type: actionTypes.STOP_TIMER_RUN,
        timer: 0,
        running: false
    }
}

export function resetCartsAndCollisions() {    
    return{
        type: actionTypes.RESET_CARTS_COLLISIONS,
        carts: createCarts(initialTracks),
        collisions: [],
        turn: 0
    }
}
