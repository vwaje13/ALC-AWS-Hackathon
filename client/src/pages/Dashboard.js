import React from 'react';
import { Link } from 'react-router-dom';
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

function Dashboard() {
  return (
    <div className="App">
      {/* Header section - Stays at the top */}
      <header className="bg-header-blue p-4 w-full fixed top-0 left-0 z-10">
        <nav className="flex items-center justify-between container mx-auto">
          <div className="flex items-center space-x-3">
            <ImageButton />
            <p className="text-2xl font-bold text-white">InfinitePath</p>
          </div>
          <div className="flex items-center space-x-6">
            <img src={profileimg} className="h-12 w-12 rounded-full" alt="profileimg" />
          </div>
        </nav>
      </header>

      {/* Add padding to avoid content hiding behind the fixed header */}
      <div className="pt-20 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8 text-center">Dashboard</h1>

        {/* Life Skills Tile */}
        <Link to="/life" className="w-full max-w-md mb-6">
          <div className="dashboard-tile bg-blue-500 text-white py-8 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out text-center">
            <h2 className="text-3xl font-bold">Life Skills</h2>
            <p className="mt-2">Enhance essential life skills</p>
          </div>
        </Link>

        {/* Social Skills Tile */}
        <Link to="/social" className="w-full max-w-md mb-6">
          <div className="dashboard-tile bg-green-500 text-white py-8 px-4 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 ease-in-out text-center">
            <h2 className="text-3xl font-bold">Social Skills</h2>
            <p className="mt-2">Improve interaction and communication</p>
          </div>
        </Link>

        {/* Academic Skills Tile */}
        <Link to="/academic" className="w-full max-w-md mb-6">
          <div className="dashboard-tile bg-purple-500 text-white py-8 px-4 rounded-lg shadow-lg hover:bg-purple-600 transition duration-300 ease-in-out text-center">
            <h2 className="text-3xl font-bold">Academic Skills</h2>
            <p className="mt-2">Excel in traditional academic subjects</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;