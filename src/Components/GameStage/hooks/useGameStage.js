import React, { useContext, useEffect, useRef } from 'react';
import C3POAnimate from '../../C3PO/C3POAnimate';
import { GameStageContext } from '../context';
import { C3POStates } from '../Reducer';

export const useGameStage = () => {
  const [gameStageState, dispatch] = useContext(GameStageContext);

  const speak = (words) => dispatch({ type: 'speak', payload: words });

  const showC3PO = () => dispatch({ type: 'updateC3poState', payload: C3POStates.SHOW });

  return { gameStageState, showC3PO, speak };
};
