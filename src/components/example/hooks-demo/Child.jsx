import React, { useContext } from 'react'
import { Context } from './Parent'
import GrandChildren from './GrandChildren'

function Child(props) {
  const { data, setAge } = props
  console.log('执行子组件。。。。', data)
  function changeAge() {
    setAge(23)
  }

  //useContext
  const { count, name } = useContext(Context)
  console.log('context的值', count, name)
  return (
    <>
      <div>我是子组件 {data}</div>
      <button onClick={() => changeAge()}>改变父组件的age</button>
      <GrandChildren data={data} />
    </>
  )
}

//对props 进行浅层对比
export default React.memo(Child)
//不做优化，所有的子组件都将重新渲染
// export default Child
