import { useContext, useEffect } from "react";
import { GameOptionsContext } from "../Context/context";
import { GAME_OPTIONS_ACTIONS } from "../Context/Reducer";

export default function useGameOptions() {
  const [state, dispatch, showOptionsMenuRef] = useContext(GameOptionsContext);

  const setShowOptionsMenu = (value) => {
    dispatch({ type: GAME_OPTIONS_ACTIONS.setShowOptionsMenu, payload: value });
    showOptionsMenuRef.current = value;
  };

  return {
    state,
    setShowOptionsMenu,
  };
}
