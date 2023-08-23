import React, { useState } from 'react';
import PropTypes from 'prop-types';

function MessageInput({ sendMessage }) {
  const [message, setMessage] = useState('');

  const handleKeyDown = async (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (message.trim() !== '') {
        await sendMessage(message);
        setMessage('');
      }
    }
  };

  return (
    <div className="message-box">
      <textarea
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here..."
      />
    </div>
  );
}

export default MessageInput;

MessageInput.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};
