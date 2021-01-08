import React from 'react';
import classes from '../AdventureWrapper.module.css';

import Editor from './Editor/Editor';

const ContentWrapperRight = (props) => (
    <div className={`${classes.ContentWrapper} ${classes.WrapperRight}`}>
        <Editor />
    </div>
);

export default ContentWrapperRight;