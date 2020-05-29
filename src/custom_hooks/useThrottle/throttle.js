export default function throttle(fn, delay) {
  let timer = null
  let pendding = false
  function clear() {
    clearTimeout(timer)
  }
  const run = (...args) => {
    if (!pendding) {
      pendding = true
      clear()
      timer = setTimeout(() => {
        pendding = false
        fn(...args)
      }, delay)
    }
  }

  return { run, clear }
}
