import React from 'react';
import './App.css';
import Race from './Pages/Race';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar';
import { Switch, Route } from "react-router-dom";
import Events from './Pages/Events';
import Drivers from './Pages/Drivers';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <NavigationBar />
      </header>
      <Switch>
        <Route exact path="/">
          <Race />
        </Route>
        <Route path="/live-race">
          <Race />
        </Route>
        <Route path="/events">
          <Events />
        </Route>
        <Route path="/drivers">
          <Drivers />
        </Route>
        <Route path="/settings">
          <Events />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
