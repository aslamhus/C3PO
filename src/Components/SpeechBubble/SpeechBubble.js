import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useGameStage } from '../GameStage/hooks/useGameStage';
import { constraints } from '../GameStage/constraints';
import './speech-bubble.css';

let speechResolve;
export default function SpeechBubble({
  show,
  speech,
  isVisible,
  style,
  anchor,
  offset = { x: 0, y: 0 },
  // arrowPosition,
  showAnimationDuration = 0.5,
  onBeforeShowSpeechBubble,
  onShowSpeechBubble,
}) {
  const [bubbleText, setBubbleText] = useState('');
  const [_show, setShow] = useState(false);
  const [arrowPosition, setArrowPosition] = useState('left');
  const [positions, setPositions] = useState({
    top: '',
    bottom: '',
    left: '',
    right: '',
  });
  const bubbleRef = useRef();

  const { doesElementBreakConstraints, getComputedConstraints, getPositionRelativeToGameStage } =
    useGameStage();

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
    // setPositions({
    //   ...positions,
    //   arrow: findArrowPosition(left),
    //   left: left + offset.x,
    //   top: top + offset.y,
    // });
    setArrowPosition(findArrowPosition(left));
    setPositions({
      ...positions,
      left: '200px',
      top: '20px',
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
    const breakConstraints = doesElementBreakConstraints(bubbleRef.current);
    if (breakConstraints) {
      const { constraintsBroken, constraintBounds, elementBounds } = breakConstraints;
      console.error('speech bubble is outside of gamestage constraints', constraintsBroken);
      const style = constraintsBroken.reduce((acc, constraint) => {
        acc[constraint] = `${constraintBounds[constraint]}px`;
        acc[constraints[constraint].opposite] = 'unset';
        return acc;
      }, {});
      setPositions({ ...style });
    }
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
    // set scale to 1 before applying onstraints so we can calculate actual size
    await gsap.set(bubbleRef.current, { scale: 1 });
    applyConstraints();
    setShow(true);
    gsap.set(bubbleRef.current, { scale: 0 });
    await gsap.to(bubbleRef.current, { opacity: 1, scale: 1, duration: showAnimationDuration });
    if (onShowSpeechBubble instanceof Function) {
      onShowSpeechBubble(bubbleRef?.current);
    }
  };

  const prepareSpeechBubble = async () => {
    if (!bubbleRef.current) {
      throw new Error('Speech bubble has not rendered');
    }
    if (show) {
      await hideBubble();
    }
    // setting bubble text triggers showBubble
    setBubbleText(speech);
  };

  const getArrowLeftPosition = () => {
    let left = '';
    switch (arrowPosition) {
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
      console.log('new speech set', speech);
      prepareSpeechBubble();
    }
  }, [speech]);

  /**
   * Show the speech bubble
   * (speech bubble is now hidden with its speech value set)
   */
  useEffect(() => {
    if (bubbleText) {
      console.log('speech set, show bubble now');
      showBubble();
    }
  }, [bubbleText]);

  /**
   * Parent show differs from internal show state
   */
  useEffect(() => {
    if (show != _show) {
      show ? showBubble() : hideBubble();
    }
  }, [show]);

  return (
    <div className="speech-bubble-container" style={{ ...style, ...positions }}>
      <div
        ref={bubbleRef}
        className="speech-bubble"
        style={{
          transform: 'scale(1)',
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
