import logo from './logo.svg';
import './App.css';
import AvailablePorts from './components/availablePorts';
import StartListeningButton from './components/startListeningButton';
import StopListeningButton from './components/stopListeningButton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <AvailablePorts />
        <StartListeningButton comPort={'COM4'} />
        <StopListeningButton />
      </header>
    </div>
  );
}

export default App;
