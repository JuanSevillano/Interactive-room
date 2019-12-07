import React from 'react'
import { SketchPicker } from 'react-color'

import classes from './ColorPicker.module.css'

const SketchExample = props => {
  
    return (
      <React.Fragment>
        <div className={ classes.Swatch } onClick={ props.clicked }>
          <div className={ classes.Color } style={{ background: props.currentColor }} />
        </div>
        { props.displayColorPicker ? <div className={ classes.Popover }>
          <div className={ classes.Cover } onClick={ props.closed }/>
          <SketchPicker 
            color={ props.currentColor }
            onChangeComplete={ props.colorChanged } />
        </div> : null }
      </React.Fragment>
    )
  
}

export default SketchExample