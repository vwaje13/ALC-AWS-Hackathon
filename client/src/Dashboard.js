import React from 'react';
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
      <div className="dashboard-section">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>


        <div className="dashboard-tile bg-blue-500 text-white py-4 px-8 rounded mb-4">
          <h2 className="text-2xl">Life Skills</h2>
          <p>Enhance essential life skills</p>
        </div>


        <div className="dashboard-tile bg-green-500 text-white py-4 px-8 rounded mb-4">
          <h2 className="text-2xl">Social Skills</h2>
          <p>Improve interaction and communication</p>
        </div>


        <div className="dashboard-tile bg-purple-500 text-white py-4 px-8 rounded mb-4">
          <h2 className="text-2xl">Academic Skills</h2>
          <p>Excel in traditional academic subjects</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;