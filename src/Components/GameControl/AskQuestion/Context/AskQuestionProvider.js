import React, { useReducer, useRef } from "react";
import { initialState, reducer } from "./Reducer";
import { AskQuestionContext } from "./context";

export default function AskQuestionProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const resolveQuestionRef = useRef();

  return (
    <AskQuestionContext.Provider
      value={[
        //
        state,
        dispatch,
        resolveQuestionRef,
      ]}
    >
      {children}
    </AskQuestionContext.Provider>
  );
}
