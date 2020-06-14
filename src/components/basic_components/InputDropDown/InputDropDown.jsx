import React, { useEffect } from 'react'

import './InputDropDown.css'
InputDropDown.defaultProps = {
  visible: false,
  menu: [],
  rootStyle: {},
  menuRootStyle: {},
  menuItemStyle: {},
  checked: '',
  checkedIndex: 0,
  menuClick: () => {},
  menuKeyDown: () => {},
}

function InputDropDown(props) {
  useEffect(() => {
    const handleKeydown = e => {
      // 兼容ie
      const event = e || window.event
      const key = event.which || event.keyCode || event.charCode

      const { menuKeyDown } = props
      if (key === 40) {
        //pagedown
        menuKeyDown('pageDown')
      }
      if (key === 38) {
        //pageup
        menuKeyDown('pageUp')
        event.preventDefault()
      }
      if (key === 13) {
        //enter
        menuKeyDown('enter')
      }
    }
    document.addEventListener('keydown', handleKeydown)
    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [props])

  return (
    <div tabIndex="0" className="menu-container" onBlur={props.menuClick}>
      {props.visible && (
        <ul className="menu-root">
          {props.menu.map(({ value, index }) => (
            <li
              onMouseDown={e => props.menuClick({ value, index })}
              onMouseOver={() => props.menuMouseOver(index)}
              key={value}
              className={`menu-item ${
                index === props.checkedIndex && 'menu-item-checked'
              }`}
            >
              {value}
            </li>
          ))}
        </ul>
      )}
      {props.children}
    </div>
  )
}

export default React.memo(InputDropDown)
