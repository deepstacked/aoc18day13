import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as common from '../constants';
import { Badge } from 'reactstrap';

class TrackInfo extends Component {
    calcTracks = (tracks) => {
        let numTracks = 0;
        let numIntersections = 0;
        let numVerticals = 0;
        let numHorizontals = 0;
        let numtlc = 0;
        let numtrc = 0;
        let numblc = 0;
        let numbrc = 0;
        tracks.forEach(trackrow => {            
            trackrow.forEach(track => {
                if(track.track === true){
                    numTracks += 1;                
                    let { tracksection } = track;
                    let { svg } = tracksection;
                    switch(svg){
                        case common.TRACK_SECTIONS.intersection.svg:
                            numIntersections += 1;
                            break;
                        case common.TRACK_SECTIONS.vertical.svg:
                            numVerticals += 1;
                            break;
                        case common.TRACK_SECTIONS.horizontal.svg:
                            numHorizontals += 1;
                            break;
                        case common.TRACK_SECTIONS.tlc.svg:
                            numtlc += 1;
                            break;
                        case common.TRACK_SECTIONS.trc.svg:
                            numtrc += 1;
                            break;
                        case common.TRACK_SECTIONS.blc.svg:
                            numblc += 1;
                            break;
                        case common.TRACK_SECTIONS.brc.svg:
                            numbrc += 1;
                            break;
                        default:
                            break;
                    }
                }
            });
        })
        return {numTracks, numIntersections, numVerticals, numHorizontals, numtlc, numtrc, numblc, numbrc};
    }
    render () {        
        if(this.props.tracks.length === 0) return null;
        let {numTracks, numIntersections, numVerticals, numHorizontals, numtlc, numtrc, numblc, numbrc} = this.calcTracks(this.props.tracks);
        return (
            <>
                <Badge color='info' className='mt-2 mr-2'>Tracks: {numTracks}</Badge>
                <Badge color='info' className='mt-2 mr-2'>Intersections: {numIntersections}</Badge>
                <Badge color='info' className='mt-2 mr-2'>Vertical: {numVerticals}</Badge>
                <Badge color='info' className='mt-2 mr-2'>Horizontal: {numHorizontals}</Badge>
                <Badge color='info' className='mt-2 mr-2'>TLC: {numtlc}</Badge>
                <Badge color='info' className='mt-2 mr-2'>TRC: {numtrc}</Badge>
                <Badge color='info' className='mt-2 mr-2'>BLC: {numblc}</Badge>
                <Badge color='info' className='mt-2 mr-2'>BRC: {numbrc}</Badge>
            </>
        )
         ;
    }    
}

function mapStateToProps(state){ 
    return {      
      tracks: state.tracks      
    };
  }
export default connect(mapStateToProps)(TrackInfo);