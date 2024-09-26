import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import profileimg from '../assets/profileimg.svg';

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

function LifeSkills() {
  const navigate = useNavigate();

  return (
    <div className="App">
      {/* headerrrr */}
      <header className="bg-header-blue p-4">
        <nav className="flex items-center justify-between container mx-auto">
          <div className="flex items-center space-x-3">
            <ImageButton /> {/* Use ImageButton here */}
            <p className="text-2xl font-bold text-white">InfinitePath</p>
          </div>

          <div className="flex items-center space-x-6">
            <img src={profileimg} className="h-12 w-12 rounded-full" alt="profileimg" />
          </div>
        </nav>
      </header>

    {/* top */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Life Skills</h1>

      {/* quiz */}
        <div className="flex flex-col space-y-4 mb-8">
          <Link to="/quiz" className="w-full">
            <div className="bg-red-500 text-white py-8 px-4 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 ease-in-out text-center">
              <h2 className="text-3xl font-bold">Quiz</h2>
              <p>Test your knowledge</p>
            </div>
          </Link>

        {/* story */}
          <Link to="/story" className="w-full">
            <div className="bg-yellow-500 text-white py-8 px-4 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300 ease-in-out text-center">
              <h2 className="text-3xl font-bold">Story</h2>
              <p>Engage through interactive stories</p>
            </div>
          </Link>

        {/* companion */}
          <Link to="/companion" className="w-full">
            <div className="bg-body-blue text-white py-8 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out text-center">
              <h2 className="text-3xl font-bold">Companion</h2>
              <p>Get guidance from our AI companion</p>
            </div>
          </Link>
        </div>

      {/* back button */}
        <div className="text-center">
          <Link
            to="/dashboard" // Use a Link to redirect to the dashboard
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LifeSkills;