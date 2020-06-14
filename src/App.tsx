import React from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import {
  useVirtualizedDemo1,
  useVirtualizedDemo2,
  EffectDemo,
  ReducerDemo,
  Search,
  listDemo,
} from './components/index'
import './App.css'
import Parent from './components/example/hooks-demo/Parent'

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/useVirtusalizedDemo" component={useVirtualizedDemo1} />
        <Route path="/useVirtusalizedDemo2" component={useVirtualizedDemo2} />
        <Route path="/effectDemo" component={EffectDemo} />
        <Route path="/reducerDemo" component={ReducerDemo} />
        <Route path="/search" component={Search} />
        <Route path="/demo" component={Parent} />
        <Route path="/list" component={listDemo} />
      </Switch>
    </HashRouter>
  )
}

export default App
