import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { TailSpin } from 'react-loader-spinner';
import { inject } from '@vercel/analytics';

const API_BASE_URL = 'https://cosmo-backend-api-b1c95546381e.herokuapp.com';

inject();

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text) => {
    try {
      setMessage('');
      setIsLoading(true);
      const res = await axios.post(`${API_BASE_URL}/api/chat/request`, { prompt: text });
      setResponse(res.data.response);
    } catch (error) {
      setResponse({ error: error.toString() });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (message.trim() !== '') {
        await sendMessage(message);
        setMessage('');
      }
    }
  };

  let responseContent = null;

  if (isLoading) {
    responseContent = (
      <TailSpin
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible
      />
    );
  } else if (typeof response === 'object') {
    responseContent = <pre>{JSON.stringify(response, null, 2)}</pre>;
  } else {
    responseContent = <p>{response}</p>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cosmo Chat</h1>
      </header>
      <main className="App-main">
        <div className="response-box">{responseContent}</div>
        <div className="message-box">
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
          />
        </div>
      </main>
    </div>
  );
}

export default App;
