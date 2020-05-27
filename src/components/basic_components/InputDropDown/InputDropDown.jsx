import React, { useEffect } from 'react'

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
      const event = e || window.event
      const key = event.which || event.keyCode || event.charCode
      if (key === 40) {
        //pagedown
        props.menuKeyDown('pageDown')
      }
      if (key === 38) {
        //pageup
        props.menuKeyDown('pageUp')
      }
    }
    document.addEventListener('keydown', handleKeydown)
    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [props])

  return (
    <div
      tabIndex="0"
      style={{
        position: 'relative',
      }}
      // onBlur={props.menuClick(null)}
    >
      {props.visible && (
        <ul
          style={{
            position: 'absolute',
            width: '200px',
            margin: 0,
            padding: 0,
            listStyle: 'none',
            top: '100%',
            left: 0,
          }}
        >
          {props.menu.map(({ value, index }) => (
            <li
              onClick={() => props.menuClick({ value, index })}
              onMouseOver={() => props.menuMouseOver(index)}
              key={value}
              className="menu-item"
              style={{
                width: '100%',
                height: '3rem',
                background: props.checkedIndex === index ? 'red' : '#eee',
                cursor: 'pointer',
              }}
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
