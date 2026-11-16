import React, { useEffect, useReducer, useRef } from "react";
import GameSoundContext from "./context";
import { GAME_SOUND_ACTIONS, initialState, reducer } from "./Reducer";
import TrackManager from "./classes/TrackManager";
import useGamePlayer from "../../GamePlayer/hooks/useGamePlayer";

export default function GameSoundProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { player } = useGamePlayer();

  const audioContextRef = useRef();
  const trackManagerRef = useRef();

  useEffect(() => {
    audioContextRef.current = new AudioContext();
    trackManagerRef.current = new TrackManager(audioContextRef.current);
  }, []);

  useEffect(() => {
    if (!player) return;

    if (!player?.getName) {
      throw new Error("player get name unavailable");
    }
    dispatch({
      type: GAME_SOUND_ACTIONS.setFXGain,
      payload: player.getOptions().getFxGain(),
    });
    dispatch({
      type: GAME_SOUND_ACTIONS.setMusicGain,
      payload: player.getOptions().getMusicGain(),
    });
    if (player.getOptions().getIsMuted()) {
      trackManagerRef.current.setIsMuted(true);
      dispatch({
        type: GAME_SOUND_ACTIONS.setMute,
        payload: true,
      });
    }
  }, [player]);

  return (
    <GameSoundContext.Provider
      value={[state, dispatch, audioContextRef, trackManagerRef]}
    >
      {children}
    </GameSoundContext.Provider>
  );
}
