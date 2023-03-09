import React, { useState, useEffect, useRef } from 'react';
import { binaryToCharacter, characterToBinaryDict } from '../../ControlKeypad/binaryDict';
import { getTimeline, animateDecode } from './animations';
import './byte.css';

export const Byte = React.forwardRef((props, ref) => {
  const {
    // src,
    id,

    char,
    binaryCode,
    guessBinary,
    animationDelay = 0,
    onAnimationComplete,
    onBuildAnimationTimeline,
  } = props;

  const byteRef = useRef();

  const [isDecoded, setIsDecoded] = useState(false);
  const [decodedChar, setDecodedChar] = useState('');
  const [timeline, setTimeline] = useState(null);

  const handleDecode = () => {
    if (guessBinary == binaryCode) {
      // success animation
      // console.log(timeline);
      animateDecode(byteRef, { fadeOutDuration: 1 });
      setDecodedChar(binaryToCharacter[guessBinary]);
      setIsDecoded(true);
      return true;
    }
    return false;
    // timeline.delay(animationDelay);
  };

  const handleAnimationComplete = () => {
    const didDecode = handleDecode();
    if (onAnimationComplete instanceof Function) {
      onAnimationComplete(id, binaryCode, didDecode);
    }
  };

  /**
   * When user guesses a binary code,
   * the guess animation begins. When it completes,
   * we check if the guess was correct in the handleDecode method.
   */
  useEffect(() => {
    if (guessBinary) {
      setTimeout(() => {
        timeline.eventCallback('onComplete', handleAnimationComplete);
      }, animationDelay * 1000);
    }
  }, [guessBinary]);

  useEffect(() => {
    const timeline = getTimeline(byteRef, ['#2bc016', '#26a96c', '#32936f'], {
      duration: 0.3,
      delay: 0,
    });
    setTimeline(timeline);
    if (onBuildAnimationTimeline instanceof Function) {
      onBuildAnimationTimeline(timeline, id, binaryCode);
    }
  }, []);

  return (
    <div id={id} ref={byteRef} className={isDecoded ? 'decoded' : ''}>
      {decodedChar ? <p>{decodedChar}</p> : <div>{binaryCode}</div>}
    </div>
  );
});

export default Byte;
