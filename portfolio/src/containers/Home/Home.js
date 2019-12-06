import React from 'react';
import About from '../../components/About/About';
//import WebGL from '../../components/WebGL/WebGL';

import classes from './Home.module.css';

const home = props => {
    return (
        <div className={classes.Home}>
            
            <About />
        </div>
    );
};

export default home;