// QuizCompletion.js
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import logo from '../assets/logo.svg';
import profileimg from '../assets/profileimg.svg';

function DashboardButton() {
  return (
    <Link
      to="/dashboard"
      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
    >
      Back to Dashboard
    </Link>
  );
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

function QuizCompletion() {
  const { skill } = useParams();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-header-blue p-4">
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
      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">
          {skill.charAt(0).toUpperCase() + skill.slice(1)} Quiz Completed!
        </h1>
        <p className="text-xl mb-8">Congratulations on completing the {skill} skills quiz!</p>
        <DashboardButton />
      </div>
    </div>
  );
}

export default QuizCompletion;