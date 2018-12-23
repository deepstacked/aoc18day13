import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as common from '../constants';
import { Badge } from 'reactstrap';

function makeCartInfo(cart, cartNumber){    
    let {x,  y, css, status, direction, nextTurn } = cart;
    
    if(status === common.CARTSTATUS.crashed) css += '-outline mr-1 mb-2 w-226px text-left';
    else css += ' mr-1 mb-2 w-226px text-left';
    return <Badge key={common.generateUniqueId()} className={css}>ID:{cartNumber} {status} at ({x}, {y}) {direction} {nextTurn} </Badge>;
}

function sortCartInfo(a, b){
    if(a.status < b.status) return -1;
    if(a.status > b.status) return 1;
    if(a.id < b.id) return -1;
    if(a.id > b.id) return 1;
    return 0;
}
class CartInfos extends Component {

    render () {
        let { carts } = this.props;
        let cartNumber = 1;
        let cartInfos = carts.map(cart => {return cart});
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