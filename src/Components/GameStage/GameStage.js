import React, { useEffect } from 'react';
import StarWarsLoader from '../StarWarsLoader/StarWarsLoader';
import GameStartScreen from '../Views/GameStartScreen/GameStartScreen';
import C3POProvider from '../Views/C3PO/context/C3POProvider';
import C3PO from '../Views/C3PO';
import { AnimatePresence } from 'framer-motion';
import { useGame } from '../hooks/useGame';
import { GAME_STAGE_VIEWS } from './Reducer';
import './game-stage.css';

export default function GameStage(props) {
  const {
    stage: {
      state: { showLoader, stageView },
      setGameStageView,
    },
    control: {
      state: { gameStart },
      beginGame,
    },
  } = useGame();

  useEffect(() => {
    if (gameStart) {
      setGameStageView(GAME_STAGE_VIEWS.c3po);
    }
  }, [gameStart]);

  return (
    <div className="game-stage">
      {showLoader && <StarWarsLoader />}
      <AnimatePresence>
        {stageView == 'startScreen' && (
          <GameStartScreen
            onPressGameStart={() => {
              beginGame();
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {stageView == 'c3po' && (
          <C3POProvider>
            <C3PO></C3PO>
          </C3POProvider>
        )}
      </AnimatePresence>

      {props.children}
    </div>
  );
}
