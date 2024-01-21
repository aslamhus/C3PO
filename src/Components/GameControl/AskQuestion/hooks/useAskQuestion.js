import { useContext } from 'react';
import { AskQuestionContext } from '../Context/context';

let resolveQuestion;

export const useAskQuestion = () => {
  /**
   * dispatch is special method from react useReducer.
   * State is the state we can control.
   */
  const context = useContext(AskQuestionContext);
  const [questionState, dispatch] = context;

  const ask = ({
    question,
    responses = [
      { title: 'yes', value: true },
      { title: 'no', value: false },
    ],
    promptDelay = 0,
  }) => {
    dispatch({ show: true, question, responses, promptDelay });
    return new Promise((resolve, reject) => {
      resolveQuestion = resolve;
    });
  };

  const handleResponse = (event) => {
    const {
      target: { value },
    } = event;
    resolveQuestion(value);
    dispatch({ show: false });
  };

  return { ask, questionState, handleResponse };
};
