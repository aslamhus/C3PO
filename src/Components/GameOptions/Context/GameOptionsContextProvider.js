import React, { useEffect, useReducer, useRef } from "react";
import { GameOptionsContext } from "./context";
import { GAME_OPTIONS_ACTIONS, initialState, reducer } from "./Reducer";

export default function GameOptionsContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const showOptionsMenuRef = useRef();

  const handleKeyPress = (event) => {
    const { key } = event;
    if (document.activeElement.nodeName === "INPUT") return;
    if (key == " ") {
      console.log("toggle options menu");
      const value = !showOptionsMenuRef.current;
      dispatch({
        type: GAME_OPTIONS_ACTIONS.showOptionsMenu,
        payload: value,
      });
      showOptionsMenuRef.current = value;
    }
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
