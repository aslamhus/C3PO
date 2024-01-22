import React, { useReducer } from 'react';
import { GameControlContext } from './context';
import { initialState, reducer } from '../Reducer';

export default function GameControlContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    /**
     *  Note:
     *
     * Any game control mechanism that has
     * its own context, but is initialized via the the useGameControl hook
     * should go here
     *
     */
    <GameControlContext.Provider value={[state, dispatch]}>{children}</GameControlContext.Provider>
  );
}
