// import React, { useState } from 'react'
// import './DropDown.css'
// function DropDown(props) {
//   const { children, menu, flag, setInputValue } = props
//   function handleChange(val) {
//     setInputValue(val)
//   }

//   function handleMove(e) {
//     // console.log(333, e.target.value)
//   }

//   return (
//     <div>
//       <div>{children}</div>
//       {flag && (
//         <select
//           id="input-select"
//           style={{ width: '170px' }}
//           size={menu.length}
//           onChange={e => handleChange(e.target.value)}
//           onMouseOver={e => handleMove(e)}
//           value={menu[0]}
//         >
//           {menu.map((item, index) => (
//             <option key={index} value={item} href="http://www.baidu.com">
//               {item}
//             </option>
//           ))}
//         </select>
//       )}
//     </div>
//   )
// }
// export default DropDown

import React, { useState, useEffect } from 'react'
function InputDropDown(props) {
  const { menu, show, changeInputValue } = props

  function handleChangeKeyword(e) {
    console.log(222, e.target.value)
    e.stopPropagation()
    const val = e.target.value
    changeInputValue(val)
  }
  const [activeIndex, setActiveIndex] = useState(0)
  function handleChangeMouseOver(e) {
    const key = parseInt(e.currentTarget.getAttribute('data-index'))
    setActiveIndex(key)
  }

  function onKeyDown(e) {
    e.stopPropagation()
    switch (e.keyCode) {
      case 13: //回车事件
        console.log('22222')
        break
      case 40: //
        console.log(activeIndex)
        setActiveIndex(activeIndex >= menu.length ? 0 : activeIndex + 1)
        break
      case 38: //pageup
        setActiveIndex(activeIndex < 0 ? menu.length : activeIndex - 1)
        break
      default:
        return
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <div>
      <ul
        style={{
          width: '200px',
          height: '100px',
          listStyle: 'none',
          padding: 0,
          display: show ? 'block' : 'none',
        }}
      >
        {menu &&
          menu.map((item, index) => (
            <li
              style={{
                textAlign: 'left',
                padding: '15px',
                backgroundColor: index === activeIndex ? 'red' : '#fff',
              }}
              key={index}
              data-value={item}
              data-index={index}
              value={item}
              onClick={e => handleChangeKeyword(e)}
              onMouseOver={e => handleChangeMouseOver(e)}
            >
              {item}
            </li>
          ))}
      </ul>
      {props.children}
    </div>
  )
}
export default InputDropDown
