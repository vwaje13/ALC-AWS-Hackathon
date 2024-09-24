import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import profileimg from './profileimg.svg';
import mainpicture from './main_picture.jpg';
import { Routes, Route } from 'react-router-dom';
import Login from './login';

function TestButton() { //small button at the bottom of the page
    return (
      <button className="bg-blue-500 text-white py-1 px-3 rounded">
      <Link to="/login">Log In</Link>
      </button>
    )
  }

function Homepage(){
    return(
            <div className="App">
            <header className="App-header bg-gray-800 p-4">
            <img src={logo} className="App-logo w-32 h-22" alt="logo" />
             <p 
                 className="text-4xl font-bold text-white">InfinitePath
                </p>
            <TestButton />
            <img src={profileimg} className="App-profileimg w-20 h-20 mt-4" alt="profileimg" />
            </header>

            <img src={mainpicture} className="App-mainpicture" alt="mainpicture" />
            <Routes>
            <Route path="/login" element={<Login />} />
            </Routes>
            </div>
    )
}

export default Homepage;