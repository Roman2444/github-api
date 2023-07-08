import React from 'react';
import classes from './index.module.css'

const MySelect = ({options, defaultValue, value, onChange}) => {
    return (
        <select  
            className={classes.mySelect}
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            <option disabled value="">{defaultValue}</option>
            {options.map(option => 
                <option key={option.name} value={option.commit.url}>{option.name}</option>
            )}
        </select>
    );
};

export default MySelect;