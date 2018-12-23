import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as common from '../constants';

function makeTrackRow(y, yrowTracks){
    let newTrackPieces = [];
    for (let x = 0; x < yrowTracks.length; x++) {             
        let { track, tracksection} = yrowTracks[x];
        if(track === true){
            let { svg } = tracksection;
            newTrackPieces.push({tracksection: svg, xCoord: (x + 1) * 10, yCoord: (y + 1) * 10})
        }
    }
    let results = newTrackPieces.map(tracks => {return <use key={common.generateUniqueId()} className='tSienna' href={tracks.tracksection} x={tracks.xCoord} y={tracks.yCoord}></use>});
    
    return results;
}

class Tracks extends Component {

    render () {        
        let {tracks} = this.props;
        let y = 0;
        return (
            <svg id='tracks' key={common.generateUniqueId()} >
                <defs>
                    <path id='topcornerleft' d='M5,10 A 5 5 180 0 1 10,5' fill='none' strokeWidth='1'/>
                    <line id='horizontal' x1='0' y1='5' x2='10' y2='5'/>
                    <path id='topcornerright' d='M0,5 A 5 5 180 0 1 5,10' fill='none' strokeWidth='1'/>  
                    <path id='bottomcornerright' d='M5,0 A 5 5 0 0 1 0,5' fill='none' strokeWidth='1'/>  
                    <path id='bottomcornerleft' d='M5,0 A 5 5 180 0 0 10,5' fill='none' strokeWidth='1'/>
                    <line id='vertical' x1='5' y1='0' x2='5' y2='10' />
                    <g id='intersection' >
                        <line x1='5' y1='0' x2='5' y2='10' />                
                        <line x1='0' y1='5' x2='10' y2='5' />                
                    </g>
                </defs>
                {              
                    tracks.map(yrowTracks => {return makeTrackRow(y++, yrowTracks)})            
                }
            </svg>
        )
    }    
}

function mapStateToProps(state){
    return {      
      tracks: state.tracks
    };
}
  
export default connect(mapStateToProps)(Tracks);