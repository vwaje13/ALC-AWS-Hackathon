import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import profileimg from '../assets/profileimg.svg';
import googleIcon from '../assets/google-icon.png'; // Social login icons
import appleIcon from '../assets/apple-logo.png';
import facebookIcon from '../assets/facebook_logo.png';

function LoginButton() {
  return (
    <button className="bg-blue-500 text-white py-1.5 px-3 rounded w-full">
      Log In
    </button>
  );
}

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
    return (
      <div>
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

        {/*<div className="flex h-screen">
        Left Side - Image 
        <div className="w-1/2 flex justify-center items-center">
          <img src={mainpicture} alt="Turtle" className="w-3/4 h-auto" />
        </div> */}

        {/* Right Side - Login Form */}
        <div className="w-1/2 flex justify-center items-center">
          <div className="w-2/3 max-w-md">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">Log In</h1>

            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="email">
                Email or Username*
              </label>
              <input
                id="email"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2" htmlFor="password">
                Password*
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            {/* Forgot Password */}
            <div className="mb-6 text-right">
              <Link to="/forgot-password" className="text-blue-500 text-sm">
                Forgot Password?
              </Link>
            </div>

            {/* Log In Button */}
            <LoginButton />

            {/* Sign Up */}
            <div className="mt-6 text-center text-sm">
              <p>Don't have an account? <Link to="/signup" className="text-blue-500">Click here to sign up</Link></p>
            </div>

            {/* Social Login */}
            <div className="mt-6 text-center">
              <p className="mb-2">Or sign up using:</p>
              <div className="flex justify-center space-x-4">
                <img src={googleIcon} alt="Google" className="w-8 h-8" />
                <img src={appleIcon} alt="Apple" className="w-8 h-8" />
                <img src={facebookIcon} alt="Facebook" className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
  }
  
  export default Login;