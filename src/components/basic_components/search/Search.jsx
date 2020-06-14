import React, { useState } from 'react'
import useDebounce from '../../../custom_hooks/useDebounce/useDebounce'
import InputDropDown from '../InputDropDown/InputDropDown'
import Table from './table'

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
    setMenu([])
  }

  const menuKeyDownCallback = value => {
    let nextIndex = -1
    if (value === 'pageDown') {
      nextIndex = checkedIndex === menu.length - 1 ? -1 : checkedIndex + 1
      setCheckedIndex(nextIndex)
      // setkeyDownType('pageDown')
    }
    if (value === 'pageUp') {
      nextIndex = checkedIndex >= 0 ? checkedIndex - 1 : menu.length - 1
      setCheckedIndex(nextIndex)
      // setkeyDownType('pageUp')
    }
    if (nextIndex === -1) {
      setMenuChecked(initKeyword)
    } else {
      setMenuChecked(menu[nextIndex].value)
    }
  }

  function handleChange(e) {
    const val = e.target.value
    console.log(val)

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
  const tdData = [
    {
      value: [
        '以往累计收入总和',
        '分成比例',
        '分成计算方法',
        '分成比例',
        '分成计算方法',
        '分成比例',
        '分成计算方法',
      ],
    },
    {
      rowspan: '3',
      rowspanIndex: [3, 4, 5, 6],
      value: [
        '0元 ~ 4999元',
        '25%',
        '图片单价 * 25%',
        '40%',
        '图片单价×40%',
        '50%',
        '经收入50%',
      ],
    },
    {
      rowspan: '0',
      value: ['5000元 ~ 19999元', '30%', '图片单价 * 30%'],
    },
    {
      rowspan: '0',
      value: ['20000元以上', '35%', '图片单价 * 35%'],
    },
  ]

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
          // menuMouseOver={menuMouseOverCallback}
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
        <Table></Table>
      </div>
    </>
  )
}
export default Search

/**
 * 注意
 * 如果再次请求的时候可以取消上次的请求
 *
 */
