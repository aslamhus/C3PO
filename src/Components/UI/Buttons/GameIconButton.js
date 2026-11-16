import React from "react";
import GameButton from "./GameButton";

export default function GameIconButton({ children, className, ...props }) {
  return (
    <GameButton
      className={`game-icon-button${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
    </GameButton>
  );
}
