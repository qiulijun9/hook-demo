import React, { useState } from 'react'
import useDebounce from '../../../custom_hooks/useDebounce/useDebounce'
import InputDropDown from '../InputDropDown/InputDropDown'

const mokeData = {
  '1': ['11', '111', '1111', '11111'],
  '2': ['22', '222', '2222', '22222'],
  '3': ['33', '333', '3333', '33333'],
  '4': ['44', '444', '4444', '44444'],
}

function Search() {
  const [menu, setMenu] = useState([])
  const [menuVisible, setMenuVisible] = useState(false)
  const [menuChecked, setMenuChecked] = useState('')
  const [checkedIndex, setCheckedIndex] = useState(-1)
  const [initKeyword, setInitKeyword] = useState('')
  const { run } = useDebounce(val => getData(val), 1000)

  const menuCallback = obj => {
    setMenuChecked(obj.value)
    setCheckedIndex(!obj.index ? 0 : obj.index)
    setMenuVisible(false)
    //解决上下移动的问题
    setCheckedIndex(0)
  }

  const menuKeyDownCallback = value => {
    let nextIndex = -1
    if (value === 'pageDown') {
      nextIndex = checkedIndex === menu.length - 1 ? -1 : checkedIndex + 1
      setCheckedIndex(nextIndex)
    }
    if (value === 'pageUp') {
      nextIndex = checkedIndex >= 0 ? checkedIndex - 1 : menu.length - 1
      setCheckedIndex(nextIndex)
    }
    if (value === 'enter') {
      nextIndex = checkedIndex
      setCheckedIndex(nextIndex)
      setMenu([])
      setMenuVisible(false)
    }
    console.log(111, nextIndex)
    if (nextIndex === -1) {
      setMenuChecked(initKeyword)
    } else {
      setMenuChecked(menu[nextIndex].value)
    }
  }

  function handleChange(e) {
    const val = e.target.value

    setMenuChecked(val)
    setMenuVisible(true)
    setInitKeyword(val)
    //清空上次搜索的列表
    setMenu([])
    //有值的时候再去请求
    if (val) {
      run(val)
    }
    if (!val) {
      setMenuVisible(false)
      setMenu([])
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

  function menuMouseOverCallback(index) {
    setCheckedIndex(index)
  }

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
          menuMouseOver={menuMouseOverCallback}
          menuKeyDown={menuKeyDownCallback}
        >
          <input
            style={{ height: '40px', width: '300px' }}
            type="text"
            value={menuChecked}
            onKeyDown={e => e.stopPropagation()}
            onChange={event => handleChange(event)}
            onFocus={() => {
              setMenuVisible(true)
            }}
          />
        </InputDropDown>
      </div>
    </>
  )
}
export default Search

/**
 * 注意
 * 1.如果再次请求的时候可以取消上次的请求
 * 2.添加防抖
 * 3.上下键移动的光标的情况，
 * 4.浏览器前进后退的联想内容展现不一致的情况 监听路径变化,清除menu
 * 5.按下键移动到最后一个联想词是在往下应该显示刚开始的搜索词。
 * 6.对数据的清除和索引的判断情况
 */
