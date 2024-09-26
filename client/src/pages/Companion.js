import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import profileimg from '../assets/profileimg.svg';
import animalImage from '../assets/turtle.svg'; // You'll need to add this image

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

function Dashboard() {
  const navigate = useNavigate();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const initializeMediaRecorder = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (mounted) {
          streamRef.current = stream;
          mediaRecorderRef.current = new MediaRecorder(stream);
          mediaRecorderRef.current.ondataavailable = handleDataAvailable;
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          console.error('Error accessing microphone:', err);
          setError('Unable to access microphone. Please check your permissions.');
        }
      }
    };

    initializeMediaRecorder();

    return () => {
      mounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      // Here you would typically send the audio data to your backend
      console.log('Audio data available:', event.data);
    }
  };

  const startRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'inactive') {
      setIsRecording(true);
      mediaRecorderRef.current.start();
    } else {
      setError('Unable to start recording. Please try again.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      setIsRecording(false);
      mediaRecorderRef.current.stop();
    } else {
      setError('No active recording to stop.');
    }
  };

  const playSound = (soundUrl) => {
    setIsSpeaking(true);
    audioRef.current.src = soundUrl;
    audioRef.current.play().catch(err => {
      console.error('Error playing audio:', err);
      setError('Unable to play audio. Please try again.');
      setIsSpeaking(false);
    });
  };

  const handleSoundEnded = () => {
    setIsSpeaking(false);
  };

  const sendMessage = (message) => {
    if (message.trim()) {
      setChatMessages([...chatMessages, { text: message, sender: 'user' }]);
      // Here you would typically send the message to your backend
      // and receive a response to update the chat
    }
  };

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
        <div className="flex flex-col items-center">
          <div className="relative w-64 h-64 mb-4">
            <img src={animalImage} alt="Virtual Companion" className="w-full h-full" />
            <div 
              className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-white rounded-full ${isSpeaking ? 'animate-bounce' : ''}`} 
              aria-hidden="true"
            ></div>
          </div>

          {error && (
            <div className="w-full max-w-md bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="h-64 overflow-y-auto mb-4">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex">
              <input 
                type="text" 
                className="flex-grow mr-2 p-2 border rounded" 
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(e.target.value)}
              />
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  const input = document.querySelector('input');
                  sendMessage(input.value);
                  input.value = '';
                }}
              >
                Send
              </button>
            </div>
          </div>

          <div className="flex space-x-4 mb-4">
            <button 
              className={`px-4 py-2 rounded ${isRecording ? 'bg-red-500' : 'bg-green-500'} text-white`}
              onClick={isRecording ? stopRecording : startRecording}
              disabled={!mediaRecorderRef.current}
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => playSound('path/to/your/sound/file.mp3')}
            >
              Play Sound
            </button>
          </div>

          <button 
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => navigate('/life')}
          >
            Done
          </button>
        </div>
      </main>

      <audio ref={audioRef} onEnded={handleSoundEnded} className="sr-only">
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default Dashboard;