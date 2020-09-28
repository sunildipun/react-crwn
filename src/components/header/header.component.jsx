import React from "react";
import { connect } from 'react-redux';

import './header.style.scss';
import {ReactComponent as Logo} from  './../../assets/crown.svg';
import { Link } from "react-router-dom";
import  { createStructuredSelector } from 'reselect'

import { auth } from './../../firebase/firebase.utils';

import { selectCurrentUser } from './../../redux/user/user.selector';
import { selectCartHidden } from './../../redux/cart/cart.selector';

import CartIcon from './../cart-icon/cart-icon.component';
import CartDropdown from './../cart-dropdown/cart-dropdown.component';

const Header = ({currentUser, hidden}) => (
    <div className="header"> 
        <Link className="logo-container" to='/'>
            <Logo  className="logo"/>
        </Link>
        <div className="options">
            <Link className="option" to="/shop"> SHOP</Link>
            <Link className="option" to="/contact"> CONTACT</Link>
            {
                currentUser ?
                <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
                :
                <Link className="option" to="/sign-in">SIGN IN</Link>
            }
            <CartIcon />
        </div> 
        {
            hidden ? null : <CartDropdown />
        }
    </div>
);

// const mapStateToProps = (state) => ({
//     currentUser: selectCurrentUser(state),
//     hidden: selectCartHidden(state)
// }) 

const mapStateToProps =  createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})


export default connect(mapStateToProps)(Header);