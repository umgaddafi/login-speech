import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [isListening, setIsListening] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Please Authenticate');
  const navigate = useNavigate();

  // Store the correct passphrase
  const correctPassphrase = "Gaddafi Mohammad Safiya";

  const handleListen = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert('Speech recognition is not supported by your browser');
      return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setStatusMessage("Listening...");
      setIsListening(true);
    };

    recognition.onerror = () => {
      setStatusMessage("Sorry, I couldn't hear you. Please try again.");
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setStatusMessage(`You said: ${transcript}`);

      if (transcript.trim() === correctPassphrase) {
        setStatusMessage("Passphrase matched! Redirecting...");
        navigate('/welcome');  // Redirect to Welcome page
      } else {
        setStatusMessage("Incorrect passphrase. Please try again.");
      }

      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="login-page">
      <h1>{statusMessage}</h1>
      <button 
        onClick={handleListen} 
        disabled={isListening} 
        style={{ fontSize: '24px', padding: '10px', cursor: 'pointer' }}
      >
        🎙️
      </button>
    </div>
  );
};

export default LoginPage;
