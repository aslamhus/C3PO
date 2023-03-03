import React, { useContext, useEffect, useReducer } from 'react';
import StarWarsLoader from '../StarWarsLoader/StarWarsLoader';
// import Tatooine
import C3PO from '../C3PO';
import BinaryMessage from '../Binary/BinaryMessage';
import { useGameStage } from './hooks/useGameStage';
import GameStartScreen from '../GameStartScreen/GameStartScreen';
import { useGameControl } from '../GameControl/hooks/useGameControl';
import { AnimatePresence } from 'framer-motion';
import './game-stage.css';

export default function GameStage(props) {
  const {
    state,
    state: { loaded, showBinary, guessChar, showGameStartScreen, stageView },
    handleGuessAnimationComplete,
    handleGuessAnimationStart,
    toggleGameStartScreen,
  } = useGameStage();

  const { beginGame } = useGameControl();

  console.log('stage state', state);

  return (
    <div className="game-stage">
      {!loaded && <StarWarsLoader />}

      <AnimatePresence>
        {stageView == 'startScreen' && (
          <GameStartScreen
            onPressGameStart={() => {
              toggleGameStartScreen(false);
              beginGame();
            }}
          />
        )}
      </AnimatePresence>

      <C3PO></C3PO>
      {/* <Tatooine/> */}
      {props.children}

      <BinaryMessage
        show={showBinary}
        guessChar={guessChar}
        onGuessAnimationStart={handleGuessAnimationStart}
        onGuessAnimationComplete={handleGuessAnimationComplete}
      ></BinaryMessage>
    </div>
  );
}
