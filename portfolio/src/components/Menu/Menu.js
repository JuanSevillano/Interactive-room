import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Menu.module.css'
import Logo from '../Logo/Logo';

export default class Menu extends Component {
    render() {
        return (
            <header className={classes.Header}>
                <nav>
                    <Logo />
                    <ul>
                        <li>
                            <NavLink 
                            to="/"
                            exact
                            >Home</NavLink>
                        </li>
                        <li>
                            <NavLink exact to={{
                            pathname: '/projects'
                            }}>Projects</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}
