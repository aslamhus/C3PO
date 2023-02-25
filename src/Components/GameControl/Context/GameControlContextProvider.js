import React, { useReducer } from 'react';
import { GameControlContext } from './context';
import { initialState, reducer } from '../Reducer';

export default function GameControlContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameControlContext.Provider value={[state, dispatch]}>{children}</GameControlContext.Provider>
  );
}
