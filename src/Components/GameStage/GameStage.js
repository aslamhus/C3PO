import React, { useContext, useEffect, useReducer } from 'react';
import { GameStageContext } from './context';
import StarWarsLoader from '../StarWarsLoader/StarWarsLoader';
import BinaryMessage from '../Binary/BinaryMessage';
import './game-stage.css';
import { useGameStage } from './hooks/useGameStage';
import GameStartScreen from '../GameStartScreen/GameStartScreen';

export default function GameStage(props) {
  const {
    state: { loaded, showBinary, guessChar, showGameStartScreen },
    handleGuessAnimationComplete,
    handleGuessAnimationStart,
  } = useGameStage();
  return (
    <div className="game-stage">
      {props.children}
      {!loaded && <StarWarsLoader />}
      <GameStartScreen show={showGameStartScreen} />
      <BinaryMessage
        show={showBinary}
        guessChar={guessChar}
        onGuessAnimationStart={handleGuessAnimationStart}
        onGuessAnimationComplete={handleGuessAnimationComplete}
      ></BinaryMessage>
    </div>
  );
}
