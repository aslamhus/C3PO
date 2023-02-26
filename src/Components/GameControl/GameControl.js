import React, { useEffect } from 'react';
import Radar from './Radar';
import ControlStripGroup from './ControlStripGroup';
import ViewScreen from './ViewScreen/ViewScreen';
import AskQuestion from './AskQuestion/AskQuestion';
import Translator from '../Translator/Translator';
import { useGameControl } from './hooks/useGameControl';
import { useGameStage } from '../GameStage/hooks/useGameStage';
import * as actions from './actions';
import './game-control.css';

export default function GameControl({ children }) {
  const {
    gameStageState: { loaded, c3poAnimateRef },
    speak,
    showC3PO,
  } = useGameStage();

  const { gameState, askQuestion, toggleViewScreen, toggleControls } = useGameControl({ speak });

  // const handleResponse = (answer) => {
  //   c3poAnimateRef.current.wave();
  //   if (answer) {
  //     speak(`Thank goodness!`);
  //   } else {
  //     speak("Oh, I'm terribly sorry");
  //   }
  // };

  const beginGame = async () => {
    // speak('Oh, I say!');
    showC3PO();
    console.log('c3poAnimateRef', c3poAnimateRef);
    actions.peekAbooEntrance(c3poAnimateRef, speak);
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
            <ControlStripGroup className="shadow" />
            <Radar className="shadow" />
          </div>
          <ViewScreen on={gameState.viewScreen}>
            <AskQuestion />
            <Translator />
            {children}
          </ViewScreen>
          <div className="control-row">
            <Radar className="shadow" />
            <ControlStripGroup className="shadow" />
          </div>
        </div>
      </div>
    </div>
  );
}
