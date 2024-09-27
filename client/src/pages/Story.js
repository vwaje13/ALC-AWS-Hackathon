import React, {useState, useEffect} from 'react';
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
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [storyFetched, setStoryFetched] = useState(false); // State to track if the story has been fetched


  const navigate = useNavigate();
  const query = useQuery();
  const email = query.get('email');
  const { skill } = useParams(); // Extract skill and activity from URL
  useEffect(() => {
    if (!storyFetched) {
    axios.post('http://localhost:5000/story/', {
      topic: skill,
      email: email
    }).then(response => {
      console.log('Story fetched!', response.data);
      setTitle(response.data.title);
      setBody(response.data.body);
      setStoryFetched(true)
    }).catch(error => {
      console.error('There was an error fetching the story!', error);
    });
  }
  }, []); // Dependencies array
  
  
  // These would typically come from your backend
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

        <h1 className="text-3xl font-bold mb-6">{title}</h1>

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
          <p className="text-lg leading-relaxed">{body}</p>
        </div>
      </main>
    </div>
  );
}

export default Story;