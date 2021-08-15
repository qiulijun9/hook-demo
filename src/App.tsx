import React from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import {
  useVirtualizedDemo1,
  useVirtualizedDemo2,
  useVirtualizedDemo3,
  EffectDemo,
  ReducerDemo,
  Search,
  ListDemo,
  MasonryDemo,
  DynamicList,
} from './components/index'
import './App.css'
import Parent from './components/example/hooks-demo/Parent'

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/useVirtusalizedDemo1" component={useVirtualizedDemo1} />
        <Route path="/useVirtusalizedDemo2" component={useVirtualizedDemo2} />
        <Route path="/useVirtusalizedDemo3" component={useVirtualizedDemo3} />
        <Route path="/effectDemo" component={EffectDemo} />
        <Route path="/reducerDemo" component={ReducerDemo} />
        <Route path="/search" component={Search} />
        <Route path="/demo" component={Parent} />
        <Route path="/listDemo" component={ListDemo} />
        <Route path="/masonryDemo" component={MasonryDemo} />
        <Route path="/dynamicList" component={DynamicList} />
      </Switch>
    </HashRouter>
  )
}

export default App
