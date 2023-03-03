import React, { useEffect } from 'react';

import Clock from './Clock/Clock';
import Radar from './Radar';
import ControlStripGroup from './ControlStripGroup';
import ViewScreen from './ViewScreen/ViewScreen';
import AskQuestion from './AskQuestion/AskQuestion';
import Translator from '../Translator/Translator';
import { useGame } from '../hooks/useGame';
import { useTranslator } from '../Translator/useTranslator';
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
  const { stage, control, beginGame } = useGame();

  const translator = useTranslator({
    setControlStripComponent: control.setControlStripComponent,
  });

  useEffect(() => {
    if (stage.state.loaded) {
      control.setControlStripComponent(<Clock />, 'secondary');
    }
  }, [stage.state.loaded]);

  useEffect(() => {
    console.log('gameStart?', control.state.gameStart);
    if (control.state.gameStart) {
      beginGame();
    }
  }, [control.state.gameStart]);

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
            {!control.state.showTranslator && <AskQuestion />}
            <Translator
              show={control.state.showTranslator}
              onLoad={translator.handleLoad}
              onPressChar={(char, binary) => {
                // stage.speak(`${char} is ${binary}... let's see!`);
                stage.guessChar(char, binary);
                translator.handlePressChar(char, binary);
              }}
              charGroup={translator.charGroup}
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
