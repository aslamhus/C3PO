import React from "react";
import { useGameSound } from "../../hooks/useGameSound";

const silentKeys = {
  Enter: true,
  ArrowLeft: true,
  ArrowRight: true,
  ArrowUp: true,
  ArrowDown: true,
  Meta: true,
  Alt: true,
  Shift: true,
  CapsLock: true,
  Tab: true,
  Control: true,
};

export default function GameInput({ ...props }) {
  const { cueSoundFx, fx } = useGameSound();

  /**
   * Handle Key Down
   * @param {KeyboardEvent} event
   */
  const handleKeyDown = (event) => {
    if (props.onKeyDown instanceof Function) {
      props.onKeyDown(event);
    }
    if (event.defaultPrevented) return;
    let sound = fx.select;
    if (!silentKeys.hasOwnProperty(event.key)) {
      switch (event.key) {
        case "Backspace":
          sound = fx.error;
        default:
          cueSoundFx(sound);
      }
    }
  };
  return (
    <div className="input-container">
      <input autoComplete="off" {...props} onKeyDown={handleKeyDown} />
    </div>
  );
}
