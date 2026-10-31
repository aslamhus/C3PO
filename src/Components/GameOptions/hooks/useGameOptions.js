import { useContext } from "react";
import { GameOptionsContext } from "../Context/context";
import { GAME_OPTIONS_ACTIONS } from "../Context/Reducer";

export default function useGameOptions() {
  const [state, dispatch, showOptionsMenuRef] = useContext(GameOptionsContext);

  return {
    state,
  };
}
