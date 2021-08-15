import React, { Component } from 'react'

export default class Item extends Component {
  componentDidMount() {
    /* eslint-disable-next-line */
    this.props.cachePosition(this.node, this.props.index)
  }

  render() {
    const { index, item } = this.props

    return (
      <div
        className="list-item"
        style={{ height: 'auto' }}
        ref={node => {
          this.node = node
        }}
      >
        <p>{item.id}</p>
        <div>
          <img
            src={item.image}
            style={{
              height: item.height,
              width: item.width,
            }}
            alt="img"
          />
        </div>
      </div>
    )
  }
}
