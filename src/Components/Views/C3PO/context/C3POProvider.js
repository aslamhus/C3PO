import React, { useReducer } from 'react';
import { C3POContext } from './context';
import { reducer, initialState } from './Reducer';

export default function C3POProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <C3POContext.Provider value={[state, dispatch]}>{children}</C3POContext.Provider>;
}
