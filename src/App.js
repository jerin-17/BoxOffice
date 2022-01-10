import React from 'react';
import { Switch,Route } from 'react-router-dom'
import Home from './pages/Home'
import Starred from './pages/Starred.js';
import Show from './pages/Show'
function App() {
  return (
    <div>
    <Switch> 
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/starred">
       <Starred />
      </Route>
      <Route exact path="/show/:id">
        <Show />
      </Route>
      <Route>
       <div>
         Not found.
       </div>
      </Route>
    </Switch>
    </div>
  );
}

export default App;
