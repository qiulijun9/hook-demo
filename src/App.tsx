import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  useVirtualizedDemo1,
  useVirtualizedDemo2,
  useVirtualizedDemo3,
  EffectDemo,
  ReducerDemo,
  Search,
  List,
  MasonryDemo,
  DynamicList,
} from "./example/index";
import "./App.css";
import Parent from "./example/hooks-demo/Parent";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/list" component={List} />
        <Route path="/useVirtusalizedDemo1" component={useVirtualizedDemo1} />
        <Route path="/useVirtusalizedDemo2" component={useVirtualizedDemo2} />
        <Route path="/useVirtusalizedDemo3" component={useVirtualizedDemo3} />
        {/* <Route path="/effectDemo" component={EffectDemo} /> */}
        {/* <Route path="/reducerDemo" component={ReducerDemo} /> */}
        {/* <Route path="/search" component={Search} />
        <Route path="/demo" component={Parent} /> */}
        <Route path="/masonryDemo" component={MasonryDemo} />
        <Route path="/dynamicList" component={DynamicList} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
