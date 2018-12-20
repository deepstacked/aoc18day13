import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as common from '../constants';

function makeCollisions(collision){
    console.log("Collisions::makeCollisions", collision);
    return <use key={common.generateUniqueId()} href="#collision" x={(collision.x+1) * 10} y={(collision.y+1) * 10} />    
}

class Collisions extends Component {

    componentDidUpdate(prevProps){
        console.log('Collisions::componentDidUpdate', prevProps, this.props);
    }

    render () {
        let { collisions } = this.props;
        if(typeof collisions === 'undefined') return null;
        return (
            <svg id="collisions" key={common.generateUniqueId()} >
                <g id='collision' stroke="red">
                    <line x1="0" y1="0" x2="10" y2="10" />
                    <line x1="0" y1="10" x2="10" y2="0" />
                </g>
                <rect x='0' y='0' height='10' width='10' fill="white"/>
            {
                collisions.map(collision => {return makeCollisions(collision)})
            }
            </svg>
        )
    }    
}

function mapStateToProps(state){ 
    console.log("Collisions::mapStateToProps", state);
    return {      
        collisions: state.collisions
    };
  }
export default connect(mapStateToProps)(Collisions);