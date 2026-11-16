import React, { useEffect, useReducer } from "react";
import { GameStageContext } from "./context";
import { reducer, initialState, GAME_STAGE_ACTIONS } from "./Reducer";
import isMobile from "is-mobile";

export default function GameStageProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: GAME_STAGE_ACTIONS.setIsMobile, payload: isMobile() });
  }, []);
  return (
    <GameStageContext.Provider value={[state, dispatch]}>
      {children}
    </GameStageContext.Provider>
  );
}
