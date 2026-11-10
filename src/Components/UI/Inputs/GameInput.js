import React, { useEffect, useState } from "react";
import { useGameSound } from "../../hooks/useGameSound";
import InputError from "./InputError/InputError";
import "./game-input.scss";
import classNames from "classnames";

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

export default React.forwardRef(function GameInput({ ...props }, ref) {
  const { cueSoundFx, fx } = useGameSound();

  const handleInvalid = (event) => {
    event.preventDefault();
    const { target } = event;
    setError(event.target.validationMessage);
  };

  const [error, setError] = useState(props?.error);

  const gameInputClasses = classNames("input-container", {
    error: props.error,
  });

  /**
   * Handle Key Down
   * @param {KeyboardEvent} event
   */
  const handleKeyDown = (event) => {
    const { target } = event;
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
          sound = fx.select;
      }

      cueSoundFx(sound);
    }

    resetValidity(event);
  };

  const resetValidity = (event) => {
    const { target } = event;
    target.setCustomValidity("");
    target.reportValidity();
    setError(null);
  };

  const handleBlur = (event) => {
    resetValidity(event);
  };

  useEffect(() => {
    setError(props.error);
  }, [props.error]);

  return (
    <>
      <div className={gameInputClasses}>
        <input
          ref={ref}
          autoComplete="off"
          className={error ? "error" : ""}
          {...props}
          onKeyDown={handleKeyDown}
          onInvalid={handleInvalid}
          onBlur={handleBlur}
        />
        <InputError error={error} />
      </div>
    </>
  );
});
