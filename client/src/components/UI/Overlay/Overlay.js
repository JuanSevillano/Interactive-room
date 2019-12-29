import React from 'react'
import classes from './Overlay.module.css'

const Overlay = props => {

    const settings = {
        backgroundColor: props.color,
        display: props.active === true ? 'flex' : 'none'
    }

    return (
        <div className={classes.Overlay} style={settings}>
            <section className={classes.Form}>{props.children}</section>
        </div>
    )
}

export default Overlay
