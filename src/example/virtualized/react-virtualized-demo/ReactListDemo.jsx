import React from 'react'
import { List, AutoSizer } from 'react-virtualized'

const count = 10000
const items = Array.from(Array(count)).map((_, index) => {
  return {
    id: index,
    other: `${index} list`,
    width: 200 + Math.floor(Math.random() * 50),
    height: 100 + Math.floor(Math.random() * 50),
    image:
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=251702416,2812893672&fm=26&gp=0.jpg',
  }
})

function renderRow(item) {
  return (
    <div
      key={item.id}
      className="row"
      style={{
        height: '100px',
        border: '1px solid black',
      }}
    >
      <div className="content">
        <div>
          <img
            src={item.image}
            alt="img"
            style={{ width: '50px', height: '50px' }}
          />
        </div>
        <div>{item.id}</div>
        <div>{item.other}</div>
      </div>
    </div>
  )
}

function ListDemo() {
  return (
    <div
      style={{
        margin: '0 auto',
        height: '600px',
        width: '200px',
        border: '1px solid red',
        overflowY: 'auto',
      }}
    >
      {items.map((item, index) => {
        return renderRow(item)
      })}
    </div>
  )
}

const renderItem = ({ index, key, style }) => {
  return (
    <div
      key={key}
      className="row"
      style={{
        height: '100px',
        border: '1px solid black',
        ...style,
      }}
    >
      <div className="content">
        <div>
          <img
            src={items[index].image}
            alt="img"
            style={{ width: '50px', height: '50px' }}
          />
        </div>
        <div>{items[index].id}</div>
        <div>{items[index].other}</div>
      </div>
    </div>
  )
}

function VirtualizedListDemo() {
  return (
    <div
      style={{
        margin: '0 auto',
        height: '300px',
        width: '200px',
        border: '1px solid red',
        overflowY: 'auto',
      }}
    >
      <AutoSizer>
        {() => (
          <List
            width={200}
            height={300}
            rowHeight={100}
            style={{
              margin: '0 auto',
              height: '300px',
              width: '200px',
              border: '1px solid red',
              overflowY: 'auto',
            }}
            rowCount={1000}
            rowRenderer={renderItem}
          />
        )}
      </AutoSizer>
    </div>
  )
}

//export default VirtualizedListDemo
export default ListDemo
