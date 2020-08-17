import React from "react";

import './button.style.scss';

const ButtonComponent = ({children, isGoogleSignIn,...otherProps}) => (
    <button className={`${isGoogleSignIn ? 'google-sign-in': ''} custom-button`} {...otherProps}>
        {children}
    </button>
);

export default ButtonComponent;