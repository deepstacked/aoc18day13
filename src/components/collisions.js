import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as common from '../constants';

function makeCollisions(collision){    
    return <use key={common.generateUniqueId()} className='strokeRed' href="#collision" x={(collision.x+1) * 10} y={(collision.y+1) * 10} />    
}

class Collisions extends Component {

    componentDidUpdate(prevProps){
    }

    render () {
        console.log("collisions::render");
        let { collisions } = this.props;
        if(typeof collisions === 'undefined') return null;
        return (
            <svg id="collisions" key={common.generateUniqueId()} >
                <g id='collision'>
                    <line x1="0" y1="0" x2="10" y2="10" />
                    <line x1="0" y1="10" x2="10" y2="0" />
                </g>                
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