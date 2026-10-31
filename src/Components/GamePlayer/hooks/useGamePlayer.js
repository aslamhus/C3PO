import { useContext } from "react";
import { GamePlayerContext } from "../Context/context";
import { GAME_PLAYER_ACTIONS } from "../Context/Reducer";

export default function useGamePlayer() {
  const [state, dispatch] = useContext(GamePlayerContext);

  const { player } = state ?? {};
  const setPlayerName = (name) =>
    dispatch({ type: GAME_PLAYER_ACTIONS.setPlayerName, payload: name });

  const getLastSavedState = () => {};

  return {
    state,
    player,
    setPlayerName,
  };
}
