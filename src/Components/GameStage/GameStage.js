import React, { useEffect } from 'react';
import StarWarsLoader from '../StarWarsLoader/StarWarsLoader';
import GameStartScreen from '../Views/GameStartScreen/GameStartScreen';
import C3POProvider from '../Views/C3PO/context/C3POProvider';
import C3PO from '../Views/C3PO';
import { AnimatePresence } from 'framer-motion';
import { useGame } from '../hooks/useGame';
import { GAME_STAGE_VIEWS } from './Reducer';
import './game-stage.css';

/**
 * A note about GameStage bounds.
 *
 * GameStage's width is 100% of the app width.
 * However, when controls are active, the game stage constraints
 * are halved to account for the controls overlay.
 *
 *@component
 */
export default function GameStage(props) {
  const {
    stage: {
      state: { showLoader, stageView, constraints },
      setGameStageView,
    },
    control: {
      state: { gameStart },
      beginGame,
    },
  } = useGame();

  const assignPixelFormat = (value) => (isNaN(value) ? value : `${value}px`);

  const computeConstraints = () => {
    const { x, y } = constraints;
    console.log('constraints', constraints);
    // append "px" to value if no format present
    const leftConstraint = assignPixelFormat(x[0]);
    const rightConstraint = assignPixelFormat(x[1]);
    const topConstraint = assignPixelFormat(y[0]);
    const bottomConstraint = assignPixelFormat(y[1]);

    const constraintValues = {
      width: `calc(${rightConstraint} - ${leftConstraint})`,
      height: `calc(${bottomConstraint} - ${topConstraint})`,
      left: leftConstraint,
      top: topConstraint,
    };
    console.log('constraints', constraintValues);
    return constraintValues;
  };

  useEffect(() => {
    if (gameStart) {
      setGameStageView(GAME_STAGE_VIEWS.c3po);
    }
  }, [gameStart]);

  return (
    <div className="game-stage">
      <div className="game-stage-constraints" style={computeConstraints(constraints)} />
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
