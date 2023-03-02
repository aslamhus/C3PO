import React from 'react';
import './gamestartscreen.css';

export default function GameStartScreen({ onPressGameStart }) {
  const handleGameStart = (event) => {
    if (onPressGameStart instanceof Function) {
      onPressGameStart();
    }
  };
  return (
    <div className="game-start-screen">
      <button onClick={handleGameStart}>start game</button>
    </div>
  );
}
