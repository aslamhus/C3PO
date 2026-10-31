import React from "react";
import { useGameSound } from "../../hooks/useGameSound";

const FONT_SIZES = {
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
}) {
  const { cueSoundFx } = useGameSound();

  const fontSize = FONT_SIZES[size] ?? FONT_SIZES.medium;

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
      className={className}
      id={id}
      value={value}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default GameButton;
