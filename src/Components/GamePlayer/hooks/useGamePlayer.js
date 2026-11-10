import { useContext } from "react";
import { GamePlayerContext } from "../Context/context";
import { GAME_PLAYER_ACTIONS } from "../Context/Reducer";
import Player from "../Player";

/**
 * @typedef {Object} UseGamePlayerReturn
 * @property {Player} player
 * @property {Function} setPlayer
 *
 * @returns {UseGamePlayerReturn}
 */
export default function useGamePlayer() {
  const [state, dispatch] = useContext(GamePlayerContext);

  const { player, players } = state ?? {};

  /**
   * @param {Player} player
   * @returns
   */
  const setPlayer = (player) => {
    dispatch({ type: GAME_PLAYER_ACTIONS.setPlayer, payload: player });
  };

  return {
    player,
    setPlayer,
  };
}
