import React, { useEffect, useState, useRef, useContext } from 'react';
import gsap from 'gsap';
import { GameStageContext } from '../GameStage/context';
import './speech-bubble.css';

export default function SpeechBubble({ speech, isVisible }) {
  const [bubbleText, setBubbleText] = useState('');
  const [show, setShow] = useState(false);
  const [gameStageState] = useContext(GameStageContext);
  const bubbleRef = useRef();

  const handleBubbleRef = (el) => {
    if (!el) return;
    bubbleRef.current = el;
  };

  const getBubbleLeftPosition = () => {
    console.log('gameStage c3po', gameStageState.c3poRef);
    if (gameStageState.c3poRef?.current) {
      return '12px';
    }
    return '0px';
  };

  const parseSpeech = (speech) => ({ __html: speech });

  const hideBubble = async () => {
    await gsap.to(bubbleRef.current, { scale: 0, duration: 0.5 });
    setShow(false);
  };

  const showBubble = async () => {
    setShow(true);
    await gsap.to(bubbleRef.current, { scale: 1, duration: 0.5 });
  };

  const showBubbleSpeech = async () => {
    if (!bubbleRef.current) {
      throw new Error('Speech bubble has not rendered');
    }
    if (show) {
      await hideBubble();
    }

    setBubbleText(speech);
    showBubble();
  };

  useEffect(() => {
    if (speech) {
      showBubbleSpeech();
    }
  }, [speech]);

  return (
    <div className="speech-bubble-container">
      <div
        ref={handleBubbleRef}
        className="speech-bubble"
        style={{
          transform: 'scale(0)',
          display: show ? '' : 'none',
          left: getBubbleLeftPosition(),
        }}
      >
        <span dangerouslySetInnerHTML={parseSpeech(bubbleText)}></span>
        <div className="bubble-arrow"></div>
      </div>
    </div>
  );
}
