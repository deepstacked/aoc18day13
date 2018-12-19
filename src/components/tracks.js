import React, { Component } from 'react';
import * as common from '../constants';

function makeCart(cart){    
    let newCart = false;
    let whichCart = '';
    let {x,  y, display } = cart;
    if(display === common.CARTDIRECTION.up){
        newCart = true;
        whichCart = '#cartup';
    }
    if(display === common.CARTDIRECTION.down){
        newCart = true;
        whichCart = '#cartdown';
    }
    if(display === common.CARTDIRECTION.left){
        newCart = true;
        whichCart = '#cartleft';
    }
    if(display === common.CARTDIRECTION.right){
        newCart = true;
        whichCart = '#cartright';
    }

    if(newCart === true){
        return <use key={common.generateUniqueId()} href={whichCart} x={(x+1) * 10} y={(y+1) * 10} />
    }
}

function makeTrackRow(y, yrowTracks){
    let newTrackPieces = [];
    for (let x = 0; x < yrowTracks.length; x++) {             
        let { track, tracksection} = yrowTracks[x];        
        if(track === true){
            let { svg } = tracksection;
            newTrackPieces.push({tracksection: svg, xCoord: (x + 1) * 10, yCoord: (y + 1) * 10})
        }
    }
    /*let results = newTrackPieces.map(tracks => {return <use key={common.generateUniqueId()} href={tracks.tracksection} x={tracks.xCoord} y={tracks.yCoord}></use>});   */
    
    return '';
}


class Tracks extends Component {

    componentDidUpdate(prevProps){
        console.log('Tracks::componentDidUpdate', prevProps, this.props);
    }
    render () {
        let {tracks, carts} = this.props;
        let y = 0;
    return (
        <svg key={common.generateUniqueId()} viewBox='0 0 1600 1600' xmlns='http://www.w3.org/2000/svg'>
            <path id='topcornerleft' d='M5,10 A 5 5 180 0 1 10,5' fill='none' stroke='sienna' strokeWidth='1'/>
            <line id='horizontal' x1='0' y1='5' x2='10' y2='5' stroke='sienna'/>
            <path id='topcornerright' d='M0,5 A 5 5 180 0 1 5,10' fill='none' stroke='sienna' strokeWidth='1'/>  
            <path id='bottomcornerright' d='M5,0 A 5 5 0 0 1 0,5' fill='none' stroke='sienna' strokeWidth='1'/>  
            <path id='bottomcornerleft' d='M5,0 A 5 5 180 0 0 10,5' fill='none' stroke='sienna' strokeWidth='1'/>
            <line id='vertical' x1='5' y1='0' x2='5' y2='10' stroke='sienna'/>
            <g id='intersection' stroke='sienna'>
                <line x1="5" y1="0" x2="5" y2="4.75" />
                <line x1="5" y1="10" x2="5" y2="5.25" />
                <line x1="0" y1="5" x2="4.75" y2="5" />
                <line x1="10" y1="5" x2="5.25" y2="5" />
            </g>  
            <g id='cartdown' fill='blue'>
                <polygon points='5 7.5, 4 6, 6 6'/> 
                <rect x='4' y='2' height='4' width='2' />
            </g>
            <g id='cartright' fill='blue'>
                <polygon points='7.5 5, 6 6, 6 4'/> 
                <rect x='2' y='4' height='2' width='4' />   
            </g>
            <g id='cartleft' fill='blue'>                
                <polygon points='2.5 5, 4 6, 4 4'/> 
                <rect x='4' y='4' height='2' width='4' />
            </g>
            <g id='cartup' fill='blue'>
                <polygon points='4 4, 5 2.5, 6 4'/>      
                <rect x='4' y='4' height='4' width='2' />    
            </g>
            <rect x='0' y='0' height='10' width='10' />
          {              
              tracks.map(yrowTracks => {return makeTrackRow(y++, yrowTracks)})            
          }
          {
              carts.map(cart => {return makeCart(cart)})
          }
    
    </svg>
    )
        }
    
}

export default Tracks;