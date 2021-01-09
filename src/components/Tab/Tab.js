import React from 'react';
import classes from './Tab.module.css';

const Tab = (props) => (
    <button className={classes.Tab}>{props.children}</button>
);

export default Tab;