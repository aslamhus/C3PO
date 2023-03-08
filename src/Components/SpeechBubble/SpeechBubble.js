import React from 'react';
import './speech-bubble.css';
import { useSpeechBubble } from './useSpeechBubble';

export const SpeechBubble = React.memo((props) => {
  const { positions, bubbleRef, _show, bubbleText, parseSpeech, arrowPosition } =
    useSpeechBubble(props);

  return (
    <div className="speech-bubble-container" style={{ ...positions }}>
      <div
        ref={bubbleRef}
        className="speech-bubble"
        style={{
          transform: 'scale(1)',
          visibility: _show ? 'visible' : 'hidden',
        }}
      >
        <div className="speech" dangerouslySetInnerHTML={parseSpeech(bubbleText)}></div>
        <div className="bubble-arrow" style={{ ...arrowPosition }}></div>
      </div>
    </div>
  );
});

export default SpeechBubble;
