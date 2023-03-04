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

  const setConstraints = (constraints = { x: [0, '100%'], y: [0, '100%'] }) => {
    dispatch({ type: GAME_STAGE_ACTIONS.setConstraints, payload: constraints });
  };

  const loadGameStage = (ref) => {
    dispatch({ type: GAME_STAGE_ACTIONS.load, payload: ref });
  };

  const getGameStage = () => {
    return state.gameStageRef.current;
  };

  /**
   * gets computed constraints
   *
   * Note: alternatively, you could call window.getComputedStyles...
   * and cast the relevant styles to numbers.
   *
   * @returns {Object} - DOMRect values for constraints relative to parent .game-stage
   */
  const getComputedConstraints = () => {
    const constraintBounds = getGameStage()
      .querySelector('.game-stage-constraints')
      .getBoundingClientRect();
    const parentBounds = getGameStage().parentElement.getBoundingClientRect();
    return {
      top: constraintBounds.top - parentBounds.top,
      right: parentBounds.right - constraintBounds.right,
      bottom: parentBounds.bottom - constraintBounds.bottom,
      left: constraintBounds.left - parentBounds.left,
      height: constraintBounds.height,
      width: constraintBounds.width,
      x: constraintBounds.x - parentBounds.x,
      y: constraintBounds.y - parentBounds.y,
    };
  };

  return {
    state,
    loadGameStage,
    getGameStage,
    setGameStageView,
    toggleShowLoader,
    setConstraints,
    getComputedConstraints,
  };
};
