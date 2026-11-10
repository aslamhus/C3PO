import React, { useEffect, useReducer, useRef } from "react";
import { GameOptionsContext } from "./context";
import { GAME_OPTIONS_ACTIONS, initialState, reducer } from "./Reducer";
import { toggleFullScreen } from "../hooks/utils";

export default function GameOptionsContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const showOptionsMenuRef = useRef();

  const toggleOptionsMenuOnSpaceBar = (event) => {
    const { key } = event;
    if (document.activeElement.nodeName === "INPUT") return;
    if (key == " ") {
      const value = !showOptionsMenuRef.current;
      dispatch({
        type: GAME_OPTIONS_ACTIONS.showOptionsMenu,
        payload: value,
      });
      showOptionsMenuRef.current = value;
    }
  };

  const toggleFullScreenOnFKey = (event) => {
    const { key } = event;
    if (document.activeElement.nodeName === "INPUT") return;
    if (key == "f") {
      toggleFullScreen();
    }
  };

  const handleKeyPress = (event) => {
    toggleOptionsMenuOnSpaceBar(event);
    toggleFullScreenOnFKey(event);
  };
  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  return (
    <GameOptionsContext.Provider value={[state, dispatch, showOptionsMenuRef]}>
      {children}
    </GameOptionsContext.Provider>
  );
}
