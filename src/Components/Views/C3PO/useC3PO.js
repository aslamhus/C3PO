import React, { useContext, useRef } from 'react';
import { C3POContext } from './context/context';
import { useAskQuestion } from '../../GameControl/AskQuestion/hooks/useAskQuestion';
import { C3PO_ACTIONS, C3POStates } from './context/Reducer';
import { useTipModal } from '../../UI/Modals/TipModal/useTipModal';
import * as actions from './actions';
import { tips } from '../../../schema/tips';
import { getOppositeCase, hasChar } from './utils';
import { useGameSound } from '../../hooks/useGameSound';
import { useGameControl } from '../../GameControl/hooks/useGameControl';

let resolver;
export const useC3PO = () => {
  const [state, dispatch] = useContext(C3POContext);
  const control = useGameControl();
  const { playSound, music, fx } = useGameSound();
  const { ask } = useAskQuestion();
  const isBinaryVisibleRef = useRef(false);
  const isSpeakingRef = useRef(false);

  const askQuestion = async ({ question, responses }) => {
    await speak(question, { tapToContinue: false });
    if (!control.state.controls) {
      control.toggleControls(true);
    }
    return ask({ question, responses });
  };

  const { showTip, hideTip } = useTipModal();

  const loadC3PO = (refs) => {
    dispatch({
      type: C3PO_ACTIONS.load,
      payload: {
        c3poRef: refs.c3poRef,
        c3poAnimateRef: refs.c3poAnimateRef,
      },
    });
  };

  const getGameStage = () => document.querySelector('.game-stage-constraints');

  const showC3PO = () => dispatch({ type: C3PO_ACTIONS.updateC3poState, payload: C3POStates.SHOW });

  const toggleSpeechBubble = (bool) =>
    dispatch({ type: C3PO_ACTIONS.toggleSpeechBubble, payload: bool });

  const dismissSpeechBubble = () => {
    toggleSpeechBubble(false);
    return new Promise((resolve) => {
      resolver = resolve;
      const delay = state.showSpeechBubbleAnimationDuration;
      setTimeout(() => {
        resolver(true);
      }, delay * 1000);
    });
  };

  const showBinary = () => {
    isBinaryVisibleRef.current = false;
    return new Promise((resolve, reject) => {
      dispatch({ type: C3PO_ACTIONS.showBinary });
      let interval = setInterval(() => {
        if (isBinaryVisibleRef.current == true) {
          clearInterval(interval);
          resolve(true);
        }
        console.log('is binary visible?', isBinaryVisibleRef.current);
      }, 100);
    });
  };

  const setIsBinaryVisible = (bool) => (isBinaryVisibleRef.current = bool);

  /**
   *
   * @param {Number|String} value - can be set to value, or incremented (+=10) or decremented (-=15)
   * @returns
   */
  const setEnergy = (value) => dispatch({ type: C3PO_ACTIONS.setEnergy, payload: value });

  /**
   * Speak
   *
   * Note for future Aslam:
   * Speak should PERHAPS be part of speech bubble's context.
   *
   * @param {string} words
   * @param {Number} options
   * @returns
   */
  const speak = (words, options = { wait: 0, tapToContinue: true }) => {
    isSpeakingRef.current = true;
    dispatch({ type: C3PO_ACTIONS.speak, payload: words });
    if (options.tapToContinue) {
      // wait for user to tap to continue
      return new Promise((resolve) => {
        dispatch({ type: C3PO_ACTIONS.showTapToContinue });
        const handletapToContinue = (event) => {
          event.preventDefault();
          document.removeEventListener('click', handletapToContinue);
          document.body.style.cursor = '';
          dispatch({ type: C3PO_ACTIONS.hideTapToContinue });
          resolve(true);
        };
        document.addEventListener('click', handletapToContinue);
      });
    } else if (options.wait) {
      // wait for a certain amount of time
      return new Promise((resolve) => {
        resolver = resolve;
        const delay = state.showSpeechBubbleAnimationDuration;
        setTimeout(() => {
          resolver(true);
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

  const setIsSpeaking = (bool) => (isSpeakingRef.current = bool);

  const guessChar = (char, binary) => {
    dispatch({ type: C3PO_ACTIONS.guessChar, payload: [char, binary] });
    control.disableKeys([char]);
  };

  const handleGuessAnimationStart = () => {
    const { current: c3po } = state.c3poAnimateRef;

    control.disableKeypad(true);
    c3po.stop();
    c3po.rest();
    dismissSpeechBubble();
  };

  const handleGuessAnimationComplete = async (wasCorrect, countCharsFound, char, binary) => {
    const { current: c3po } = state.c3poAnimateRef;
    control.disableKeypad(false);
    if (wasCorrect) {
      handleCorrectGuess(char, c3po, countCharsFound);
    } else {
      handleIncorrectGuess(char, c3po);
    }
  };

  const handleCorrectGuess = (char, c3po, countCharsFound) => {
    // check if message is completely decoded -> game complete
    c3po.celebrate(3).then(() => {
      c3po.rest();
    });

    setEnergy(`+=${parseFloat(Number(countCharsFound) * 0.05)}`);
    let plural = countCharsFound > 1 ? 's' : '';
    speak(
      <>
        You found {countCharsFound} <span className="letter-found">{char}</span>
        <span style={{ fontSize: 'smaller' }}>{plural}</span>!
      </>,
      { tapToContinue: false }
    );
  };

  const handleIncorrectGuess = async (char, c3po) => {
    // increment bad guesses
    setEnergy('-=0.1');
    const oppositeCase = getOppositeCase(char);
    const hasOppositeCase = hasChar(oppositeCase.char, state.message);
    c3po.fret();
    await speak(
      <>
        No <span className="letter-not-found">{char}</span> could be found...
      </>,
      { tapToContinue: hasOppositeCase }
    );
    if (hasOppositeCase) {
      hint(oppositeCase, c3po);
    }
  };

  const hint = async (oppositeCase, c3po) => {
    // dismissSpeechBubble();
    await c3po.rest(0);
    await c3po.proposeIdea();
    speak(
      <>
        But I wonder if there's {oppositeCase.caseType == 'lowercase' ? 'a small' : 'a big'}{' '}
        <span className="letter-not-found">{oppositeCase.char}</span>?
      </>,
      { tapToContinue: false }
    );
  };

  const testKeypad = async (c3po) => {
    showC3PO();
    showBinary();
    control.toggleControls(true);
    control.toggleKeypad(true, { onPressChar: guessChar });
  };

  const startC3POGame = async () => {
    // await actions.wait(5);
    playSound(music.jawaTheme);
    const { current: c3po } = state.c3poAnimateRef;
    // testKeypad(c3po);
    // return;

    await actions.exitStageLeft(c3po);
    showC3PO();
    await actions.peekAbooEntrance(c3po, speak, () => showTip(tips.tapAnywhereToContinue));
    const identityConfirmed = await actions.questionIdentity(
      c3po,
      control.toggleControls,
      speak,
      askQuestion,
      dismissSpeechBubble
    );
    if (identityConfirmed) {
      await speak('Thank goodness!');
      await dismissSpeechBubble();
      await actions.wait(1);
      await actions.startGameInstruction(
        c3po,
        getGameStage(),
        speak,
        askQuestion,
        dismissSpeechBubble,
        showBinary
      );
      c3po.stop();
      c3po.rest();
      console.log('toggle keypad!');
      control.toggleKeypad(true, { onPressChar: guessChar });
      // showKeypad();
    } else {
      // end game.
    }
  };

  return {
    state,
    speak,
    dismissSpeechBubble,
    showBinary,
    setIsBinaryVisible,
    setIsSpeaking,
    guessChar,
    handleGuessAnimationComplete,
    handleGuessAnimationStart,
    startC3POGame,
    loadC3PO,
    toggleSpeechBubble,
    getGameStage,
    control,
  };
};
