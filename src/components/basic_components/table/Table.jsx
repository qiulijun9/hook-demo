import React from 'react'

const headData = [
  {
    type: 'tr',
    className: '',
    props: {},
    children: [
      {
        type: 'th',
        value: '独家you',
        className: '',
        props: {
          colspan: '5',
        },
      },
      {
        type: 'th',
        value: '非独家',
        className: '',
        props: {
          rowspan: '2',
          colspan: '2',
        },
      },
    ],
  },
  {
    type: 'tr',
    className: '',
    props: {},
    children: [
      {
        type: 'th',
        value: 'a',
        className: '',
        props: {
          colspan: '3',
        },
      },
      {
        type: 'th',
        value: 'b',
        className: '',
        props: {
          colspan: '2',
        },
      },
    ],
  },
]

const bodyData = [
  {
    type: 'tr',
    className: '',
    children: [
      {
        type: 'td',
        value: '独家body',
      },
      { type: 'td', value: '非独家body' },
      { type: 'td', value: '非独家body' },
      { type: 'td', value: '非独家body' },
      { type: 'td', value: '非独家body' },
      { type: 'td', value: '非独家body' },
      { type: 'td', value: '非独家body' },
    ],
  },
  {
    type: 'tr',
    className: '',
    children: [
      { type: 'td', value: '独' },
      { type: 'td', value: '非独' },
      { type: 'td', value: '非独' },
      {
        type: 'td',
        value: '非独',
        props: {
          rowspan: '3',
        },
      },
      {
        type: 'td',
        value: '非独',
        props: {
          rowspan: '3',
        },
      },
      {
        type: 'td',
        value: '非独',
        props: {
          rowspan: '3',
        },
      },
      {
        type: 'td',
        value: '非独',
        props: {
          rowspan: '3',
        },
      },
    ],
  },
  {
    type: 'tr',
    className: '',
    children: [
      { type: 'td', value: '非独家body' },
      { type: 'td', value: '非独家body' },
      { type: 'td', value: '非独家body' },
    ],
  },
  {
    type: 'tr',
    className: '',
    children: [
      { type: 'td', value: '非独家body' },
      { type: 'td', value: '非独家body' },
      { type: 'td', value: '非独家body' },
    ],
  },
]

function Table(props) {
  return (
    <table border={'1px'} width="100%">
      <thead>
        {headData.map(({ className, props, children }, headTrIndex) => (
          <tr key={headTrIndex} className={className} {...props}>
            {children.map(({ value, className, props }, headThIndex) => (
              <th key={headThIndex} className={className} {...props}>
                {value}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {bodyData.map(({ className, props, children }, bodyTrIndex) => (
          <tr key={bodyTrIndex} className={className} {...props}>
            {children.map(({ value, className, props }, bodyThIndex) => (
              <td key={bodyThIndex} className={className} {...props}>
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
