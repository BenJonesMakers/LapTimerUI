import React, { useState } from 'react';
import './App.css';
import RaceScreen from './Pages/raceScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar';
import { Switch, Route } from "react-router-dom";
import Events from './Pages/Events';

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
          <RaceScreen toggleRaceStatus={toggleRaceStatus} />
        </Route>
        <Route path="/live-race">
          <RaceScreen toggleRaceStatus={toggleRaceStatus} />
        </Route>
        <Route path="/events">
          <Events />
        </Route>
        <Route path="/drivers">
          <Events />
        </Route>
        <Route path="/settings">
          <Events />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
