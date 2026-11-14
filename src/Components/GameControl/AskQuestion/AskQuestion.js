import React, { useEffect, useState, useRef, useContext } from "react";
import { AskQuestionContext } from "./Context/context";
import { useAskQuestion } from "./hooks/useAskQuestion";
import "./ask-question.css";
import SelectButton from "../../UI/Buttons/SelectButton";

export default function AskQuestion({}) {
  const timeout = useRef();

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

  return (
    <div className="ask-question" style={{ display: show ? "" : "none" }}>
      {responses &&
        responses.map((response, index) => {
          return (
            <SelectButton
              key={`${response.title}-${index}`}
              // autoFocus={response?.autoFoucs ?? index === 0}
              tabIndex={index}
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
