import React, { useEffect } from 'react';
import Radar from './Radar';
import ControlStripGroup from './ControlStripGroup';
import ViewScreen from './ViewScreen/ViewScreen';
import AskQuestion from './AskQuestion/AskQuestion';
import Translator from '../Translator/Translator';
import Clock from './Clock/Clock';
import { useGameControl } from './hooks/useGameControl';
import { useGameStage } from '../GameStage/hooks/useGameStage';
import { useTranslator } from '../Translator/useTranslator';
import * as actions from './actions';
import './game-control.css';

/**
 *
 * GameControl
 * The GameControl components handles the game logic.
 *
 * Stage
 * ------
 * Methods and state from the GameStage (where c3po is animated and
 * where he speaks) are represented by the object "stage", derived
 * from the useGameStage hook.
 *
 * Control
 * -------
 * Methods and state from the GameControl (which handles the game UI
 * i.e. the view screen) are represetned by the object "control"
 * derived from the useGameControl hook.
 *
 * Actions
 * -------
 * C3PO's movement and speech are controlled by the "actions"
 * object, which exports multiple action methods. Action
 * methods are dependent on both control and stage methods/states,
 * i.e. the C3PO Dom reference which is initialized in the stage context
 * must be passed as a parameter to all action methods.
 *
 * @component
 */
export default function GameControl({ children }) {
  const stage = useGameStage();
  const control = useGameControl({ speak: stage.speak });

  const testTranslator = async (c3po) => {
    stage.showC3PO();
    stage.showBinary();
    control.toggleTranslator(true);
    control.toggleControls(true);
  };

  const testAnimations = async (c3po) => {
    stage.showC3PO();
    /**
     * Note to self:
     * test both resting and celebrating
     */
    await c3po.rest(0);
    // c3po.walkToCenter(stage.getGameStage());
    c3po.celebrate();
    setTimeout(() => {
      // c3po.stop();
      c3po.fret();
    }, 1000);
  };
  const translator = useTranslator({
    setControlStripComponent: control.setControlStripComponent,
  });

  const beginGame = async () => {
    const { current: c3po } = stage.state.c3poAnimateRef;
    testAnimations(c3po);
    return;
    await actions.exitStageLeft(c3po);
    stage.showC3PO();
    await actions.peekAbooEntrance(c3po, stage.speak);
    const identityConfirmed = await actions.questionIdentity(
      c3po,
      control.toggleControls,
      stage.speak,
      control.askQuestion,
      stage.dismissSpeechBubble
    );
    if (identityConfirmed) {
      await stage.speak('Thank goodness!');
      await actions.wait(2);
      await stage.dismissSpeechBubble();
      await actions.wait(1);
      await actions.startGameInstruction(
        c3po,
        stage.getGameStage(),
        stage.speak,
        control.askQuestion,
        stage.showBinary
      );
      control.toggleTranslator(true);
      // showTranslator();
    } else {
      // end game.
    }
  };

  useEffect(() => {
    if (stage.state.loaded) {
      control.setControlStripComponent(<Clock />, 'secondary');
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
  }, [stage.state.loaded]);

  return (
    <div className="game-control-flex-wrap">
      <div className={`game-control-container${control.state?.controls ? ' show' : ' hide'}`}>
        <div className="game-control-edge"></div>
        <div className="game-control">
          <div className="control-row">
            <ControlStripGroup className="shadow">
              {control.state?.primaryControlStripComponent}
            </ControlStripGroup>
            <Radar className="shadow" />
          </div>
          <ViewScreen on={control.state.viewScreen}>
            <AskQuestion />
            <Translator
              onLoad={translator.handleLoad}
              onPressChar={(char, binary) => {
                // stage.speak(`${char} is ${binary}... let's see!`);
                stage.guessChar(char, binary);
                translator.handlePressChar(char, binary);
              }}
              charGroup={translator.charGroup}
              show={control.state.showTranslator}
            />
            {children}
          </ViewScreen>
          <div className="control-row">
            <Radar className="shadow" />
            <ControlStripGroup className="shadow">
              {control.state?.secondaryControlStripComponent}
            </ControlStripGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
