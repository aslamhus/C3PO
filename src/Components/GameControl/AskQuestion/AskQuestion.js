import React, { useEffect, useState } from 'react';
import { useAskQuestion } from './hooks/useAskQuestion';
import './ask-question.css';
import SelectButton from '../../UI/Buttons/SelectButton';

export default function AskQuestion({}) {
  let timeout;
  const [_show, setShow] = useState(false);
  const {
    questionState: { show, responses, promptDelay },
    handleResponse,
  } = useAskQuestion();

  useEffect(() => {
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
            <SelectButton
              key={`${response.title}-${index}`}
              onClick={handleResponse}
              value={response.value}
            >
              {response.title}
            </SelectButton>
          );
        })}
    </div>
  );
}
