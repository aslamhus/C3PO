import React, { useEffect } from 'react';
import Radar from './Radar';
import ControlStripGroup from './ControlStripGroup';
import ViewScreen from './ViewScreen/ViewScreen';
import AskQuestion from './AskQuestion/AskQuestion';
import Translator from '../Translator/Translator';
import Clock from './Clock/Clock';
import { useGameControl } from './hooks/useGameControl';
import { useGameStage } from '../GameStage/hooks/useGameStage';
import * as actions from './actions';
import './game-control.css';

export default function GameControl({ children }) {
  const {
    gameStageState: { loaded, c3poAnimateRef, c3poRef },
    speak,
    dismissSpeechBubble,
    showC3PO,
    dispatch,
    getGameStage,
    showBinary,
  } = useGameStage();

  const { gameState, askQuestion, toggleViewScreen, toggleControls, toggleTranslator } =
    useGameControl({ speak });

  const testActions = async (c3po) => {
    showC3PO();
    dispatch({ type: 'showBinary', payload: true });
    toggleControls(true);
  };

  const beginGame = async () => {
    const { current: c3po } = c3poAnimateRef;
    testActions(c3po);
    return;
    await actions.exitStageLeft(c3po);
    showC3PO();
    await actions.peekAbooEntrance(c3po, speak);
    const identityConfirmed = await actions.questionIdentity(
      c3po,
      toggleControls,
      speak,
      askQuestion,
      dismissSpeechBubble
    );
    if (identityConfirmed) {
      await speak('Thank goodness!');
      await actions.wait(2);
      await dismissSpeechBubble();
      await actions.wait(1);
      await actions.startGameInstruction(c3po, getGameStage(), speak, askQuestion, showBinary);
      toggleTranslator(true);
      // showTranslator();
    } else {
      // end game.
    }
  };

  useEffect(() => {
    if (loaded) {
      /**
       * PRELOAD - Start button
       * 1) c3po sould enter
       * 2) wave
       * 3) ask question
       * 4) controls enter
       * 5) answer's question
       * 6) c3po explains message to translate while binary message appears
       * "I have a message for you from Aslam chacha! But I need your help to decode it. It's encrypted in binary computer language. Will you help me?"
       * ... yes... no
       * "Oh, splendid! Let's get started."
       * 7) binary message appears
       * "Here's the message"
       * 7a) translator/alphabet appears in controls
       * "Try selecting a letter"
       * 8) c3po animation when answer is wrong
       * 9) c3po aniation when answer is correct
       * 10) c3po animation when complete!
       * 11) c3po animation when fail.
       * 12) c3po animation, try again?
       *
       *   */
      beginGame();
    }
  }, [loaded]);

  return (
    <div className="game-control-flex-wrap">
      <div className={`game-control-container${gameState?.controls ? ' show' : ' hide'}`}>
        <div className="game-control-edge"></div>
        <div className="game-control">
          <div className="control-row">
            <ControlStripGroup className="shadow">
              <p>Binary 0101000</p>
            </ControlStripGroup>
            <Radar className="shadow" />
          </div>
          <ViewScreen on={gameState.viewScreen}>
            <AskQuestion />
            <Translator show={gameState.showTranslator} />
            {children}
          </ViewScreen>
          <div className="control-row">
            <Radar className="shadow" />
            <ControlStripGroup className="shadow">
              <Clock />
            </ControlStripGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
