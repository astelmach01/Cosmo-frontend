import React, { useState } from 'react';
import './App.css';
import MessageDisplay from './message/MessageDisplay';
import MessageInput from './message/MessageInput';
import { sendRequest } from './api';

function App() {
  const [response, setResponse] = useState({ data: '', error: '' });
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text) => {
    setIsLoading(true);
    try {
      const res = await sendRequest(text);
      setResponse({ data: res.data, error: '' });
    } catch (error) {
      setResponse({ data: '', error: error.toString() });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cosmo 🛸</h1>
      </header>
      <div className="blank-element"></div>
      <main className="App-main">
        <MessageDisplay response={response} isLoading={isLoading} />
        <MessageInput sendMessage={sendMessage} />
      </main>
    </div>
  );
}

export default App;