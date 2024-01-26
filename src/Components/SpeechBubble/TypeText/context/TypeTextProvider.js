import React, { useReducer } from 'react';
import { TypeTextContext } from './context';
import { initialState, reducer } from './reducer';

export default function TypeTextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <TypeTextContext.Provider value={[state, dispatch]}>{children}</TypeTextContext.Provider>;
}
