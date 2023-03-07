import React, { useContext } from 'react';
import { GameStageContext } from '../context';
import { GAME_STAGE_VIEWS } from '../Reducer';
import { GAME_STAGE_ACTIONS } from '../Reducer';
import { GAME_STAGE_EVENTS } from '../events';
import { constraints } from '../constraints';

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
    /** fire event 'beforeupdateconstraints' */
    document.dispatchEvent(
      new CustomEvent(GAME_STAGE_EVENTS.beforeupdateconstraints, { detail: constraints })
    );
  };

  /**
   * get game stage
   *
   * @returns {HTMLElement}
   */
  const getGameStage = () => {
    const gameStage = state?.gameStageRef?.current;
    if (!gameStage) {
      console.error('gameStage not rendered');
    }
    return gameStage;
  };

  /**
   *
   * get position of element relative to game stage
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

  /**
   * Does element break constraints
   *
   * @param {HTMLElement} el
   * @returns {Object} - { constraintsBroken, constraintBounds, elementBounds }
   */
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
    if (elBounds.height > constraintBounds.height) {
      constraintsBroken.push(constraints.height.name);
    }
    if (elBounds.width > constraintBounds.width) {
      constraintsBroken.push(constraints.width.name);
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

  /**
   * subtractGameStageOffsetFromDOMRect
   *
   *
   *
   * @param {DOMRect} elBounds
   * @returns {Object} - the element bounds with game stage as a cartesian reference point.
   * Also returns the percentValues of each property.
   */
  const subtractGameStageOffsetFromDOMRect = (elBounds) => {
    const parentBounds = getGameStage().parentElement.getBoundingClientRect();
    const x = elBounds.x - parentBounds.x;
    const y = elBounds.y - parentBounds.y;
    const height = elBounds.height;
    const width = elBounds.width;
    const top = elBounds.top - parentBounds.top;
    const left = elBounds.left - parentBounds.left;
    const right = parentBounds.right - elBounds.right;
    const bottom = parentBounds.bottom - elBounds.bottom;
    return {
      x,
      xPercent: x / parentBounds.width,
      y,
      yPercent: y / parentBounds.height,
      height,
      heightPercent: height / parentBounds.height,
      width,
      widthPercent: width / parentBounds.width,
      top,
      topPercent: top / parentBounds.height,
      left,
      leftPercent: left / parentBounds.width,
      right,
      rightPercent: right / parentBounds.width,
      bottom,
      bottomPercent: bottom / parentBounds.height,
    };
  };

  window.getPos = (el) => {
    getPositionRelativeToGameStage(el, el.closest('.game-stage'));
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
