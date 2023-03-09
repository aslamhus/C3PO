import React, { useEffect, useRef } from 'react';
import StarWarsLoader from '../StarWarsLoader/StarWarsLoader';
import GameStartScreen from '../Views/GameStartScreen/GameStartScreen';
import C3POProvider from '../Views/C3PO/context/C3POProvider';
import C3PO from '../Views/C3PO';
import { AnimatePresence } from 'framer-motion';
import { useGame } from '../hooks/useGame';
import { GAME_STAGE_VIEWS } from './Reducer';
import { GAME_STAGE_EVENTS } from './events';
import './game-stage.css';
// import TipModal from '../UI/Modals/TipModal';

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
      loadGameStage,
      setGameStageView,
    },
    control: {
      state: { gameStart },
      beginGame,
    },
  } = useGame();

  const ref = useRef();

  const assignPixelFormat = (value) => (isNaN(value) ? value : `${value}px`);

  const applyConstraints = () => {
    const { x, y } = constraints;
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
    return constraintValues;
  };

  useEffect(() => {
    if (gameStart) {
      setGameStageView(GAME_STAGE_VIEWS.c3po);
    }
  }, [gameStart]);

  useEffect(() => {
    loadGameStage(ref);
  }, []);

  /**
   * Fire event, 'updateconstraints'
   * This fires after the render.
   * To access the constraints before the render,
   * see useGameStage 'beforeupdateconstraints'
   */
  useEffect(() => {
    document.dispatchEvent(
      new CustomEvent(GAME_STAGE_EVENTS.updateconstraints, { detail: constraints })
    );
  }, [constraints]);

  return (
    <div className="game-stage" ref={ref}>
      <div className="game-stage-constraints" style={applyConstraints(constraints)}></div>
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
