import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Byte from '../Byte/Byte';
import { useGameSound } from '../../hooks/useGameSound';
import { fx } from '../../hooks/useGameSound';
import { getByteDataFromMessage } from './utils';
import './binary-message.css';

export default function BinaryMessage({
  message,
  show,
  onShow,
  guessChar,
  onGuessAnimationStart,
  onGuessAnimationComplete,
}) {
  const [byteData, setByteData] = useState(getByteDataFromMessage(message));

  const binaryRef = useRef();
  const masterTimelineRef = useRef(
    gsap.timeline({
      paused: true,
      onComplete: handleGuessAnimationComplete,
      onStart: handleGuessAnimationStart,
    })
  );
  const childTimelinesRef = useRef([]);
  const { playSound } = useGameSound();
  const columnCount = 4;

  /**
   * Guess
   *
   * setting guess state in child <Byte/> component
   * begins animations
   *
   * @param {string} binary - the binary code of the guess letter,
   * to match agains the byte
   * */
  const guess = (guessChar) => {
    const [char, binary] = guessChar;
    let delay = 0,
      delayIncrement = 0.01,
      guessWasCorrect = false,
      countCharsFound = 0;
    const { current: masterTl } = masterTimelineRef;
    masterTl.clear();
    setByteData((prev) => {
      return prev.map((data, index) => {
        if (!data.decoded) {
          data.animationDelay = delay;
          const childTl = childTimelinesRef.current[index];
          childTl.play();
          childTl.progress(0);
          masterTl.add(childTl, delay);
          delay += delayIncrement;
        }
        if (data.binary == binary) {
          countCharsFound++;
          guessWasCorrect = true;
        }
        data.guess = binary;
        return data;
      });
    });
    playSound(fx.binaryDecoder);
    masterTl.eventCallback('onStart', () =>
      handleGuessAnimationStart(guessWasCorrect, countCharsFound, char, binary)
    );
    masterTl.eventCallback('onComplete', () =>
      handleGuessAnimationComplete(guessWasCorrect, countCharsFound, char, binary)
    );
    masterTl.play(0);
  };

  const handleGuessAnimationComplete = (wasCorrect, char, binary) => {
    if (onGuessAnimationComplete instanceof Function) {
      onGuessAnimationComplete(wasCorrect, char, binary);
    }
    if (!wasCorrect) {
      playSound(fx.error);
    }
  };

  const handleGuessAnimationStart = () => {
    if (onGuessAnimationStart instanceof Function) {
      onGuessAnimationStart();
    }
  };

  const onChildAnimationComplete = (id, binary, didDecode) => {
    // console.info('child timeline complete', id, binary);
    // console.log('didDecode', didDecode);
    if (didDecode) {
      playSound(fx.success);
    }
  };

  const addByteAnimationToTimeline = (timeline, id, binary) =>
    childTimelinesRef.current.push(timeline);

  /**
   * Animate entrance of binary message
   */
  useEffect(() => {
    if (show) {
      gsap.fromTo(
        binaryRef.current,
        { opacity: 0, y: '+50%' },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          onComplete: () => {
            if (onShow instanceof Function) {
              onShow();
            }
          },
        }
      );
    }
  }, [show]);

  /**
   * Guess a character
   */
  useEffect(() => {
    if (guessChar) {
      guess(guessChar);
    }
  }, [guessChar]);

  return (
    <div ref={binaryRef} className="binary-message" style={{ opacity: 0 }}>
      {byteData.map((data, index) => {
        return (
          <React.Fragment key={`binary-message-img-${data.binary}-${index}`}>
            <Byte
              // src={data.url}
              id={`binary-message-${index}`}
              binaryCode={data.binary}
              guessBinary={data.guess}
              char={data.char}
              animationDelay={data.animationDelay}
              onAnimationComplete={onChildAnimationComplete}
              onBuildAnimationTimeline={addByteAnimationToTimeline}
            />
            {/* {index > 1 && (index + 1) % columnCount == 0 && (
              <div style={{ flexBasis: '100%', height: 0, width: 0 }}></div>
            )} */}
          </React.Fragment>
        );
      })}
    </div>
  );
}
