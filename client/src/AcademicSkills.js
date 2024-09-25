import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from './logo.svg';
import profileimg from './profileimg.svg';

function AcademicSkills() {
  const navigate = useNavigate(); // Define navigate

  return (
    <div className="App">
      {/* Header section with the same format as Homepage */}
      <header className="App-header bg-gray-800 p-4">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <img src={logo} className="App-logo w-22 h-22" alt="logo" />
          <p className="text-2xl font-bold text-white">InfinitePath</p>
          <img src={profileimg} className="App-profileimg w-20 h-20 mt-4" alt="profileimg" />
        </nav>
      </header>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Navigate to the previous page
        className="bg-gray-500 text-white py-2 px-4 rounded-lg m-4 hover:bg-gray-600"
      >
        Back
      </button>

      {/* Academic Skills Tiles */}
      <div className="academic-section grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Academic Skills</h1>

        {/* Quiz Tile */}
        <Link to="/quiz" className="tile">
          <div className="academic-tile bg-red-500 text-white py-8 px-4 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 ease-in-out">
            <h2 className="text-3xl font-bold">Quiz</h2>
            <p>Test your knowledge</p>
          </div>
        </Link>

        {/* Story Tile */}
        <Link to="/story" className="tile">
          <div className="academic-tile bg-yellow-500 text-white py-8 px-4 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300 ease-in-out">
            <h2 className="text-3xl font-bold">Story</h2>
            <p>Engage through interactive stories</p>
          </div>
        </Link>

        {/* Companion Tile */}
        <Link to="/companion" className="tile">
          <div className="academic-tile bg-blue-500 text-white py-8 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out">
            <h2 className="text-3xl font-bold">Companion</h2>
            <p>Get guidance from our AI companion</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AcademicSkills;