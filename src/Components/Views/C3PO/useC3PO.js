import React, { useContext } from 'react';
import { C3POContext } from './context/context';
import { useGame } from '../../hooks/useGame';
import { useAskQuestion } from '../../GameControl/AskQuestion/hooks/useAskQuestion';
import { C3PO_ACTIONS, C3POStates } from './context/Reducer';
import { useTipModal } from '../../UI/Modals/TipModal/useTipModal';
import * as actions from './actions';
import { tips } from '../../../schema/tips';
import { getOppositeCase, hasChar } from './utils';

let resolver;
export const useC3PO = () => {
  const [state, dispatch] = useContext(C3POContext);
  const {
    control,
    sound: { playSound, music, fx },
  } = useGame();
  const { ask } = useAskQuestion();

  const askQuestion = async ({ question, responses }) => {
    await speak(question, { tapToContinue: false });
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

  const getGameStage = () => {
    return document.querySelector('.game-stage-constraints');
  };

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

  const showBinary = () => dispatch({ type: C3PO_ACTIONS.showBinary });

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
    dispatch({ type: C3PO_ACTIONS.speak, payload: words });
    if (options.tapToContinue) {
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
      return new Promise((resolve) => {
        resolver = resolve;
        const delay = state.showSpeechBubbleAnimationDuration;
        setTimeout(() => {
          resolver(true);
        }, delay * 1000 + 500 + options.wait * 1000);
      });
    }
    return;
  };

  const guessChar = (char, binary) => {
    dispatch({ type: C3PO_ACTIONS.guessChar, payload: [char, binary] });
    control.disableKeys([char]);
  };

  const handleGuessAnimationComplete = async (wasCorrect, countCharsFound, char, binary) => {
    const { current: c3po } = state.c3poAnimateRef;
    if (wasCorrect) {
      // check if message is completely decoded -> game complete
      c3po.celebrate(3).then(() => {
        c3po.rest();
      });

      console.log('chars found', countCharsFound, typeof countCharsFound);
      let plural = countCharsFound > 1 ? 's' : '';
      speak(
        <>
          You found {countCharsFound} <span className="letter-found">{char}</span>
          <span style={{ fontSize: 'smaller' }}>{plural}</span>!
        </>,
        { tapToContinue: false }
      );
    } else {
      // increment bad guesses
      // give hint if there is a lowercase/uppercase letter.
      const oppositeCase = getOppositeCase(char);
      const hasOppositeCase = hasChar(oppositeCase.char, state.message);

      c3po.fret();
      await speak(
        <>
          No <span className="letter-not-found">{char}</span> could be found...
        </>,
        {
          tapToContinue: hasOppositeCase,
        }
      );
      if (hasOppositeCase) {
        speak(
          <>
            But I wonder if there's {oppositeCase.caseType == 'lowercase' ? 'a small' : 'a big'}{' '}
            <span className="letter-not-found">{oppositeCase.char}</span>?
          </>
        ),
          {
            tapToContinue: false,
          };
      }

      //
    }
  };

  const handleGuessAnimationStart = () => {
    const { current: c3po } = state.c3poAnimateRef;
    c3po.stop();
    c3po.rest();
    dismissSpeechBubble();
  };

  const testKeypad = async (c3po) => {
    showC3PO();
    showBinary();
    control.toggleControls(true);
    control.toggleKeypad(true, { onPressChar: guessChar });
  };

  const testAnimations = async (c3po) => {
    showC3PO();
    /**
     * Note to self:
     * test both resting and celebrating
     */
    await c3po.rest(0);
    // c3po.walkToCenter(getGameStage());
    c3po.celebrate();
    setTimeout(() => {
      // c3po.stop();
      c3po.fret();
    }, 1000);
  };

  const startC3POGame = async () => {
    // await actions.wait(5);
    playSound(music.jawaTheme);
    const { current: c3po } = state.c3poAnimateRef;
    testKeypad(c3po);
    return;

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
    guessChar,
    handleGuessAnimationComplete,
    handleGuessAnimationStart,
    startC3POGame,
    loadC3PO,
    toggleSpeechBubble,
    getGameStage,
  };
};
