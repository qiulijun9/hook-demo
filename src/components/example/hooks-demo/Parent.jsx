import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
  createContext,
} from 'react'
import Child from './Child'

//创建一个Context
export const Context = createContext(0)
// const user = { age: '20', name: 'zcool' }

function Parent() {
  const [count, setCount] = useState(0)

  //useMemo
  const [age, setAge] = useState(20)
  const [name, setName] = useState('zcool')
  const memoUser = useMemo(() => ({ age, name }), [age, name])

  //useCallback
  const cbSetAge = useCallback(age => setAge(age), [])

  const divRef = useRef(null)
  function handleClick(e) {
    divRef.current = 123
    console.log(e.target.value, divRef.current) //123
  }

  //useEffect
  useEffect(() => {
    console.log('age', age)
    setName('cool')
    // console.log('ref2', divRef.current)
  }, [age])
  // console.log('ref', divRef.current)
  return (
    <>
      <div>我是父组件</div>
      <h1>count:{count}</h1>
      <button onClick={() => setCount(count => count + 1)}>
        改变父组件count{age}
      </button>
      <br />
      <button ref={divRef} onClick={e => handleClick(e)}>
        提交
      </button>
      <br />
      <br />
      {/* <Child data={1} /> */}
      {/* <Child data={1} user={{ age: '20', name: 'zcool' }} /> */}
      {/* <Child data={1} user={user} /> */}
      {/* <Child data={1} user={memoUser} /> */}
      {/* <Child data={1} user={memoUser} age={age} setAge={age => setAge(age)} /> */}
      <Child data={1} user={memoUser} age={age} setAge={cbSetAge} />
      {/* <Context.Provider value={{ count, name }}>
        <Child data={1} user={memoUser} />
      </Context.Provider> */}
    </>
  )
}

export default Parent
