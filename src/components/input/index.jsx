import React from 'react';
import classes from './index.module.css'

const MyInput = (props) => {
    return (
        <input className={classes.myInput} {...props}>
            
        </input>
    );
};

export default MyInput;