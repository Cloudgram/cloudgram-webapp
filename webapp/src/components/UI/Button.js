import React, { forwardRef } from 'react';
import "./Button.css";

const Button = forwardRef(({ className, children, ...rest }, ref) => {
    const classes = 'button-element ' + className;
    return (
        <button ref={ref} className={classes} {...rest}>
            {children}
        </button>
    );
});

export default Button;
