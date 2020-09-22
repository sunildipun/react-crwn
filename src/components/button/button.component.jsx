import React from "react";

import './button.style.scss';

const ButtonComponent = ({children, isGoogleSignIn, inverted ,...otherProps}) => (
    <button className={`${inverted ? 'inverted': ''} ${isGoogleSignIn ? 'google-sign-in': ''} custom-button`} {...otherProps}>
        {children}
    </button>
);

export default ButtonComponent;