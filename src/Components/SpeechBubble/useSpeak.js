import React, { useContext, useRef, useEffect, useState } from 'react';

import { SpeechBubbleContext } from './context/context';
import { actions } from './context/Reducer';
import { useTypeText } from './TypeText/useTypeText';

export const useSpeak = () => {
  const [state, dispatch] = React.useContext(SpeechBubbleContext);
  const {
    state: { isTypingComplete },
    setIsTyping,
  } = useTypeText();
  const [tapCount, _setTapCount] = useState(0);
  const isSpeakingRef = useRef(false);
  const tapCountRef = useRef(0);

  const setTapCount = (value) => {
    tapCountRef.current = value;
    _setTapCount(value);
  };

  const handleTypingComplete = () => {
    isSpeakingRef.current = false;
    // set tap count to 1
    setTapCount(1);
    if (state.tapToContinue) {
      setShowTapToContinue(true);
    }
  };

  const handleBeforeSpeak = () => {
    // wait for user to tap to continue
    setTapToContinue(true);
    setShowTapToContinue(false);
    // reset tap count
    setTapCount(0);
  };

  const handleTaps = () => {
    document.body.style.cursor = '';
    // increment tap count
    setTapCount(tapCountRef.current + 1);
    if (tapCountRef.current === 1) {
      setIsTyping(false);
      // complete the type text animation
    }
    if (tapCountRef.current > 1) {
      setTapToContinue(false);
      setShowTapToContinue(false);
    }
    return tapCountRef.current;
  };

  /**
   * Speak

   *
   * @param {string} words
   * @param {Number} options
   * @returns
   */
  const speak = (words, options = { wait: 0, tapToContinue: true }) => {
    isSpeakingRef.current = false;
    dispatch({ type: actions.speak, payload: words });
    if (options.tapToContinue) {
      handleBeforeSpeak();
      return new Promise((resolve) => {
        /**
         * Handle tap to continue (click anywhere on the screen)
         * we must define the handleTapToContinue function within the speak scope
         * in order to resolve the promise and remove the event listener
         *
         * When the user clicks the screen, the type text animation will complete
         * When the user clicks again, the speech bubble will disappear
         * (and the promise will resolve)
         * @param {*} event
         */
        const handletapToContinue = (event) => {
          event.preventDefault();
          let taps = handleTaps();
          console.log('taps', taps);
          if (taps >= 2) {
            document.removeEventListener('click', handletapToContinue);
            resolve(true);
          }
        };
        document.addEventListener('click', handletapToContinue);
      });
    } else if (options.wait) {
      console.log('waiting for a certain amount of time');
      /**
       * In this instance, we are waiting for a certain amount of time.
       * This is sometimes used when we want ask a question, and wait for the user to respond.
       *
       * Here we can tap to continue, but not to resolve the promise.
       */
      // wait for a certain amount of time
      handleBeforeSpeak();
      return new Promise((resolve) => {
        const handletapToContinue = (event) => {
          event.preventDefault();
          let taps = handleTaps();
          if (taps >= 1) {
            document.removeEventListener('click', handletapToContinue);
          }
        };
        document.addEventListener('click', handletapToContinue);
        // resolve after wait duration
        const delay = state.showAnimationDuration;
        setTimeout(() => {
          // resolver(true);
          resolve(true);
        }, delay * 1000 + 500 + options.wait * 1000);
      });
    } else {
      console.log('waiting for c3po to stop speaking');
      // wait until c3po is not speaking
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (isSpeakingRef.current == false) {
            clearInterval(interval);
            resolve(true);
          }
        }, 100);
      });
    }
    return;
  };

  const dismissSpeechBubble = () => {
    dispatch({ type: actions.show, payload: false });
    return new Promise((resolve) => {
      const delay = state.showAnimationDuration;
      setTimeout(() => {
        resolve(true);
      }, delay * 1000);
    });
  };

  const setTapToContinue = (value) => dispatch({ type: actions.setTapToContinue, payload: value });

  const setShowTapToContinue = (value) =>
    dispatch({ type: actions.showTapToContinue, payload: value });

  useEffect(() => {
    if (isTypingComplete) {
      handleTypingComplete();
    }
  }, [isTypingComplete]);
  return { speak, dismissSpeechBubble };
};
