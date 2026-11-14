import React from "react";
import { useGameSound } from "../../hooks/useGameSound";
import classNames from "classnames";

function GameButton({
  onClick,
  sound,
  style,
  className,
  id,
  value,
  children,
  disabled,
  size,
  active = false,
  autoFocus = false,
  ...props
}) {
  const { cueSoundFx } = useGameSound();

  const buttonClassname = classNames(
    "game-button",
    size ? `game-button-${size}` : "",
    className,
    {
      active: active,
    },
  );

  const handleClick = async (event) => {
    if (onClick instanceof Function) {
      onClick(event);
    }
    if (sound) {
      await cueSoundFx(sound);
    }
  };

  return (
    <button
      autoFocus={autoFocus}
      onClick={handleClick}
      style={{ ...style }}
      className={buttonClassname}
      id={id}
      value={value}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default GameButton;
