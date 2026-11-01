import { useContext, useEffect } from "react";
import { GameControlContext } from "../Context/context";
import { GAME_CONTROL_ACTIONS } from "../Context/Reducer";
import { characterToBinaryDict } from "../../ControlKeypad/binaryDict";

export const useGameControl = () => {
  const [state, dispatch] = useContext(GameControlContext);

  const toggleViewScreen = (bool) =>
    dispatch({ type: GAME_CONTROL_ACTIONS.toggleViewScreen, payload: bool });

  const toggleControls = (bool) =>
    dispatch({ type: GAME_CONTROL_ACTIONS.toggleControls, payload: bool });

  const toggleKeypad = (bool, options = { onPressChar }) => {
    dispatch({
      type: GAME_CONTROL_ACTIONS.toggleKeypad,
      payload: [bool, options],
    });
  };

  /**
   * Begin the game
   *
   * Sets the gameStart state to true and resets the game state
   */
  const beginGame = () => dispatch({ type: GAME_CONTROL_ACTIONS.beginGame });

  /**
   * End game
   *
   * Sets the gameStart state to false and resets the game state
   */
  const endGame = () => dispatch({ type: GAME_CONTROL_ACTIONS.endGame });

  /**
   * Disable ControlKeypad keys
   * @param {Array} keys - array of keys to disable, i.e. ['a','b','!']
   */
  const disableKeys = (keys) => {
    dispatch({ type: GAME_CONTROL_ACTIONS.setDisabledKeys, payload: keys });
  };

  /**
   * Enable ControlKeypad keys
   * @param {Array} keys - array of keys to enable, i.e. ['a','b','!']
   */
  const enableKeys = (keys) => {
    dispatch({ type: GAME_CONTROL_ACTIONS.setEnabledKeys, payload: keys });
  };

  /**
   * Disable or enable keypad.
   *
   * @param {Boolean} bool
   * @returns
   */
  const disableKeypad = (bool) =>
    dispatch({ type: GAME_CONTROL_ACTIONS.disableKeypad, payload: bool });

  /**
   * Returns a list of the keys (disabled or enabled)
   */
  const getKeys = () => {
    let keys = Object.keys(characterToBinaryDict).reduce((acc, charGroup) => {
      const charGroupKeys = characterToBinaryDict[charGroup] ?? [];
      if (!charGroupKeys) return acc;
      acc.push(...Object.keys(charGroupKeys));
      return acc;
    }, []);
    return keys;
  };

  /**
   * Sets the control strip components
   *
   * @param {ReactComponent} ReactComponent
   */
  const setControlStripComponent = (
    ReactComponent,
    type = "primary",
    options = { overwrite: true },
  ) => {
    dispatch({
      type:
        type == "primary"
          ? GAME_CONTROL_ACTIONS.setPrimaryControlStripComponent
          : GAME_CONTROL_ACTIONS.setSecondaryControlStripComponent,
      payload: ReactComponent,
      options,
    });
  };

  const setCustomViewScreenComponents = (components) => {
    if (!Array.isArray(components)) components = [components];
    dispatch({
      type: GAME_CONTROL_ACTIONS.setCustomViewScreenComponents,
      payload: components,
    });
  };

  const addCustomViewScreenComponent = (component) => {
    dispatch({
      type: GAME_CONTROL_ACTIONS.addCustomViewScreenComponent,
      payload: component,
    });
  };

  return {
    state,
    toggleViewScreen,
    toggleControls,
    toggleKeypad,
    setControlStripComponent,
    beginGame,
    endGame,
    disableKeys,
    enableKeys,
    getKeys,
    disableKeypad,
    setCustomViewScreenComponents,
    addCustomViewScreenComponent,
  };
};
