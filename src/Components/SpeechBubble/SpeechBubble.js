import React from 'react';
import TapToContinue from './TapToContinue';
import TypeText from './TypeText';
import { useSpeechBubble } from './useSpeechBubble';
import './speech-bubble.css';

export const SpeechBubble = React.memo((props) => {
  const {
    _show,
    bubbleRef,
    bubbleText,
    positions,
    showTapToContinue,
    arrowPosition,
    handleTypingComplete,
  } = useSpeechBubble(props);

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
        <TypeText show={_show} typeSpeed={0.1} onTypingComplete={handleTypingComplete}>
          <div className="speech type-text-target">{bubbleText}</div>
        </TypeText>
        {showTapToContinue && <TapToContinue />}
        <div className="bubble-arrow" style={{ ...arrowPosition }}></div>
      </div>
    </div>
  );
});

export default SpeechBubble;
