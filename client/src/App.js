import logo from './logo.svg';
import profileimg from './profileimg.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './login'; 
import { Link } from 'react-router-dom';

function TestButton() { //small button at the bottom of the page
  return (
    <button className="bg-blue-500 text-white py-2 px-4 rounded">
    press me !
    </button>
  )
}

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header bg-gray-800 p-4">
      <img src={logo} className="App-logo w-32 h-22" alt="logo" />
        <p 
          className="text-4xl font-bold text-white">InfinitePath
        </p>
      <img src={profileimg} className="App-profileimg w-20 h-20 mt-4" alt="profileimg" />
      </header>
      <TestButton />
      <Link to="/login">Log In</Link>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;