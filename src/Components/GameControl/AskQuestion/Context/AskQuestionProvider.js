import React, { useReducer } from 'react';
import { initialState, reducer } from '../Reducer';
import { AskQuestionContext } from './context';

export default function AskQuestionProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AskQuestionContext.Provider value={[state, dispatch]}>{children}</AskQuestionContext.Provider>
  );
}
