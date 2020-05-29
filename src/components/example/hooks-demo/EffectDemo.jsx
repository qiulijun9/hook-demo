import React, { useState, useEffect, useReducer, useCallback } from 'react'

function getPI() {
  return Math.PI
}

let _state = [],
  _index = 0
function myUseState(initialState) {
  let curIndex = _index // 记录当前操作的索引
  _state[curIndex] =
    _state[curIndex] === undefined ? initialState : _state[curIndex]
  const setState = newState => {
    _state[curIndex] = newState
    _index = 0 // 每更新一次都需要将_index归零，才不会不断重复增加_state
  }
  _index += 1 // 下一个操作的索引
  return [_state[curIndex], setState]
}

//每秒递增的计数器
function EffectDemo(props) {
  const [count, setCount] = useState(0)
  //由于没有传依赖count，只执行一次
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     console.log(count)
  //     setCount(count + 1)
  //   }, 1000)
  //   return () => clearInterval(timer)
  // }, [])

  // 传入正确的依赖，正确执行，但是每次count改变之后都会重新设置和销毁
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCount(count + 1)
  //   }, 1000)
  //   return () => clearInterval(timer)
  // }, [count])

  // 移除依赖count，利用setState的函数形式setState((state,props)=>{})
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCount(c => c + 1)
  //   }, 1000)
  //   return () => clearInterval(timer)
  // }, [])

  //利用useReducer，不需要重新设置和删除定时器，React 保证dispatch 在生命周期内保持不变
  // function reducer(state, action) {
  //   if (action.type === 'add') {
  //     return state + 1
  //   }
  // }
  // const [count, dispatch] = useReducer(reducer, 0)
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     dispatch({ type: 'add' })
  //   }, 1000)
  //   return () => clearInterval(timer)
  // }, [])

  //只有useEffect 用到的方法放到useEffect  里面

  const [data, setData] = useState('text')
  const [newData, setNewData] = useState('data-----')
  // function changeData(data) {
  //   setData(data)
  // }
  // useEffect(() => {
  //   changeData('text')
  // }, [])

  // function handleClick() {
  //   let val = newData + data
  //   changeData(val)
  // }

  //建议做法
  useEffect(() => {
    function changeData(data) {
      setData(data)
    }
    function handleClick() {
      let val = newData
      changeData(val)
    }
    console.log('2')
    handleClick()
  }, [newData])

  //和state 无关的方法尽量放在组件外面，避免重复渲染
  useEffect(() => {
    const pi = getPI()
    console.log(pi)
  }, [])

  //通过useCallback 优化
  // const [count, setCount] = useState(520)

  const getCount = useCallback(() => {
    return 'count' + count
  }, [count])

  useEffect(() => {
    const data = getCount()
    console.log(data)
  }, [getCount])

  return (
    <div>
      <h1>count:{count}</h1>
      <h2>data:{data}</h2>
      {/* <button onClick={() => handleClick()}>changeData</button> */}
    </div>
  )
}

export default React.memo(EffectDemo)
