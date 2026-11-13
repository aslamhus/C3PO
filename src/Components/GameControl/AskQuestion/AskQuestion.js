import React, { useEffect, useState, useRef, useContext } from "react";
import { AskQuestionContext } from "./Context/context";
import { useAskQuestion } from "./hooks/useAskQuestion";
import "./ask-question.css";
import SelectButton from "../../UI/Buttons/SelectButton";

export default function AskQuestion({}) {
  const timeout = useRef();
  // const [_show, setShow] = useState(false);
  // const [state, dispatch] = useContext(AskQuestionContext)

  const { questionState, showQuestion, hideQuestion, handleResponse } =
    useAskQuestion();

  const { show, responses, promptDelay } = questionState ?? {};

  useEffect(() => {
    if (show) {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      timeout.current = setTimeout(() => showQuestion(), promptDelay * 1000);
    }
  }, [show, responses]);

  useEffect(() => {
    // console.log("question state", questionState);
  }, [questionState]);

  // if (!show) return;
  return (
    <div className="ask-question" style={{ display: show ? "" : "none" }}>
      {responses &&
        responses.map((response, index) => {
          return (
            <SelectButton
              key={`${response.title}-${index}`}
              onClick={handleResponse}
              value={response.value}
            >
              {response.title}
            </SelectButton>
          );
        })}
    </div>
  );
}
