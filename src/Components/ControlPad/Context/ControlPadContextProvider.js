import React, { useEffect, useReducer, useRef } from "react";
import { ControlPadContext } from "./context";
import ControlPadManager from "../ControlPadManager";

export default function ControlPadContextProvider({ children }) {
  const controlPadManagerRef = useRef(
    new ControlPadManager({
      onPop,
      onPush,
    }),
  );

  const onPop = (popped) => {
    console.log("CURRENT SCOPE", controlPadManagerRef.current.currentScope);
  };

  const onPush = (popped) => {
    console.log("CURRENT SCOPE", controlPadManagerRef.current.currentScope);
  };
  const currentFocusRef = useRef(document.activeElement);

  const globalKeyPressListener = (event) => {
    const { key } = event;
    switch (key) {
      case "ArrowUp":
        controlPadManagerRef.current.up();
        break;
      case "ArrowDown":
        controlPadManagerRef.current.down();
        break;
      case "ArrowLeft":
        controlPadManagerRef.current.left();
        break;
      case "ArrowRight":
        controlPadManagerRef.current.right();
        break;
      case "Enter":
        controlPadManagerRef.current.confirm();
        break;
      case "Escape":
      case "Backspace":
        controlPadManagerRef.current.cancel();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", globalKeyPressListener);
    return () =>
      document.removeEventListener("keydown", globalKeyPressListener);
  }, []);

  return (
    <ControlPadContext.Provider value={[controlPadManagerRef, currentFocusRef]}>
      {children}
    </ControlPadContext.Provider>
  );
}
