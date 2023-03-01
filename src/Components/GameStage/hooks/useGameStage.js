import React, { useContext } from 'react';
import { GameStageContext } from '../context';
import { C3POStates } from '../Reducer';
import { GAME_STAGE_ACTIONS } from '../Reducer';

let resolver;
export const useGameStage = () => {
  const [state, dispatch] = useContext(GameStageContext);

  const speak = (words) => {
    dispatch({ type: 'speak', payload: words });
    return new Promise((resolve) => {
      resolver = resolve;
      const delay = state.showSpeechBubbleAnimationDuration;
      setTimeout(() => {
        resolver(true);
      }, delay * 1000 + 500);
    });
  };

  const dismissSpeechBubble = () => dispatch({ type: GAME_STAGE_ACTIONS.hideSpeechBubble });

  const showC3PO = () =>
    dispatch({ type: GAME_STAGE_ACTIONS.updateC3poState, payload: C3POStates.SHOW });

  const getGameStage = () => {
    if (state.loaded && state.c3poRef?.current) {
      return state.c3poRef.current.closest('.game-stage');
    }
    throw new Error('game stage has not loaded');
  };

  const showBinary = () => dispatch({ type: GAME_STAGE_ACTIONS.showBinary });

  const guessChar = (char, binary) =>
    dispatch({ type: GAME_STAGE_ACTIONS.guessChar, payload: [char, binary] });

  return {
    state,
    showC3PO,
    speak,
    dismissSpeechBubble,
    getGameStage,
    showBinary,
    guessChar,
    dispatch,
  };
};
