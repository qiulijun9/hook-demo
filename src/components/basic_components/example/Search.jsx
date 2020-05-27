import React, { useState, useEffect } from 'react'
import InputDropDown from '../../basic_components/InputDropDown/InputDropDown'
function Search() {
  const [menu, setMenu] = useState([
    { value: '1ssd', index: 0 },
    { value: '2sd', index: 1 },
    { value: '3ds', index: 2 },
  ])
  const [menuVisible, setMenuVisible] = useState(false)
  const [menuChecked, setMenuChecked] = useState('')
  const [isKeyDown, setIsKeyDown] = useState('')
  const [checkedIndex, setCheckedIndex] = useState(0)

  const menuCallback = obj => {
    setMenuChecked(obj.value)
    setCheckedIndex(obj.index)
    setMenuVisible(false)
  }

  const menuKeyDownCallback = value => {
    if (value === 'pageDown') {
      setCheckedIndex(checkedIndex >= menu.length - 1 ? 0 : checkedIndex + 1)
      setIsKeyDown('pageDown')
    }
    if (value === 'pageUp') {
      setCheckedIndex(checkedIndex <= 0 ? menu.length - 1 : checkedIndex - 1)
      setIsKeyDown('pageUp')
    }
  }

  const menuMouseOverCallback = index => {
    setIsKeyDown('')
    setCheckedIndex(index)
  }

  useEffect(() => {
    if (isKeyDown === 'pageDown' || isKeyDown === 'pageUp') {
      setMenuChecked(menu[checkedIndex].value)
    }
  }, [checkedIndex, isKeyDown])

  function handleChange(e) {
    const val = e.target.value
    setMenuChecked(val)
    setMenuVisible(true)
  }

  function handleBlur() {
    setTimeout(() => {
      setMenuVisible(false)
    }, 200)
  }

  return (
    <>
      <div>
        <InputDropDown
          visible={menuVisible}
          menu={menu}
          checked={menuChecked}
          checkedIndex={checkedIndex}
          menuClick={menuCallback}
          menuKeyDown={menuKeyDownCallback}
          menuMouseOver={menuMouseOverCallback}
        >
          <input
            type="text"
            value={menuChecked}
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
