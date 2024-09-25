import React from 'react';
import logo from './logo.svg';
import profileimg from './profileimg.svg';

//new file for the page
function Login() {
    return (
      <div>
        <div className="App">
            <header className="App-header bg-gray-800 p-4">
            <img src={logo} className="App-logo w-32 h-22" alt="logo" />
             <p 
                className="text-4xl font-bold text-white">InfinitePath
              </p>
            <img src={profileimg} className="App-profileimg w-20 h-20 mt-4" alt="profileimg" />
            </header>
        </div>
        <h1 class="font-sans type-lg/[40px]">Log In</h1>
        <p>please please please</p>
      </div>
    );
  }
  
  export default Login;