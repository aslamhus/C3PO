import React from 'react';
import TapToContinue from './TapToContinue';
import TypeText from './TypeText';
import { useSpeechBubble } from './useSpeechBubble';
import './speech-bubble.css';

export const SpeechBubble = React.memo((props) => {
  const {
    show,
    bubbleRef,
    bubbleText,
    positions,
    showTapToContinue,
    arrowPosition,
    handleTypingStart,
    handleTypingComplete,
  } = useSpeechBubble(props);
  return (
    <div className="speech-bubble-container" style={{ ...positions }}>
      <div
        ref={bubbleRef}
        className="speech-bubble"
        style={{
          transform: 'scale(1)',
          visibility: show ? 'visible' : 'hidden',
        }}
      >
        <TypeText
          show={show}
          typeSpeed={0.1}
          onTypingStart={handleTypingStart}
          onTypingComplete={handleTypingComplete}
        >
          <div className="speech type-text-target">{bubbleText}</div>
        </TypeText>
        {showTapToContinue && <TapToContinue />}
        <div className="bubble-arrow" style={{ ...arrowPosition }}></div>
      </div>
    </div>
  );
});

export default SpeechBubble;
