import React, { useState, useEffect } from 'react'
import InputDropDown from '../InputDropDown/InputDropDown'
function Search() {
  const [menu, setMenu] = useState([
    { value: '1', index: 0 },
    { value: '2', index: 1 },
    { value: '3', index: 2 },
  ])
  const [menuVisible, setMenuVisible] = useState(false)
  const [menuChecked, setMenuChecked] = useState('')
  const [checkedIndex, setCheckedIndex] = useState(0)
  const menuCallback = obj => {
    setMenuChecked(obj.value)
    setCheckedIndex(obj.index)
    setMenuVisible(false)
  }
  const menuKeyDownCallback = value => {
    if (value === 'pageDown') {
      setCheckedIndex(checkedIndex >= menu.length - 1 ? 0 : checkedIndex + 1)
      // setMenuChecked(menu[checkedIndex + 1].value)
    }
    if (value === 'pageUp') {
      setCheckedIndex(checkedIndex <= 0 ? menu.length - 1 : checkedIndex - 1)
      // setMenuChecked(menu[checkedIndex].value)
    }
  }

  const menuMouseOverCallback = index => {
    setCheckedIndex(index)
  }

  useEffect(() => {
    setMenuChecked(menu[checkedIndex].value)
  }, [checkedIndex])

  function handleChange(e) {
    const val = e.target.value
    setMenuChecked(val)
  }

  function handleFocus() {
    setMenuVisible(true)
  }

  function handleBlur() {
    // setFlag(false)
    // setMenuVisible(false)
  }

  return (
    <>
      <div>
        <InputDropDown
          visible={menuVisible}
          menu={menu}
          checked={menuChecked}
          checkedIndex={checkedIndex}
          // handleBlur={handleBlur}
          menuClick={menuCallback}
          menuKeyDown={menuKeyDownCallback}
          menuMouseOver={menuMouseOverCallback}
        >
          <input
            type="text"
            value={menuChecked}
            onFocus={handleFocus}
            onKeyDown={e => e.stopPropagation()}
            onBlur={handleBlur}
            onChange={e => handleChange(e)}
          />
        </InputDropDown>
      </div>
    </>
  )
}
export default Search
