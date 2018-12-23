import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as common from '../constants';

function makeCart(cart){
    let newCart = false;
    let whichCart = '';
    let {x,  y, direction, css} = cart;    
    if(direction === common.CARTDIRECTION.up){
        newCart = true;
        whichCart = '#cartup';
    }
    if(direction === common.CARTDIRECTION.down){
        newCart = true;
        whichCart = '#cartdown';
    }
    if(direction === common.CARTDIRECTION.left){
        newCart = true;
        whichCart = '#cartleft';
    }
    if(direction === common.CARTDIRECTION.right){
        newCart = true;
        whichCart = '#cartright';
    }

    if(newCart === true){        
        return <use key={common.generateUniqueId()} className={css} href={whichCart} x={(x+1) * 10} y={(y+1) * 10} />
    }
}

class Carts extends Component {

    componentDidUpdate(prevProps){
        
    }

    render () {
        let { carts } = this.props;        
        return (            
            <svg id="svgcarts" key={common.generateUniqueId()}>
                <defs>
                    <g id='cartup'>           
                        <rect x='1' y='1.25' height='8.75' width='8' />
                        <rect x='1' y='0' height='0.5' width='8' />
                    </g>
                    <g id='cartdown'>
                        <rect x='1' y='0' height='8.75' width='8' />
                        <rect x='1' y='9.5' height='0.5' width='8' />
                    </g>
                    <g id='cartleft'>                
                        <rect x='1.25' y='1' height='8' width='8.75' />
                        <rect x='0' y='1' height='8' width='0.5' />      
                    </g>                
                    <g id='cartright'>
                        <rect x='0' y='1' height='8' width='8.75' />
                        <rect x='9.5' y='1' height='8' width='0.5' />  
                    </g>
                </defs>
            {
                carts.map(cart => {return makeCart(cart)})
            }
            </svg>
        )
    }    
}

function mapStateToProps(state){
    const carts = state.carts.filter(cart => cart.status === common.CARTSTATUS.alive);
    return {
      carts: carts
    };
  }
export default connect(mapStateToProps)(Carts);