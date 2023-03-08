import React, { useReducer } from 'react';
import { TipContext } from './context';
import { initialState, reducer } from '../Reducer';

export default function TipProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <TipContext.Provider value={[state, dispatch]}>{children}</TipContext.Provider>;
}
