import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import profileimg from '../assets/profileimg.svg';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
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

function Dashboard() {
  const [activeSkill, setActiveSkill] = useState('life');
  const query = useQuery();
  const email = query.get('email');

  const skills = [
    { id: 'life', name: 'Life Skills', color: 'bg-blue-500', darkerColor: 'bg-blue-700' },
    { id: 'social', name: 'Social Skills', color: 'bg-green-500', darkerColor: 'bg-green-700' },
    { id: 'academic', name: 'Academic Skills', color: 'bg-purple-500', darkerColor: 'bg-purple-700' },
  ];

  const activities = {
    life: [
      { id: 'quiz', name: 'Quiz', description: 'Test your life skills knowledge', color: 'bg-red-500 hover:bg-red-600' },
      { id: 'story', name: 'Story', description: 'Learn through interactive life stories', color: 'bg-yellow-500 hover:bg-yellow-600' },
      { id: 'companion', name: 'Companion', description: 'Get guidance on life skills', color: 'bg-blue-500 hover:bg-blue-600' },
    ],
    social: [
      { id: 'quiz', name: 'Role Play', description: 'Practice social scenarios', color: 'bg-pink-500 hover:bg-pink-600' },
      { id: 'story', name: 'Discussion', description: 'Engage in social topics', color: 'bg-indigo-500 hover:bg-indigo-600' },
      { id: 'companion', name: 'Feedback', description: 'Get insights on your social skills', color: 'bg-teal-500 hover:bg-teal-600' },
    ],
    academic: [
      { id: 'quiz', name: 'Study Session', description: 'Focus on academic subjects', color: 'bg-orange-500 hover:bg-orange-600' },
      { id: 'story', name: 'Practice Problems', description: 'Solve academic challenges', color: 'bg-cyan-500 hover:bg-cyan-600' },
      { id: 'companion', name: 'AI Tutor', description: 'Get help with academic topics', color: 'bg-lime-500 hover:bg-lime-600' },
    ],
  };
  return (
    <div className="flex flex-col min-h-screen">
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

      <div className="bg-gray-300 p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-sans">Dashboard</h1>
        </div>
      </div>

      <main className="flex-grow bg-white">
        <div className="container mx-auto flex">
          <div className="w-1/4 p-4 border-r">
            {skills.map((skill) => (
              <button
              key={skill.id}
              onClick={() => setActiveSkill(skill.id)}
              className={`w-full text-left text-white py-3 px-4 rounded-lg mb-4 transition duration-300 ease-in-out 
                ${activeSkill === skill.id ? skill.darkerColor : skill.color}
              `}
            >
              <h3 className="text-lg font-semibold">{skill.name}</h3>
              </button>
            ))}
          </div>

          <div className="w-3/4 p-4">
            <div className="space-y-4">
              {activities[activeSkill].map((activity, index) => (
                <Link key={activity.id} to={`/${activeSkill}/${activity.id}`} className="block w-full">
                  <div className={` p-4 rounded-lg ${activity.color} ${index === 2 ? 'border-2 ' : ''}`}>
                    <h3 className="text-xl text-black font-bold">{activity.name}</h3>
                    <p className="text-sm text-black">{activity.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;