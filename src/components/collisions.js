import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as common from '../constants';

function makeCollisions(collision){
    return <use key={common.generateUniqueId()} className='strokeRed' href="#collision" x={(collision.x+1) * 10} y={(collision.y+1) * 10} />    
}

class Collisions extends Component {
    shouldComponentUpdate(nextProps){
        // collisions get returned from the call regardless of any updates. so filter out renders that shouldn't happen.
        return nextProps.collisions.length !== this.props.collisions.length;
    }

    render () {
        let { collisions } = this.props;
        if(typeof collisions === 'undefined') return null;
        return (
            <svg id="collisions" key={common.generateUniqueId()} >
                <defs>
                    <g id='collision'>
                        <line x1="0" y1="0" x2="10" y2="10" />
                        <line x1="0" y1="10" x2="10" y2="0" />
                    </g>
                </defs>
            {
                collisions.map(collision => {return makeCollisions(collision)})
            }
            </svg>
        )
    }    
}

function mapStateToProps(state){    
    return {      
        collisions: state.collisions
    };
  }
export default connect(mapStateToProps)(Collisions);