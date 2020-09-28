import React from "react";

import './cart-dropdown.style.scss';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CartItem from './../cart-item/cart-item.component';
import CustomButton from './../button/button.component'
import { selectCartItems } from './../../redux/cart/cart.selector';


const CartDropdown = ({cartItems}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem}/>)
            }
        </div>
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
)


const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

export default connect(mapStateToProps)(CartDropdown);