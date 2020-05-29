import React from 'react'

function GrandChildren(props) {
  const { data } = props
  console.log('执行孙子组件--------------', data)
  return <div>我是孙子组件 {data} </div>
}

//对props 进行浅层对比
// export default React.memo(GrandChildren)
export default GrandChildren
