# demo

```jsx
import React from 'react'
import { useTimeout } from './custom_hooks/index'

function Demo() {
  const { run } = useTimeout((...args) => console.log(args), 1000)

  return <button onClick={() => run('触发')}>触发</button>
}
```
