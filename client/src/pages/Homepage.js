import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import profileimg from '../assets/profileimg.svg';
import mainpicture from '../assets/main_picture.jpg';
import googleIcon from '../assets/google-icon.png'; 
import appleIcon from '../assets/apple-logo.png';
import facebookIcon from '../assets/facebook_logo.png';
import { Routes, Route } from 'react-router-dom';
import Login from './login';
import ChildProfile from './childProfile';

function LoginButton() {
    return (
      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">
        <Link to="/login" className="text-white">Log In</Link>
      </button>
    );
}

function SignUpButton(){
  return (
    <button className="bg-green-500 text-white py-2 px-4 rounded-lg w-full">
      <Link to="/childProfile" className="text-white">Sign Up</Link>
    </button>
  );
}

function Homepage() {

  const handleScrollToSignup = () => {
    const signUpSection = document.getElementById("signup-section");
    if (signUpSection) {
      signUpSection.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error("Signup section not found");
    }
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="bg-header-blue p-4">
        <nav className="flex items-center justify-between container mx-auto">
          <div className="flex items-center space-x-3">
            <img src={logo} className="w-16 h-16" alt="logo" />
            <p className="text-2xl font-bold text-white">InfinitePath</p>
          </div>
          <div className="flex items-center space-x-6">
            <LoginButton />
            <img src={profileimg} className="h-12 w-12 rounded-full" alt="profileimg" />
          </div>
        </nav>
      </header>

      {/* Routes */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/childProfile" element={<ChildProfile />} />
      </Routes>

      {/* Hero Section */}
      <section className="relative">
        <img src={mainpicture} className="w-full h-88 object-cover" alt="main" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
          <p className="text-white text-4xl md:text-5xl font-bold">
            Learning without limits for extrordinary minds
          </p>
          <p className="text-white text-lg mt-4 max-w-xl">
            Tailored educational plans across social, life, and academic skills, ensuring your child thrives.
          </p>
          <button 
            className="bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg mt-6"
            onClick={handleScrollToSignup}>
            Join for Free
          </button>
        </div>
      </section>

      {/* Signup Section */}
      <section id="signup-section" className="py-20 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
          <form className="max-w-md mx-auto space-y-4">
            <input 
              type="text" 
              placeholder="Name" 
              className="w-full p-3 border border-gray-300 rounded-md" 
              required 
            />
            <input 
              type="email" 
              placeholder="Email or Username*" 
              className="w-full p-3 border border-gray-300 rounded-md" 
              required 
            />
            <input 
              type="password" 
              placeholder="Password*" 
              className="w-full p-3 border border-gray-300 rounded-md" 
              required 
            />
            <SignUpButton />
          </form>
          
          <div className="mt-8">
            <p className="text-gray-600">Or sign up using:</p>
            <div className="flex justify-center space-x-6 mt-4">
              <img src={googleIcon} className="w-10 h-10" alt="Google" />
              <img src={appleIcon} className="w-10 h-10" alt="Apple" />
              <img src={facebookIcon} className="w-10 h-10" alt="Facebook" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-white text-center">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold">Where Every Child's Potential Unfolds</h3>
          <p className="mt-4 text-gray-700 max-w-3xl mx-auto">
            Our mission at InfinitePath is to empower children with autism by providing personalized, affordable learning solutions 
            that adapt to their unique needs. Using advanced AI, we create tailored educational plans across social, life, and academic skills, 
            ensuring every child can thrive both in school and at home.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto text-center">
          <p>Contact Us</p>
          <p className="mt-4">info@infinitepath.com | 123-456-7890</p>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;