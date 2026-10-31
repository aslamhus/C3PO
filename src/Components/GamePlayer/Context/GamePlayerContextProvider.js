import React, { useReducer } from "react";
import { GamePlayerContext } from "./context";
import { initialState, reducer } from "./Reducer";

export default function GamePlayerContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GamePlayerContext.Provider value={[state, dispatch]}>
      {children}
    </GamePlayerContext.Provider>
  );
}
