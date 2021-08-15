import React from 'react'
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
} from 'react-virtualized'
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

const cache = new CellMeasurerCache({
  defaultHeight: 250,
  defaultWidth: 200,
  fixedWidth: true,
})

const cellPositioner = createMasonryCellPositioner({
  cellMeasurerCache: cache,
  columnCount: 3,
  columnWidth: 200,
  spacer: 10,
})
function cellRenderer({ index, key, parent, style }) {
  const datum = items[index]

  return (
    <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
      <div style={style}>
        <img
          src={datum.image}
          style={{
            height: datum.height,
            width: datum.width,
          }}
          alt="img"
        />
      </div>
    </CellMeasurer>
  )
}

function MasonryDemo() {
  return (
    <Masonry
      style={{
        margin: '0 auto',
        height: '400px',
        width: '700px',
        border: '1px solid red',
        overflowY: 'auto',
      }}
      cellCount={items.length}
      cellMeasurerCache={cache}
      cellPositioner={cellPositioner}
      cellRenderer={cellRenderer}
      height={600}
      width={800}
    />
  )
}

export default MasonryDemo
