import React, { useState, useEffect } from 'react'
import useDebounce from '../../../custom_hooks/useDebounce/useDebounce'
import InputDropDown from '../InputDropDown/InputDropDown'

const mokeData = {
  '1': ['1', '11', '111', '1111'],
  '2': ['2', '22', '222', '2222'],
  '3': ['3', '33', '333', '3333'],
  '4': ['4', '44', '444', '4444'],
}

function Search() {
  const [menu, setMenu] = useState([])
  const [menuVisible, setMenuVisible] = useState(false)
  const [menuChecked, setMenuChecked] = useState('')
  const [keyDownType, setkeyDownType] = useState('')
  const [checkedIndex, setCheckedIndex] = useState(0)
  const { run } = useDebounce(val => getData(val), 1000)

  const menuCallback = obj => {
    setMenuChecked(obj.value)
    setCheckedIndex(!obj.index ? 0 : obj.index)
    setMenuVisible(false)
    //解决上下移动的问题
    setCheckedIndex(0)
    setMenu([])
  }

  const menuKeyDownCallback = value => {
    let nextIndex = 0
    if (value === 'pageDown') {
      nextIndex = checkedIndex === menu.length - 1 ? 0 : checkedIndex + 1
      setCheckedIndex(nextIndex)
      setkeyDownType('pageDown')
    }
    if (value === 'pageUp') {
      nextIndex = checkedIndex > 0 ? checkedIndex - 1 : menu.length - 1
      setCheckedIndex(nextIndex)
      setkeyDownType('pageUp')
    }
  }

  function handleChange(e) {
    const val = e.target.value
    console.log(val)
    run(val)
    setMenuChecked(val)
    setMenuVisible(true)

    if (!val) {
      setMenuVisible(false)
    }
  }

  function getData(val) {
    let res = mokeData[val]
    let result = []
    if (res) {
      result = res.map((item, index) => {
        return { value: item, index }
      })
    }
    setMenu(result)
  }

  useEffect(() => {
    if (!menu.length) return

    if (
      (menuVisible && keyDownType === 'pageDown') ||
      keyDownType === 'pageUp'
    ) {
      setMenuChecked(menu[checkedIndex].value)
    }
  }, [keyDownType, checkedIndex, menu, menuVisible])
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '30px',
        }}
      >
        <InputDropDown
          visible={menuVisible}
          menu={menu}
          checked={menuChecked}
          checkedIndex={checkedIndex}
          menuClick={menuCallback}
          menuKeyDown={menuKeyDownCallback}
        >
          <input
            style={{ height: '40px', width: '300px' }}
            type="text"
            value={menuChecked}
            onKeyDown={e => e.stopPropagation()}
            onChange={e => handleChange(e)}
            onFocus={() => setMenuVisible(true)}
          />
        </InputDropDown>
      </div>
    </>
  )
}
export default Search
