import React, { useState } from 'react';
import './App.css';
import Race from './Pages/Race';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar';
import { Switch, Route } from "react-router-dom";
import Events from './Pages/Events';
import Drivers from './Pages/Drivers';

function App() {

  const [raceStatus, setRaceStatus] = useState(false);

  const toggleRaceStatus = () => {
    setRaceStatus(prevRaceStatus => !prevRaceStatus);
    console.log('RaceStatus: ', raceStatus);
  }

  return (
    <div className="App">
      <header className="App-header">
        <NavigationBar raceStatus={raceStatus} />
      </header>
      <Switch>
        <Route exact path="/">
          <Race toggleRaceStatus={toggleRaceStatus} />
        </Route>
        <Route path="/live-race">
          <Race toggleRaceStatus={toggleRaceStatus} />
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
