import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import gifFile from '../assets/owl.gif';  // Include your GIF

function Companion() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);  // Store recorded audio here
  const [error, setError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);  // Track upload status
  const [chatMessages, setChatMessages] = useState([]);  // Store chat messages
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const inputRef = useRef(null);  // For text input field

  // Initialize MediaRecorder and microphone access
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

  // Handle recording data when available
  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      setAudioBlob(event.data); // Store the audio blob
    }
  };

  // Start recording
  const startRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'inactive') {
      setIsRecording(true);
      mediaRecorderRef.current.start();
      setUploadSuccess(null); // Reset upload success status
    } else {
      setError('Unable to start recording. Please try again.');
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      setIsRecording(false);
      mediaRecorderRef.current.stop();
    } else {
      setError('No active recording to stop.');
    }
  };

  // Send audio to the Flask backend
  const sendAudioToBackend = async () => {
    if (audioBlob) {
      const formData = new FormData();
      formData.append('file', audioBlob, 'voice-input.wav');  // You can change the file name as needed

      try {
        const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Audio sent successfully:', response.data);
        setUploadSuccess(true);  // Set success message
      } catch (err) {
        console.error('Error sending audio to backend:', err);
        setError('Failed to send audio to backend.');
        setUploadSuccess(false);  // Set failure message
      }
    } else {
      setError('No audio recorded.');
    }
  };

  // Send text message (user input)
  const sendMessage = () => {
    const message = inputRef.current.value;
    if (message.trim()) {
      setChatMessages([...chatMessages, { text: message, sender: 'user' }]);
      inputRef.current.value = '';  // Clear the input after sending
      // Here you would typically send the message to the backend and process a response
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Virtual Companion</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {uploadSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">Audio uploaded successfully!</span>
        </div>
      )}

      {uploadSuccess === false && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">Audio upload failed. Please try again.</span>
        </div>
      )}

      <div className="flex flex-col items-center">
        {/* Virtual Companion GIF */}
        <div className="relative w-64 h-64 mb-4">
          <img src={gifFile} alt="Virtual Companion" className="w-full h-full object-contain" />
          <div 
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-white rounded-full ${isRecording ? 'animate-bounce' : ''}`} 
            aria-hidden="true"
          ></div>
        </div>

        {/* Chat Display */}
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

          {/* Text Input */}
          <div className="flex">
            <input 
              type="text" 
              className="flex-grow mr-2 p-2 border rounded" 
              placeholder="Type your message..."
              ref={inputRef}
            />
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>

        {/* Recording Controls */}
        <div className="flex space-x-4 mb-4">
          <button 
            className={`px-4 py-2 rounded ${isRecording ? 'bg-red-500' : 'bg-green-500'} text-white`}
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={sendAudioToBackend}
            disabled={!audioBlob}
          >
            Send Voice Input
          </button>
        </div>
      </div>
    </div>
  );
}

export default Companion;
