import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';
import profileimg from '../assets/profileimg.svg';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function QuizCompletion() {
  const query = useQuery();
  const email = query.get('email');
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(`/dashboard?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-header-blue p-4">
        <nav className="flex items-center justify-between container mx-auto">
          <div className="flex items-center space-x-3">
            <ImageButton src={logo} alt="Go to homepage" to="/" />
            <p className="text-2xl font-bold text-white">InfinitePath</p>
          </div>
          <div className="flex items-center space-x-6">
            <img src={profileimg} className="h-12 w-12 rounded-full" alt="profileimg" />
          </div>
        </nav>
      </header>

      <main className="container mx-auto mt-8 p-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Quiz Completed</h1>
        <div className="text-center mt-8">
          <button
            onClick={handleRedirect}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Go to Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}

function ImageButton({ src, alt, to }) {
  return (
    <Link to={to}>
      <img
        src={src}
        alt={alt}
        className="w-full h-half object-cover"
      />
      <span className="sr-only">{alt}</span>
    </Link>
  );
}

export default QuizCompletion;