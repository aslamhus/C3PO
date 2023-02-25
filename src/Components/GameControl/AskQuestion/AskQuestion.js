import React, { useEffect, useState } from 'react';
import { useAskQuestion } from './hooks/useAskQuestion';
import './ask-question.css';

export default function AskQuestion({}) {
  let timeout;
  const [_show, setShow] = useState(false);
  const {
    questionState: { show, responses, promptDelay },
    handleResponse,
  } = useAskQuestion();

  useEffect(() => {
    console.log('show!', show, promptDelay);
    if (show && !_show) {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => setShow(true), promptDelay * 1000);
    }
  }, [show]);

  return (
    <div className="ask-question" style={{ display: _show ? '' : 'none' }}>
      {responses &&
        responses.map((response, index) => {
          return (
            <button
              key={`${response.title}-${index}`}
              onClick={handleResponse}
              value={response.value}
            >
              {response.title}
            </button>
          );
        })}
    </div>
  );
}
