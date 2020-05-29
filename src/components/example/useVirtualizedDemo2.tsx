import React from 'react'
import { useVirtualized } from '../../custom_hooks/index'

const items = Array.from(Array(100000)).map((_, index) => {
  return {
    id: index,
    other: `${index} list`,
  }
})

const computeIndexHeight = (index: number) => {
  return index % 3 === 0 ? 25 : index % 2 === 0 ? 50 : 70
}

function useVirtualizedDemo2() {
  const { list, containerProps, wrapperProps, isScrolling } = useVirtualized(
    items,
    {
      itemHeight: computeIndexHeight,
    },
  )

  return (
    <div
      {...containerProps}
      style={{
        width: '300px',
        height: '400px',
        margin: '0 auto',
        overflow: 'auto',
        background: '#eee',
      }}
    >
      <div {...wrapperProps}>
        {isScrolling
          ? list.map(item => (
              <div
                style={{
                  height: computeIndexHeight(item.id),
                  boxSizing: 'border-box',
                }}
                key={item.id}
              >
                滚动时展示的内容(用于限制个数后每一项渲染仍耗费大量资源的情况):{' '}
                {item.id}
              </div>
            ))
          : list.map(item => (
              <div
                style={{
                  height: computeIndexHeight(item.id),
                  boxSizing: 'border-box',
                }}
                key={item.id}
              >
                实际内容: {item.id}
              </div>
            ))}
      </div>
    </div>
  )
}

export default useVirtualizedDemo2
