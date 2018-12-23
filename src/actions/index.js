import * as actionTypes from '../actiontypes';
import * as common from '../constants';
import * as input from '../constants/input';

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
            let intersection = false;
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
        } else {
            tracksection = common.TRACK_SECTIONS.tlc;
            sawtcl = true;
        }
    } else if (trackLetter === '\\') {
        if (sawtcl === true) {
            tracksection = common.TRACK_SECTIONS.trc;
            sawtcl = false;
        } else {
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
    switch(trackLetter){
        case common.CARTDIRECTION.right:
        case common.CARTDIRECTION.left:
            return common.TRACK_SECTIONS.horizontal.display;
        case common.CARTDIRECTION.up:
        case common.CARTDIRECTION.down:
            return common.TRACK_SECTIONS.vertical.display;
        default:
            return trackLetter
    }
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
                carts.push({id: common.generateUniqueId(), x: x++, y: y, direction: direction, nextTurn: common.TURNORDER[0], css: common.CARTCOLORS[colorize++], status: common.CARTSTATUS.alive});
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
    if(a.y < b.y) return -1;
    if(a.y > b.y) return 1;
        
    if(a.x < b.x) return -1;
    if(a.x > b.x ) return 1;
    return 0;    
}

function cartsAlive(carts){
    return carts.filter(cart => cart.status === common.CARTSTATUS.alive);
}
function cartsAliveCount(carts){
    return cartsAlive(carts).length;
}

function isTrackOccupiedatXY(movedCarts, x, y){
    let cartIdx = movedCarts.findIndex(cart => cart.x === x && cart.y === y && cart.status === common.CARTSTATUS.alive);    
    return  cartIdx;
}

function doOneTurn(tracks, carts, collisions, crashoption){    
    //let movedCarts = carts.map(cart => {return {id: cart.id, x: cart.x, y: cart.y, direction: cart.direction, nextTurn: cart.nextTurn, css: cart.css, status: cart.status}} );    
    let movedCarts = carts.map(cart => {return cart});    
    let newcollisions = collisions.map(collision => {return collision})
    
    movedCarts.sort(sortCarts);    

    for (let cartIdx = 0; cartIdx < movedCarts.length; cartIdx++) {
        let cart = movedCarts[cartIdx];
        if(cart.status !== common.CARTSTATUS.alive) continue;
        
        let { direction, x, y, nextTurn} = cart;
        let moveInstruction = common.getMoveInstruction(direction);
        let nextTrack = tracks[y+moveInstruction.y][x+moveInstruction.x];

        if(nextTrack.track === true){

            let otherCartIdx = isTrackOccupiedatXY(movedCarts, nextTrack.x, nextTrack.y);
            let occupied = otherCartIdx !== -1;
            if(occupied){
                cart.status = common.CARTSTATUS.crashed;
                cart.x = nextTrack.x;
                cart.y = nextTrack.y;                
                newcollisions.push({id: common.generateUniqueId(), x: nextTrack.x, y: nextTrack.y, cartid: cart.id});
                if(crashoption === 'first'){
                    break;
                } else {
                    movedCarts[otherCartIdx].status = common.CARTSTATUS.crashed;
                }
                
            } else {
                if(nextTrack.intersection === true){
                    direction = common.changeCartDirection(direction, nextTurn);
                    
                    nextTurn = common.getNextTurn(nextTurn);
                }
                if(nextTrack.tracksection.corner === true){
                    direction = common.makeCornerTurn(direction, nextTrack.tracksection);
                    
                }
                
                cart.x = nextTrack.x;
                cart.y = nextTrack.y;                
                cart.direction = direction;
                cart.nextTurn = nextTurn;                
            }
        
        } else {
            // some error. Has to be a track.
            console.log("Next Track not found", cart, moveInstruction);            
        }
    }

    return {movedCarts, newcollisions};
}

export function doAllNoDelay(tracks, carts){
    let collisions = [];
    
    let {movedCarts, newcollisions} = doOneTurn(tracks, carts, collisions, 'last');
    let loopidx = 0
    let cartCount = cartsAliveCount(movedCarts);

    while(cartCount > 1){
        loopidx++;
        ({movedCarts, newcollisions} = doOneTurn(tracks, movedCarts, newcollisions, 'last'));
        cartCount = cartsAliveCount(movedCarts);
    }

    if(newcollisions.length > 0 || cartCount === 1) {
        return {
            type: actionTypes.WARN_ABOUT_COLLISION,
            collisions: newcollisions,
            carts: movedCarts,
            cartsalive: cartCount,
            turn: loopidx
        }
    }
}

export function loadInitialData(){
    var carts = createCarts(initialTracks)
    return {
        type: actionTypes.LOAD_INITIAL_DATA,
        tracks: makeTracks(initialTracks),
        carts: carts,
        cartsalive: carts.length,
        turn: _turn++   
    }
}

export function advanceCarts(tracks, carts, collisions, crashoption){
    let {movedCarts, newcollisions} = doOneTurn(tracks, carts, collisions, crashoption);
    let cartsalive = cartsAliveCount(movedCarts);
    if(newcollisions.length > 0 || cartsalive === 1) {
        return {
            type: actionTypes.WARN_ABOUT_COLLISION,
            collisions: newcollisions,
            carts: movedCarts,
            cartsalive: cartsalive,
            turn: _turn++
        }
    } else {
        return {
            type: actionTypes.DO_ONE_TURN,
            carts: movedCarts,             
            turn: _turn++
        }
    }
}

export function startTimer(timer, crashoption){
    return {
        type: actionTypes.START_TIMER_RUN,
        timer: timer,
        running: true,
        crashoption: crashoption
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
    var carts = createCarts(initialTracks);
    
    return{
        type: actionTypes.RESET_CARTS_COLLISIONS,
        carts: carts,
        cartsalive: carts.length,
        collisions: [],        
        turn: 0
    }
}
