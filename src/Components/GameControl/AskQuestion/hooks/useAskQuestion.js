import { useContext } from "react";
import { AskQuestionContext } from "../Context/context";
import { ASK_QUESTION_ACTIONS } from "../Context/Reducer";

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
      { title: "yes", value: true },
      { title: "no", value: false },
    ],
    promptDelay = 0,
  }) => {
    dispatch({
      type: ASK_QUESTION_ACTIONS.ask,
      payload: { question, responses, promptDelay },
    });
    return new Promise((resolve, reject) => {
      resolveQuestion = resolve;
    });
  };

  const handleResponse = (event) => {
    const {
      target: { value },
    } = event;
    resolveQuestion(value);
    setShow(false);
  };

  const setShow = (value) => {
    dispatch({ type: ASK_QUESTION_ACTIONS.setShow, payload: value });
  };

  return {
    ask,
    questionState,
    handleResponse,
    showQuestion: () => setShow(true),
    hideQuestion: () => setShow(false),
  };
};
