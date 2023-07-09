import React from 'react';
import classes from './Loader.module.css'

const Loader = ({children, ...props}) => {
    return (
        <div {...props} className={classes.loader}>
            {children}
        </div>
    );
};

export default Loader;