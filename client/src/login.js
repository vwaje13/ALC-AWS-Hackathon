import React from 'react';
import logo from './logo.svg';
import profileimg from './profileimg.svg';

//new file for the page
function Login() {
    return (
      <div>
        <div className="App">
        <header className="App-header bg-gray-800 p-4">
            <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
            <img src={logo} className="App-logo w-22 h-22" alt="logo" />
             <p className="h-8 w-auto text-2xl font-bold text-white ">
              InfinitePath
            </p>
            <img src={profileimg} className="App-profileimg absolute top-8 right-0 h-16 w-16" alt="profileimg" />
            </nav>
            </header>
        </div>
        <h1 class="font-sans type-lg/[40px]">Log In</h1>
        <p>please please please</p>
      </div>
    );
  }
  
  export default Login;