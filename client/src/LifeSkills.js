import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import profileimg from './profileimg.svg';

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
      {/* Header section with the same format as Homepage */}
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

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Navigate to the previous page
        className="bg-gray-500 text-white py-2 px-4 rounded-lg m-4 hover:bg-gray-600"
      >
        Back
      </button>

      {/* Life Skills Tiles */}
      <div className="life-section grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Life Skills</h1>

        {/* Quiz Tile */}
        <Link to="/quiz" className="tile">
          <div className="life-tile bg-red-500 text-white py-8 px-4 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 ease-in-out">
            <h2 className="text-3xl font-bold">Quiz</h2>
            <p>Test your life skills knowledge</p>
          </div>
        </Link>

        {/* Story Tile */}
        <Link to="/story" className="tile">
          <div className="life-tile bg-yellow-500 text-white py-8 px-4 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300 ease-in-out">
            <h2 className="text-3xl font-bold">Story</h2>
            <p>Learn life skills through stories</p>
          </div>
        </Link>

        {/* Companion Tile */}
        <Link to="/companion" className="tile">
          <div className="life-tile bg-blue-500 text-white py-8 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out">
            <h2 className="text-3xl font-bold">Companion</h2>
            <p>Get guidance from our AI companion</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default LifeSkills;