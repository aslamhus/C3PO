import { useContext } from 'react';
import { useAskQuestion } from '../AskQuestion/hooks/useAskQuestion';
import { GameControlContext } from '../Context/context';
import { GAME_CONTROL_ACTIONS } from '../Reducer';
export const useGameControl = ({ speak }) => {
  const [state, dispatch] = useContext(GameControlContext);

  const { ask } = useAskQuestion();

  const askQuestion = ({ question, responses }) => {
    speak(question);
    return ask({ question, responses });
  };

  const toggleViewScreen = (bool) =>
    dispatch({ type: GAME_CONTROL_ACTIONS.toggleViewScreen, payload: bool });

  const toggleControls = (bool) =>
    dispatch({ type: GAME_CONTROL_ACTIONS.toggleControls, payload: bool });

  const toggleTranslator = (bool) =>
    dispatch({ type: GAME_CONTROL_ACTIONS.toggleTranslator, payload: bool });

  /**
   * Sets the control strip value
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
    askQuestion,
    toggleViewScreen,
    toggleControls,
    toggleTranslator,
    setControlStripComponent,
  };
};
