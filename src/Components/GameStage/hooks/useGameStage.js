import React, { useContext } from "react";
import { GameStageContext } from "../context";
import { GAME_STAGE_VIEWS } from "../Reducer";
import { GAME_STAGE_ACTIONS } from "../Reducer";
import { GAME_STAGE_EVENTS } from "../events";
import { constraints } from "../constraints";
import { getBoundsRelativeToParent } from "../utils";

/**
 *
 * # useGameStage hook
 *
 * ## Game Stage Events
 *
 * ### GAME_STAGE_EVENTS.updateconstraints
 * Update constraints event fires after the render.
 * @example
 * document.addEventListener(GAME_STAGE_EVENTS.updateconstraints, handleGameStageUpdated)
 *
 *
 * ### GAME_STAGE_EVENTS.beforeupdateconstraints
 * Before update constraints event fires before the render.
 * Listen for game stage before update constraints event to get constraints before update
 * @example
 * document.addEventListener(GAME_STAGE_EVENTS.beforeupdateconstraints, handleGameStageBeforeUpdate)
 *
 *
 */
export const useGameStage = () => {
  const [state, dispatch] = useContext(GameStageContext);

  const setGameStageView = (state) =>
    dispatch({
      type: GAME_STAGE_ACTIONS.setGameStageView,
      payload: GAME_STAGE_VIEWS[state],
    });

  const toggleShowLoader = (bool) =>
    dispatch({ type: GAME_STAGE_ACTIONS.toggleShowLoader, payload: bool });

  const setConstraints = (constraints = { x: [0, "100%"], y: [0, "100%"] }) => {
    dispatch({ type: GAME_STAGE_ACTIONS.setConstraints, payload: constraints });
  };

  const loadGameStage = (ref) => {
    dispatch({ type: GAME_STAGE_ACTIONS.load, payload: ref });
    /** fire event 'beforeupdateconstraints' */
    document.dispatchEvent(
      new CustomEvent(GAME_STAGE_EVENTS.beforeupdateconstraints, {
        detail: constraints,
      }),
    );
  };

  const blur = () => {
    dispatch({ type: GAME_STAGE_ACTIONS.blur, payload: true });
  };

  const unBlur = () => {
    dispatch({ type: GAME_STAGE_ACTIONS.blur, payload: false });
  };

  /**
   * get game stage
   *
   * @returns {HTMLElement}
   */
  const getGameStage = () => {
    const gameStage = state?.gameStageRef?.current;
    if (!gameStage) {
      console.error("gameStage not rendered");
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
    if (!el.closest(".game-stage")) {
      throw new Error(
        `failed to get position of element relative to parent. Parent is not an ancestor of ${el.classList.toString()}`,
      );
    }

    return getBoundsRelativeToParent(el, getGameStage().parentElement);
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

  const triggerResize = () => window.dispatchEvent(new Event("resize"));

  /**
   * gets computed constraints
   *
   * @returns {Object} - DOMRect values for constraints relative to parent .game-stage
   */
  const getComputedConstraints = () => {
    const gameStageConstraints = getGameStage().querySelector(
      ".game-stage-constraints",
    );
    return getBoundsRelativeToParent(
      gameStageConstraints,
      getGameStage().parentElement,
    );
  };

  const returnToStartScreen = () => {
    setGameStageView(GAME_STAGE_VIEWS.startScreen);
  };
  window.getPos = (el) => {
    getPositionRelativeToGameStage(el, el.closest(".game-stage"));
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
    triggerResize,
    returnToStartScreen,
    blur,
    unBlur,
  };
};
