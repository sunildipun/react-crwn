import React from "react";

import './cart-dropdown.style.scss';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from "react-router-dom";

import CartItem from './../cart-item/cart-item.component';
import CustomButton from './../button/button.component'
import { selectCartItems } from './../../redux/cart/cart.selector';


const CartDropdown = ({cartItems, history}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.length ?
                cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} item={cartItem}/>
                    )) : 
                    <span className="empty-message">Your Cart is Empty</span>
            }
        </div>
        <CustomButton onClick={()=> history.push('/checkout')}>GO TO CHECKOUT</CustomButton>
    </div>
)


const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown));