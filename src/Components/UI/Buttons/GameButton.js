import React from "react";
import { useGameSound } from "../../hooks/useGameSound";
import classNames from "classnames";

const FONT_SIZES = {
  xs: "0.75em",
  sm: "1em",
  medium: "1.25em",
  lg: "1.5em",
};

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
}) {
  const { cueSoundFx } = useGameSound();

  const fontSize = FONT_SIZES[size] ?? FONT_SIZES.medium;

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
      onClick={handleClick}
      style={{ fontSize, ...style }}
      className={buttonClassname}
      id={id}
      value={value}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default GameButton;
