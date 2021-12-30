import React from 'react'

const WidgetPanel = (props) => {
  return (
    <div className='widget-panel'>
      {props.children}
    </div>
  )
}

export default WidgetPanel
