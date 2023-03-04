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

  const findAnchorPosition = (anchor) => {
    const anchorBounds = anchor.parentElement.getBoundingClientRect();
    // const bodyBounds = c3po.body.getBoundingClientRect();
    // const headBounds = c3po.bodyParts.head.head.getBoundingClientRect();
    // const left = parseFloat(headBounds.x + headBounds.width) + 'px';
    // const top = headBounds.top - bodyContainerBounds.top;
    const { left, top } = anchorBounds;
    console.log(`anchorBounds.top ${anchorBounds.top}`);

    return { left, top };
  };

  const findArrowPosition = (left) => {
    return 'left';
    let arrowPosition;
    const stageBounds = c3poRef.current.closest('.game-stage').getBoundingClientRect();
    if (left < stageBounds.width / 4) {
      arrowPosition = 'left';
    }
    return arrowPosition;
  };

  const setSpeechBubblePosition = () => {
    console.log('set speech bubble position anchor', anchor);
    if (!anchor) return;
    const { current: speechBubbleElement } = bubbleRef;

    const bubbleBounds = speechBubbleElement.parentElement.getBoundingClientRect();
    let { left, top } = findAnchorPosition(anchor);
    // top = parseFloat(bodyBounds.top - bubbleBounds.height);
    // const constraintTop = 5;
    // if (top < constraintTop) top = constraintTop;
    // top = top + 'px';

    setPositions({ arrow: findArrowPosition(left), left, top });
  };

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
    setSpeechBubblePosition();
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
        ref={handleBubbleRef}
        className="speech-bubble"
        style={{
          transform: 'scale(0)',
          display: _show ? '' : 'none',

          // left: getBubbleLeftPosition(),
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
