import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Menu.module.css'
import Logo from '../Sevi/Sevi';

const Menu = props => {

        const links = props.links.map( a => (
            <li>
                <NavLink
                    to={a.url}
                    exact>{a.text}
                </NavLink>
             </li>
        ));

        return (
            <header className={classes.Header}>
                <nav>
                    <Logo />
                    <ul>
                        {links}
                    </ul>
                </nav>
            </header>
        )
    }

    export default Menu; 
