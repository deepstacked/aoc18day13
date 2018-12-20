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
        <svg id="carts" key={common.generateUniqueId()} viewBox='0 0 1600 1600' xmlns='http://www.w3.org/2000/svg'>
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