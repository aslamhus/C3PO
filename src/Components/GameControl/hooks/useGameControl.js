import { useContext } from 'react';
import { useAskQuestion } from '../AskQuestion/hooks/useAskQuestion';
import { GameControlContext } from '../Context/context';
export const useGameControl = ({ speak }) => {
  const [gameState, dispatch] = useContext(GameControlContext);

  const { ask } = useAskQuestion();

  const askQuestion = ({ question, responses }) => {
    speak(question);
    return ask({ question, responses });
  };

  const toggleViewScreen = (bool) => dispatch({ type: 'toggleViewScreen', payload: bool });

  const toggleControls = (bool) => dispatch({ type: 'toggleControls', payload: bool });

  return { gameState, askQuestion, toggleViewScreen, toggleControls };
};
