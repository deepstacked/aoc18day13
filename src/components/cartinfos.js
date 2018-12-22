import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as common from '../constants';
import { Badge } from 'reactstrap';

function makeCartInfo(cart, cartNumber){    
    let {x,  y, css, status, direction, nextTurn } = cart;
    css += ' mr-1 mb-2';
    return <Badge key={common.generateUniqueId()} className={css}>ID:{cartNumber} ({x}, {y}) {direction} {nextTurn} {status}</Badge>;
}

function sortCartInfo(a, b){
    if(a.status < b.status) return -1;
    if(a.status > b.status) return 1;
    if(a.id < b.id) return -1;
    if(a.id > b.id) return 1;
    return 0;
}
class CartInfos extends Component {

    componentDidUpdate(prevProps){
        
    }

    render () {
        let { carts } = this.props;
        let cartNumber = 1;
        let cartInfos = carts.map(cart => {return {id: cart.id, x: cart.x, y: cart.y, direction: cart.direction, nextTurn: cart.nextTurn, css: cart.css, status: cart.status}});
        cartInfos.sort(sortCartInfo);

        return cartInfos.map(cartInfo => {return makeCartInfo(cartInfo, cartNumber++)});
    }    
}

function mapStateToProps(state){  
    return {      
      carts: state.carts
    };
  }
export default connect(mapStateToProps)(CartInfos);