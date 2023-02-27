import React, { useContext, useEffect, useRef } from 'react';
import C3POAnimate from '../../C3PO/C3POAnimate';
import { GameStageContext } from '../context';
import { C3POStates } from '../Reducer';

let resolver;
export const useGameStage = () => {
  const [gameStageState, dispatch] = useContext(GameStageContext);

  const speak = (words) => {
    dispatch({ type: 'speak', payload: words });
    return new Promise((resolve) => {
      resolver = resolve;
      const delay = gameStageState.showSpeechBubbleAnimationDuration;
      setTimeout(() => {
        resolver(true);
      }, delay * 1000 + 500);
    });
  };

  const dismissSpeechBubble = () => dispatch({ type: 'hideSpeechBubble' });

  const showC3PO = () => dispatch({ type: 'updateC3poState', payload: C3POStates.SHOW });

  const getGameStage = () => {
    if (gameStageState.loaded && gameStageState.c3poRef?.current) {
      return gameStageState.c3poRef.current.closest('.game-stage');
    }
    throw new Error('game stage has not loaded');
  };

  const showBinary = () => dispatch({ type: 'showBinary' });

  return {
    gameStageState,
    showC3PO,
    speak,
    dismissSpeechBubble,
    getGameStage,
    showBinary,
    dispatch,
  };
};
