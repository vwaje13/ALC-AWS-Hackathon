import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import profileimg from './profileimg.svg';
import googleIcon from './google-icon.png'; // Social login icons
import appleIcon from './apple-logo.png';
import facebookIcon from './facebook_logo.png';

function LoginButton() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Add any logic here, like validation or API calls if needed
    navigate('/dashboard');
  };

  return (
    <button 
      className="bg-blue-500 text-white py-1.5 px-3 rounded w-full"
      onClick={handleLoginClick}
    >
      Log In
    </button>
  );
}

// New file for the page
function Login() {
  return (
    <div>
      <div className="App">
        <header className="App-header bg-gray-800 p-.5">
          <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
            <img src={logo} className="App-logo w-22 h-22" alt="logo" />
            <p className="h-8 w-auto text-2xl font-bold text-white">
              InfinitePath
            </p>
            <img src={profileimg} className="App-profileimg absolute top-4 right-0 h-16 w-16" alt="profileimg" />
          </nav>
        </header>
      </div>

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