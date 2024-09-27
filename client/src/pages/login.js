import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import profileimg from '../assets/profileimg.svg';
import googleIcon from '../assets/google-icon.png'; // Social login icons
import appleIcon from '../assets/apple-logo.png';
import facebookIcon from '../assets/facebook_logo.png';
import turtleImage from '../assets/turtle.svg';
import Dashboard from './Dashboard';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

function ImageButton() {
  const imageButton = (src, alt, to) => (
    <Link 
      to={to} // Changed href to 'to' for react-router Link
    >
      <img // Replaced 'Logo' with 'img'
        src={src} // Correct usage for img src
        alt={alt}
        className="w-full h-half object-cover"
      />
      <span className="sr-only">{alt}</span> {/* For screen readers */}
    </Link>
  );

  return (
    <div>
      {imageButton(logo, 'Go to homepage', '/')} 
    </div>
  );
}


//new file for the page
function Login() {
  const [emailLocal, setEmailLocal] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const databaseChecker = (e) => {

    e.preventDefault(); //Prevent page refresh
    setLoading(true); //So the user can see it's loading
    setError(''); //Clear previous error messages
    
    console.log("Hello World!ADlaksjdlkaskjdlkasd")

    //Actual call here
    axios.post('http://localhost:5000/logincheck/', {
      email: emailLocal,
      password: password
    })
    .then(response => 
      {
      if (response.status === 200) {
        window.location.href = `/dashboard?email=${encodeURIComponent(emailLocal)}`;
      } 
  
      else {
        setError(response.message);
      }
  
      setLoading(false);
    })
  
    //error catching
    .catch(error => {
      alert(error);
      setLoading(false);
    });
  };
  

    return (
      <div className="min-h-screen bg-gray-100">
        <div className="App">
        <header className="bg-header-blue p-4">
        <nav className="flex items-center justify-between container mx-auto">
          <div className="flex items-center space-x-3">
            <ImageButton/>
            {/*<img src={logo} className="w-16 h-16" alt="logo" />*/}
            <p className="text-2xl font-bold text-white">InfinitePath</p>
          </div>

          <div className="flex items-center space-x-6">
          <img src={profileimg} className="h-12 w-12 rounded-full" alt="profileimg" />
          </div>
        </nav>
        </header>
        </div>

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

<main className="flex container mx-auto mt-10">
        <div className="w-1/2 flex justify-center items-center">
          <img src={turtleImage} alt="Turtle reading" className="w-3/4 h-auto" />
        </div>

        <div className="w-1/2 flex justify-center items-center">
          <div className="w-2/3 max-w-md bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Log In</h1>
            <form onSubmit={databaseChecker}>
            <div className="mb-4">

              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email*
              </label>
              <input
                id="email"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                name="artist-name" 
                value={emailLocal}
                onChange={(e) => setEmailLocal(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" htmlFor="password">
                Password*
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                name="artist-name" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="bg-blue-500 text-white py-3 px-3 rounded w-full">Log In</button>

            </form>
            <div className="mb-6 text-right">
              <Link to="/" className="text-blue-500 text-sm hover:underline">
                Forgot Password?
              </Link>
            </div>

            <div className="mt-6 text-center text-sm">
              <p>Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Click here to sign up</Link></p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-4">Or sign up using:</p>
              <div className="flex justify-center space-x-4">
                <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition duration-300">
                  <img src={googleIcon} alt="Google" className="w-6 h-6" />
                </button>
                <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition duration-300">
                  <img src={appleIcon} alt="Apple" className="w-6 h-6" />
                </button>
                <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition duration-300">
                  <img src={facebookIcon} alt="Facebook" className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;