import React, { useContext } from 'react';
import { GameStageContext } from '../context';
import { C3POStates, GAME_STAGE_VIEWS } from '../Reducer';
import { GAME_STAGE_ACTIONS } from '../Reducer';

let resolver;
export const useGameStage = () => {
  const [state, dispatch] = useContext(GameStageContext);

  const setGameStageView = (state) =>
    dispatch({ type: GAME_STAGE_ACTIONS.setGameStageView, payload: GAME_STAGE_VIEWS[state] });

  const speak = (words, options = { wait: 0 }) => {
    dispatch({ type: 'speak', payload: words });
    return new Promise((resolve) => {
      resolver = resolve;
      const delay = state.showSpeechBubbleAnimationDuration;
      setTimeout(() => {
        resolver(true);
      }, delay * 1000 + 500 + options.wait * 1000);
    });
  };

  const dismissSpeechBubble = () => dispatch({ type: GAME_STAGE_ACTIONS.hideSpeechBubble });

  const showC3PO = () =>
    dispatch({ type: GAME_STAGE_ACTIONS.updateC3poState, payload: C3POStates.SHOW });

  const toggleGameStartScreen = (bool) =>
    dispatch({ type: GAME_STAGE_ACTIONS.toggleGameStartScreen, payload: bool });

  const showBinary = () => dispatch({ type: GAME_STAGE_ACTIONS.showBinary });

  const guessChar = (char, binary) =>
    dispatch({ type: GAME_STAGE_ACTIONS.guessChar, payload: [char, binary] });

  const getGameStage = () => {
    if (state.loaded && state.c3poRef?.current) {
      return state.c3poRef.current.closest('.game-stage');
    }
    throw new Error('game stage has not loaded');
  };

  const handleGuessAnimationComplete = (wasCorrect, countCharsFound, char, binary) => {
    const { current: c3po } = state.c3poAnimateRef;
    if (wasCorrect) {
      c3po.celebrate(3).then(() => {
        c3po.rest();
      });

      let plural = countCharsFound > 1 ? 's' : '';
      speak(
        `You found ${countCharsFound} <span style='color: blue'>${char}</span><span style='font-size:smaller'>${plural}</span>!`
      );
    } else {
      c3po.fret();
      speak(`No  <span style='color: red'>${char}</span> could be found...`);
    }
  };

  const handleGuessAnimationStart = () => {
    const { current: c3po } = state.c3poAnimateRef;
    c3po.stop();
    c3po.rest();
    dismissSpeechBubble();
  };

  return {
    state,
    setGameStageView,
    showC3PO,
    speak,
    dismissSpeechBubble,
    getGameStage,
    showBinary,
    toggleGameStartScreen,
    guessChar,
    handleGuessAnimationComplete,
    handleGuessAnimationStart,
    dispatch,
  };
};
