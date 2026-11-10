import React, { useEffect, useReducer, useState } from "react";
import { GamePlayerContext } from "./context";
import { GAME_PLAYER_ACTIONS, initialState, reducer } from "./Reducer";
import useSave from "../../GameSave/hooks/useSave";
import { DEFAULT_PLAYER_NAME } from "./Reducer";

export default function GamePlayerContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [mounted, setMounted] = useState(false);
  const { saveFiles, findSaveFileForPlayerWithName } = useSave();

  useEffect(() => {
    if (mounted || !saveFiles?.length) return;
    const lastSave =
      saveFiles[0] ?? findSaveFileForPlayerWithName(DEFAULT_PLAYER_NAME);
    console.log("lastSave?", lastSave);

    if (lastSave) {
      dispatch({
        type: GAME_PLAYER_ACTIONS.setPlayer,
        payload: lastSave.player,
      });
    }
    setMounted(true);
  }, [saveFiles]);

  return (
    <GamePlayerContext.Provider value={[state, dispatch]}>
      {children}
    </GamePlayerContext.Provider>
  );
}
