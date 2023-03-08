import { useContext } from 'react';
import { C3POContext } from './context/context';
import { useGame } from '../../hooks/useGame';
import { useAskQuestion } from '../../GameControl/AskQuestion/hooks/useAskQuestion';
import { C3PO_ACTIONS, C3POStates } from './context/Reducer';
import { useTipModal } from '../../UI/Modals/TipModal/useTipModal';
import * as actions from './actions';
import { tips } from '../../../schema/tips';

let resolver;
export const useC3PO = () => {
  const [state, dispatch] = useContext(C3POContext);
  const {
    control,
    sound: { playSound, music, fx },
  } = useGame();
  const { ask } = useAskQuestion();

  const askQuestion = async ({ question, responses }) => {
    await speak(question, { clickToContinue: false });
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

  const speak = (words, options = { wait: 0, clickToContinue: true }) => {
    dispatch({ type: C3PO_ACTIONS.speak, payload: words });
    if (options.clickToContinue) {
      return new Promise((resolve) => {
        let showTipTimeout = setTimeout(() => {
          // showTip(...tips.clickToContinue);
          dispatch({ type: C3PO_ACTIONS.showTapToContinue });
        }, state.showSpeechBubbleAnimationDuration * 1000 + 500);
        const handleClickToContinue = (event) => {
          event.preventDefault();
          console.log('click to continue');
          resolve(true);
          document.removeEventListener('click', handleClickToContinue);
          document.body.style.cursor = '';
          // hideTip();
          clearTimeout(showTipTimeout);

          dispatch({ type: C3PO_ACTIONS.hideTapToContinue });
        };
        document.addEventListener('click', handleClickToContinue);
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

  const guessChar = (char, binary) =>
    dispatch({ type: C3PO_ACTIONS.guessChar, payload: [char, binary] });

  const handleGuessAnimationComplete = (wasCorrect, countCharsFound, char, binary) => {
    const { current: c3po } = state.c3poAnimateRef;
    if (wasCorrect) {
      c3po.celebrate(3).then(() => {
        c3po.rest();
      });

      let plural = countCharsFound > 1 ? 's' : '';
      speak(
        `You found ${countCharsFound} <span style='color: blue'>${char}</span><span style='font-size:smaller'>${plural}</span>!`,
        { clickToContinue: false }
      );
    } else {
      c3po.fret();
      speak(`No  <span style='color: red'>${char}</span> could be found...`, {
        clickToContinue: false,
      });
    }
  };

  const handleGuessAnimationStart = () => {
    const { current: c3po } = state.c3poAnimateRef;
    c3po.stop();
    c3po.rest();
    dismissSpeechBubble();
  };

  const testTranslator = async (c3po) => {
    showC3PO();
    showBinary();
    control.toggleTranslator(true);
    control.toggleControls(true);
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
    // testTranslator(c3po);
    // return;

    await actions.exitStageLeft(c3po);
    showC3PO();
    await actions.peekAbooEntrance(c3po, speak);
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
      control.toggleTranslator(true, { onPressChar: guessChar });
      // showTranslator();
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
