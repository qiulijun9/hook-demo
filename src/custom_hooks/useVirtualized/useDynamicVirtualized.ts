import { useState, useRef, useEffect, useCallback } from 'react'
import useDebounce from '../useDebounce/useDebounce'
import binarySearch from '../../utils/binarySearch'

export type ItemHeight = number | ((index: number) => number)

export interface Options {
  itemHeight: ItemHeight //每项的高度
  renderCount?: number //渲染item的个数
  delay?: number //滚动的延迟时间
}

export interface RV<T> {
  isScrolling: boolean //是否触发滚动
  startIndex: number //开始渲染的下标
  endIndex: number //结束渲染的下标
  list: Array<T> //渲染的的列表
  itemProps: { style: {} }
  containerProps: {
    onScroll: (e: any) => void
    style: { overflowY: 'auto' }
  } //外层div
  wrapperProps: {
    ref: any
    style: {
      boxSizing: 'border-box'
      width: '100%'
      height: number
      paddingTop: number
    }
  } //第二层div
}

function useDynamicVirtualized<T = any>(
  items: Array<T>,
  options: Options,
): RV<T> {
  const { itemHeight, renderCount = 10, delay = 100 } = options
  //缓存数组
  const [paddingTopCache, setPaddingTopCache] = useState<Array<number>>([])
  useEffect(() => {
    let paddingTopCache = []
    if (typeof itemHeight === 'number') {
      paddingTopCache = items.reduce(
        (result, _, index) => {
          result.push((index + 1) * itemHeight)
          return result
        },
        [0],
      )
    } else {
      paddingTopCache = items.reduce(
        (result, _, index) => {
          result.push(result[index] + itemHeight(index))
          return result
        },
        [0],
      )
    }
    setPaddingTopCache(paddingTopCache)
  }, [items, itemHeight])

  //获取滚动区域的元素的top 值
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let paddingTopCache: any = [0]

    const observer = new MutationObserver(mutations => {
      console.log(444, mutations.length)
      for (let mutation of mutations) {
        if (mutation.type === 'childList') {
          const e = mutation.target.childNodes[0] as HTMLElement
          console.log(666, e.id, e instanceof HTMLElement)
          // 自身的高度加上上一个缓存的高度
          paddingTopCache[parseInt(e.id)] =
            parseInt(e.style.height) + paddingTopCache[parseInt(e.id) - 1]
        }
      }
      console.log(222, paddingTopCache)
      setPaddingTopCache(paddingTopCache)
    })

    const containerEle = containerRef.current
    if (containerEle) {
      observer.observe(containerEle, {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true,
      })
    }
    return () => observer.disconnect()
  }, [items])

  const [isScrolling, setIsScrolling] = useState(false)
  const [startIndex, setStartIndex] = useState(0)

  const { run } = useDebounce(() => {
    setIsScrolling(false)
  }, delay)

  // 滚动时更新 startIndex
  const handleScroll = useCallback(
    (e: any) => {
      e.preventDefault()
      run()
      if (Math.abs(e.target.scrollTop - paddingTopCache[startIndex]) > 0) {
        let newStartIndex = 0
        if (typeof itemHeight === 'number') {
          newStartIndex = Math.floor(e.target.scrollTop / itemHeight)
        } else {
          // 二分查找对应 startIndex
          const searchResult = binarySearch(paddingTopCache, e.target.scrollTop)
          if (Array.isArray(searchResult)) {
            newStartIndex = Math.min(...searchResult)
          } else {
            newStartIndex = searchResult
          }
        }
        setStartIndex(newStartIndex)
        setIsScrolling(true)
      }
    },
    [itemHeight, paddingTopCache, run, startIndex],
  )

  return {
    isScrolling,
    startIndex,
    endIndex: startIndex + renderCount,
    list: items.slice(startIndex, startIndex + renderCount),
    itemProps: {
      style: {},
    },
    containerProps: {
      onScroll: handleScroll,
      style: { overflowY: 'auto' },
    },
    wrapperProps: {
      ref: containerRef,
      style: {
        boxSizing: 'border-box',
        width: '100%',
        height: paddingTopCache[items.length],
        paddingTop: paddingTopCache[startIndex],
      },
    },
  }
}

export default useDynamicVirtualized
