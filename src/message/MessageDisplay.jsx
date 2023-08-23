import React from 'react';
import Loader from '../Loader';

function MessageDisplay({ response, isLoading }) {
  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (response.error) {
    content = <p>{response.error}</p>;
  } else if (response.data) {
    content = <pre>{JSON.stringify(response.data, null, 2)}</pre>;
  } else {
    content = <p></p>;
  }

  return <div className="response-box">{content}</div>;
}

export default MessageDisplay;