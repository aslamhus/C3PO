import React, { useReducer } from 'react';
import { GameStageContext } from './context';
import { reducer, initialState } from './Reducer';

export default function GameStageProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GameStageContext.Provider value={[state, dispatch]}>{children}</GameStageContext.Provider>
  );
}
