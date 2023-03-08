import React from 'react';
import './speech-bubble.css';
import TapToContinue from './TapToContinue';
import TypeText from './TypeText';
import { useSpeechBubble } from './useSpeechBubble';

export const SpeechBubble = React.memo((props) => {
  const { positions, bubbleRef, _show, bubbleText, parseSpeech, arrowPosition } =
    useSpeechBubble(props);
  console.log('props.showTapToContinue', props?.showTapToContinue);
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
        <TypeText
          show={_show}
          text={bubbleText}
          typeSpeed={0.05}
          onTypingComplete={() => {
            console.log('typing complete');
          }}
        >
          <div
            className="speech type-text-target"
            dangerouslySetInnerHTML={parseSpeech(bubbleText)}
          ></div>
        </TypeText>
        {props?.showTapToContinue && <TapToContinue />}
        <div className="bubble-arrow" style={{ ...arrowPosition }}></div>
      </div>
    </div>
  );
});

export default SpeechBubble;
