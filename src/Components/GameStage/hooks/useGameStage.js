import React, { useContext, useEffect, useRef } from 'react';
import C3POAnimate from '../../C3PO/C3POAnimate';
import { GameStageContext } from '../context';

export const useGameStage = ({ c3poRef }) => {
  const [gameStageState, dispatch] = useContext(GameStageContext);
  const c3poAnimateRef = useRef();

  useEffect(() => {
    if (c3poRef?.current && gameStageState.loaded == false) {
      c3poAnimateRef.current = new C3POAnimate(c3poRef);
      dispatch({
        type: 'loaded',
        payload: {
          c3poRef,
          c3poAnimateRef,
        },
      });
    }
  });

  const speak = (words) => dispatch({ type: 'speak', payload: words });

  return { gameStageState, c3poAnimateRef: gameStageState.c3poAnimateRef, speak };
};
