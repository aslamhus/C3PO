import React, { useContext } from 'react';
import { constraints } from '../constraints';
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
   *
   * @param {HTMLElement} el
   * @param {HTMLElement} parent
   */
  const getPositionRelativeToGameStage = (el) => {
    if (!el.closest('.game-stage')) {
      throw new Error(
        `failed to get position of element relative to parent. Parent is not an ancestor of ${el.classList.toString()}`
      );
    }
    const elBounds = el.getBoundingClientRect();
    return subtractGameStageOffsetFromDOMRect(elBounds);
  };

  const doesElementBreakConstraints = (el) => {
    let constraintsBroken = [];
    const gameStage = getGameStage();
    const constraintBounds = getComputedConstraints();
    const elBounds = getPositionRelativeToGameStage(el, gameStage);
    if (elBounds.y + elBounds.height > constraintBounds.height) {
      constraintsBroken.push(constraints.bottom.name);
    }
    if (elBounds.y < constraintBounds.y) {
      constraintsBroken.push(constraints.top.name);
    }
    if (elBounds.x + elBounds.width > constraintBounds.width) {
      constraintsBroken.push(constraints.right.name);
    }
    if (elBounds.x < constraintBounds.x) {
      constraintsBroken.push(constraints.left.name);
    }
    if (constraintsBroken.length > 0) {
      return {
        constraintsBroken,
        constraintBounds,
        elementBounds: elBounds,
      };
    }
    return false;
  };

  window.doesElementBreakConstraints = doesElementBreakConstraints;
  /**
   * gets computed constraints
   *
   * @returns {Object} - DOMRect values for constraints relative to parent .game-stage
   */
  const getComputedConstraints = () => {
    const gameStageBounds = getGameStage()
      .querySelector('.game-stage-constraints')
      .getBoundingClientRect();
    return subtractGameStageOffsetFromDOMRect(gameStageBounds);
  };

  const subtractGameStageOffsetFromDOMRect = (elBounds) => {
    const parentBounds = getGameStage().parentElement.getBoundingClientRect();
    return {
      x: elBounds.x - parentBounds.x,
      y: elBounds.y - parentBounds.y,
      height: elBounds.height,
      width: elBounds.width,
      top: elBounds.top - parentBounds.top,
      left: elBounds.left - parentBounds.left,
      right: parentBounds.right - elBounds.right,
      bottom: parentBounds.bottom - elBounds.bottom,
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
    doesElementBreakConstraints,
    getPositionRelativeToGameStage,
  };
};
