import React, { useEffect, useReducer, useRef } from "react";
import GameSoundContext from "./context";
import { initialState, reducer } from "./Reducer";
import TrackManager from "./classes/TrackManager";

export default function GameSoundProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const audioContextRef = useRef();
  const trackManagerRef = useRef(new TrackManager());

  useEffect(() => {
    audioContextRef.current = new AudioContext();
  }, []);

  return (
    <GameSoundContext.Provider
      value={[state, dispatch, audioContextRef, trackManagerRef]}
    >
      {children}
    </GameSoundContext.Provider>
  );
}
