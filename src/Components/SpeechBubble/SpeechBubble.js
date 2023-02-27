import React, { useEffect, useState, useRef, useContext } from 'react';
import gsap from 'gsap';
import { GameStageContext } from '../GameStage/context';
import './speech-bubble.css';

let speechResolve;
export default function SpeechBubble({
  show,
  speech,
  isVisible,
  style,
  arrowPosition,
  showAnimationDuration = 0.5,
  onBeforeShowSpeechBubble,
  onShowSpeechBubble,
}) {
  const [bubbleText, setBubbleText] = useState('');
  const [_show, setShow] = useState(false);
  const bubbleRef = useRef();

  const handleBubbleRef = (el) => {
    if (!el) return;
    bubbleRef.current = el;
  };

  const parseSpeech = (speech) => ({ __html: speech });

  const hideBubble = async () => {
    await gsap.to(bubbleRef.current, { scale: 0, opacity: 0, duration: 0.5 });
    setShow(false);
  };

  const showBubble = async () => {
    if (onBeforeShowSpeechBubble instanceof Function) {
      onBeforeShowSpeechBubble(bubbleRef?.current);
    }
    setShow(true);
    await gsap.to(bubbleRef.current, { opacity: 1, scale: 1, duration: showAnimationDuration });
    if (onShowSpeechBubble instanceof Function) {
      onShowSpeechBubble(bubbleRef?.current);
    }
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

  const getArrowPosition = () => {
    let styles = {};
    switch (arrowPosition) {
      case 'right':
        styles.left = '65%';
        break;
      case 'left':
        styles.left = '25%';
        break;
      case 'center':
    }

    styles.right = 'unset';
    return styles;
  };

  /**
   * Receive new speech
   */
  useEffect(() => {
    if (speech) {
      showBubbleSpeech();
    }
  }, [speech]);

  /**
   * Parent show differs from internal show state
   */
  useEffect(() => {
    if (show != _show) {
      show ? showBubble() : hideBubble();
    }
  }, [show]);

  return (
    <div className="speech-bubble-container" style={style}>
      <div
        ref={handleBubbleRef}
        className="speech-bubble"
        style={{
          transform: 'scale(0)',
          display: _show ? '' : 'none',

          // left: getBubbleLeftPosition(),
        }}
      >
        <span dangerouslySetInnerHTML={parseSpeech(bubbleText)}></span>
        <div className="bubble-arrow" style={{ ...getArrowPosition() }}></div>
      </div>
    </div>
  );
}
