import React, { useState } from 'react';

function MessageInput({ sendMessage }) {
  const [message, setMessage] = useState('');

  const handleKeyDown = async (e) => {
    if (e.keyCode === 13 && message.trim() !== '') {
      await sendMessage(message);
      setMessage('');
    }
  };

  const handleSubmit = async () => {
    if (message.trim() !== '') {
      await sendMessage(message);
      setMessage('');
    }
  };

  return (
      <div className="message-box">
        <div className="message-input">
        <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
        />
          <button onClick={handleSubmit} className="submit-button">
            Enter
          </button>
        </div>
      </div>
  );
}

export default MessageInput;