import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import profileimg from './profileimg.svg';

function Dashboard() {
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

      {/* Dashboard Tiles */}
      <div className="dashboard-section grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Dashboard</h1>

        {/* Life Skills Tile */}
        <Link to="/life" className="tile">
          <div className="dashboard-tile bg-blue-500 text-white py-8 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out">
            <h2 className="text-3xl font-bold">Life Skills</h2>
            <p>Enhance essential life skills</p>
          </div>
        </Link>

        {/* Social Skills Tile */}
        <Link to="/social" className="tile">
          <div className="dashboard-tile bg-green-500 text-white py-8 px-4 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 ease-in-out">
            <h2 className="text-3xl font-bold">Social Skills</h2>
            <p>Improve interaction and communication</p>
          </div>
        </Link>

        {/* Academic Skills Tile */}
        <Link to="/academic" className="tile">
          <div className="dashboard-tile bg-purple-500 text-white py-8 px-4 rounded-lg shadow-lg hover:bg-purple-600 transition duration-300 ease-in-out">
            <h2 className="text-3xl font-bold">Academic Skills</h2>
            <p>Excel in traditional academic subjects</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;