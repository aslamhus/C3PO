import { useContext } from 'react';
import { GameControlContext } from '../Context/context';
import { GAME_CONTROL_ACTIONS } from '../Reducer';
export const useGameControl = () => {
  const [state, dispatch] = useContext(GameControlContext);

  const toggleViewScreen = (bool) =>
    dispatch({ type: GAME_CONTROL_ACTIONS.toggleViewScreen, payload: bool });

  const toggleControls = (bool) =>
    dispatch({ type: GAME_CONTROL_ACTIONS.toggleControls, payload: bool });

  const toggleKeypad = (bool, options = { onPressChar }) => {
    dispatch({ type: GAME_CONTROL_ACTIONS.toggleKeypad, payload: [bool, options] });
  };

  const beginGame = () => dispatch({ type: GAME_CONTROL_ACTIONS.beginGame });

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
   * Sets the control strip components
   *
   * @param {ReactComponent} ReactComponent
   */
  const setControlStripComponent = (
    ReactComponent,
    type = 'primary',
    options = { overwrite: true }
  ) => {
    dispatch({
      type:
        type == 'primary'
          ? GAME_CONTROL_ACTIONS.setPrimaryControlStripComponent
          : GAME_CONTROL_ACTIONS.setSecondaryControlStripComponent,
      payload: ReactComponent,
      options,
    });
  };

  return {
    state,
    toggleViewScreen,
    toggleControls,
    toggleKeypad,
    setControlStripComponent,
    beginGame,
    disableKeys,
    enableKeys,
    disableKeypad,
  };
};
