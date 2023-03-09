import { useContext } from 'react';
import { useAskQuestion } from '../AskQuestion/hooks/useAskQuestion';
import { GameControlContext } from '../Context/context';
import { GAME_CONTROL_ACTIONS } from '../Reducer';
export const useGameControl = () => {
  const [state, dispatch] = useContext(GameControlContext);

  const toggleViewScreen = (bool) =>
    dispatch({ type: GAME_CONTROL_ACTIONS.toggleViewScreen, payload: bool });

  const toggleControls = (bool) =>
    dispatch({ type: GAME_CONTROL_ACTIONS.toggleControls, payload: bool });

  const toggleKeypad = (bool, options = { onPressChar }) =>
    dispatch({ type: GAME_CONTROL_ACTIONS.toggleKeypad, payload: [bool, options] });

  const beginGame = () => dispatch({ type: GAME_CONTROL_ACTIONS.beginGame });

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
  };
};
