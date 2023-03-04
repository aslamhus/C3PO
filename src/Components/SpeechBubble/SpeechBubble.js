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
  anchor,
  constraints,
  offset = { x: 0, y: 0 },
  // arrowPosition,
  showAnimationDuration = 0.5,
  onBeforeShowSpeechBubble,
  onShowSpeechBubble,
}) {
  const [bubbleText, setBubbleText] = useState('');
  const [_show, setShow] = useState(false);
  const [positions, setPositions] = useState({
    arrow: 'left',
    left: '',
    right: '',
  });
  const bubbleRef = useRef();

  const findArrowPosition = (left) => {
    return 'left';
    // let arrowPosition;
    // const stageBounds = c3poRef.current.closest('.game-stage').getBoundingClientRect();
    // if (left < stageBounds.width / 4) {
    //   arrowPosition = 'left';
    // }
    // return arrowPosition;
  };

  const setSpeechBubblePosition = () => {
    if (!anchor) return;
    const { left, top } = anchor.getBoundingClientRect();
    setPositions({
      arrow: findArrowPosition(left),
      left: left + offset.x,
      top: top + offset.y,
    });
  };

  const applyConstraints = () => {
    const bubbleContainerBounds = bubbleRef.current.parentElement.getBoundingClientRect();

    /**
     *
     * Game stage constraints:
     *
     * y = y - app position
     * x = x - app position
     *
     *
     */
    console.log('currentBubbleBounds', bubbleContainerBounds);
    console.log('currentConstraints', constraints);
  };

  const parseSpeech = (speech) => ({ __html: speech });

  const hideBubble = async () => {
    await gsap.to(bubbleRef.current, { scale: 0, opacity: 0, duration: 0.5 });
    setShow(false);
  };

  const showBubble = async () => {
    // sets the postion
    setSpeechBubblePosition();
    // still invisible
    if (onBeforeShowSpeechBubble instanceof Function) {
      onBeforeShowSpeechBubble(bubbleRef?.current);
    }
    // constrain
    applyConstraints();
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

  const getArrowLeftPosition = () => {
    let left = '';
    switch (positions.arrow) {
      case 'right':
        left = '65%';
        break;
      case 'left':
        left = '25%';
        break;
      case 'center':
    }

    return left;
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
    <div
      className="speech-bubble-container"
      style={{ ...style, left: positions.left, top: positions.top }}
    >
      <div
        ref={bubbleRef}
        className="speech-bubble"
        style={{
          transform: 'scale(0)',
          visibility: _show ? 'visible' : 'hidden',
        }}
      >
        <span dangerouslySetInnerHTML={parseSpeech(bubbleText)}></span>
        <div
          className="bubble-arrow"
          style={{ right: 'unset', left: getArrowLeftPosition() }}
        ></div>
      </div>
    </div>
  );
}
