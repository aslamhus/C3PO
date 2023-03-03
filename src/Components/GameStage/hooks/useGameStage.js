import React, { useContext } from 'react';
import { GameStageContext } from '../context';
import { GAME_STAGE_VIEWS } from '../Reducer';
import { GAME_STAGE_ACTIONS } from '../Reducer';

export const useGameStage = () => {
  const [state, dispatch] = useContext(GameStageContext);

  const setGameStageView = (state) =>
    dispatch({ type: GAME_STAGE_ACTIONS.setGameStageView, payload: GAME_STAGE_VIEWS[state] });

  const toggleShowLoader = (bool) =>
    dispatch({ type: GAME_STAGE_ACTIONS.toggleShowLoader, payload: bool });

  return {
    state,
    setGameStageView,
    toggleShowLoader,
  };
};
