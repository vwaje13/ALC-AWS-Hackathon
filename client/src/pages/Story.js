import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import profileimg from '../assets/profileimg.svg';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ImageButton() {
  const imageButton = (src, alt, to) => (
    <Link to={to}>
      <img
        src={src}
        alt={alt}
        className="w-full h-half object-cover"
      />
      <span className="sr-only">{alt}</span>
    </Link>
  );

  return (
    <div>
      {imageButton(logo, 'Go to homepage', '/')} 
    </div>
  );
}

function Story() {
  const navigate = useNavigate();
  const query = useQuery();
  const email = query.get('email');
  const { skill } = useParams(); // Extract skill and activity from URL
  axios.post('http://localhost:5000/story/', {
    skill: skill,
    email: email
    }).then(response => 
      {
        
    });
    
  
  // These would typically come from your backend
  const storyTitle = "The Adventure of the Curious Cat";
  const storyContent = "Once upon a time, in a cozy little house at the end of Maple Street, there lived a cat named Whiskers. Whiskers was no ordinary cat; he was the most curious feline in the whole neighborhood. Every day, he would find new and exciting things to explore...";
  const storyImages = [
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300"
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-header-blue p-4">
        <nav className="flex items-center justify-between container mx-auto">
          <div className="flex items-center space-x-3">
            <ImageButton/>
            <p className="text-2xl font-bold text-white">InfinitePath</p>
          </div>
          <div className="flex items-center space-x-6">
            <img src={profileimg} className="h-12 w-12 rounded-full" alt="profileimg" />
          </div>
        </nav>
      </header>

      <main className="container mx-auto mt-8 p-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </button>

        <h1 className="text-3xl font-bold mb-6">{storyTitle}</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {storyImages.map((src, index) => (
            <img 
              key={index} 
              src={src} 
              alt={`Story illustration ${index + 1}`} 
              className="w-full h-auto rounded-lg shadow-md"
            />
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-lg leading-relaxed">{storyContent}</p>
        </div>
      </main>
    </div>
  );
}

export default Story;