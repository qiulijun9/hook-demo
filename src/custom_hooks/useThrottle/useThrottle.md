# demo

```jsx
import React from 'react'
import { useThrottle } from './custom_hooks/index'

function Demo() {
  const { run } = useThrottle((...args) => console.log(args[0]), 1000)

  return <button onClick={() => run('触发')}>触发</button>
}
```
