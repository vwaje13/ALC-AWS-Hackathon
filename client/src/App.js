import logo from './logo.svg';
import profileimg from './profileimg.svg';
import './App.css';

function TestButton() { //small button at the bottom of the page
  return (
    <button>
    press me !
    </button>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <img src={logo} className="App-logo" alt="logo" />
        <p>
           InfinitePath 
        </p>
        <img src={profileimg} className="App-profileimg" alt="profileimg" /> 
      </header>
      <TestButton />
    </div>
  );
}

export default App;