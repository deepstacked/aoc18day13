import React, { Component } from 'react';
import { connect } from 'react-redux';
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

class Carts extends Component {

    componentDidUpdate(prevProps){
        console.log('Carts::componentDidUpdate', prevProps, this.props);
    }

    render () {
        let { carts } = this.props;
        return (
            <svg id="carts" key={common.generateUniqueId()}>
                <g id='cartup' fill='green'>
                    <polygon points='3 4, 5 2, 7 4'/>      
                    <rect x='3' y='4' height='4' width='4' />    
                </g>
                  <g id='cartdown' fill='green'>
                    <polygon points='5 8, 3 6, 7 6'/> 
                    <rect x='3' y='2' height='4' width='4' />
                </g>
                  <g id='cartleft' fill='green'>                
                    <polygon points='2 5, 4 7, 4 3'/> 
                    <rect x='4' y='3' height='4' width='4' />
                </g>
                <g id='cartright' fill='green'>
                    <polygon points='8 5, 6 7, 6 3'/> 
                    <rect x='2' y='3' height='4' width='4' />   
                </g>
                <rect x='0' y='0' height='10' width='10' fill="white"/>
            {
                carts.map(cart => {return makeCart(cart)})
            }
            </svg>
        )
    }    
}

function mapStateToProps(state){  
    return {      
      carts: state.carts
    };
  }
export default connect(mapStateToProps)(Carts);