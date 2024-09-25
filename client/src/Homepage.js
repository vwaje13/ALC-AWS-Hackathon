import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import profileimg from './profileimg.svg';
import mainpicture from './main_picture.jpg';
import googleIcon from './google-icon.png'; // Social login icons
import appleIcon from './apple-logo.png';
import facebookIcon from './facebook_logo.png';
import { Routes, Route } from 'react-router-dom';
import Login from './login';
import ChildProfile from './childProfile';

function LoginButton() { //small button at the bottom of the page
    return (
      <button className="bg-blue-500 text-white py-.5 px-1.5 rounded">
      <Link to="/login">Log In</Link>
      </button>
    )
  }

function SignUpButton(){
  return (
    <button className="bg-blue-500 text-white py-1 px-3 rounded">
    <Link to="/childProfile">Sign Up</Link>
    </button>
  )
}

function Homepage(){
    
  //SCROLLING FROM JOIN FREE TO SIGN UP 
  const handleScrollToSignup = () => {
    const signUpSection = document.getElementById("signup-section");
    if(signUpSection) {
      signUpSection.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error("Signup section not found");
    }
    
  }
  
  return(
    <div className="App">

      {/* header */}
    <header className="App-header bg-gray-800 p-4">
    <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">

      {/* title/logo */}
      <div className="flex items-center">
        <img src={logo} className="App-logo w-22 h-22" alt="logo" />
        <p className="ml-3 h-9 w-auto text-2xl font-bold text-white ">
          InfinitePath
        </p>
      </div>

      {/* right side */}
      <div className="flex items-center space-x-5">
        <LoginButton />
        <img src={profileimg} className="App-profileimg top-4 right-0 h-16 w-16" alt="profileimg" />
      </div>      
    </nav>
    </header>
   
   {/* routes */}
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/childProfile" element={<ChildProfile />} />
    </Routes>
    
            
    
    {/* hero section (words on image) */}
    <section className="hero-section">
    <img src={mainpicture} className="App-mainpicture" alt="mainpicture" />
    <div className="hero-section"> 
      <p>
        Your child with ASD will receive personalized learning in traditional classroom subjects, social skills,
        and essential life skills, all tailored to their unique strengths and needs.
      </p>
    <button className="hero-button" onClick={handleScrollToSignup}>Join for Free</button>
    </div>
    </section>

    {/* SIGN-UP FORM */}
    <section id="signup-section" className="signup-section">
    <h2>SIGN UP</h2>
    <form className="signup-form">
      <input type="text" placeholder="Name" required />
      <input type="email" placeholder="Email or Username*" required />
      <input type="password" placeholder="Password*" required />
      <SignUpButton />
    </form>
            
    <div className="social-login">
      <p> Or sign up using:</p>
      <img src={googleIcon} className="App-googleIcon w-10 h-10" alt="Google" />
      <img src={appleIcon} className="App-appleIcon w-10 h-10" alt="Apple" />
      <img src={facebookIcon} className="App-facebookIcon w-10 h-10" alt="Facebook" />
    </div>
    </section>

    {/* MISSION  STATEMENT */}
    <section className="mission-selection">
      <h3>Where every child's potential unfolds</h3>
      <p>
        Our mission at InfinitePath is to empower children with autism by providing personalized, affordable learning
        solutions that adapt to their unique needs. Using advanced AI, we create tailored educational plans across social, 
        life, and academic skills, ensuring every child can thrive both in school and at home.
      </p>
    </section>

    {/* CONTACT SECTION */}
    <footer className="contact-section">
      <p>CONTACT US</p>
    </footer>

    </div>
    )
}

export default Homepage;