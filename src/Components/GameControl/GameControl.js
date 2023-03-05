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
import { GAME_STAGE_EVENTS } from '../GameStage/events';

/**
 *
 * GameControl
 *
 * @component
 */
export default function GameControl({ children }) {
  const { stage, control } = useGame();

  const translator = useTranslator({
    setControlStripComponent: control.setControlStripComponent,
  });

  useEffect(() => {
    if (stage.state.loaded) {
      control.setControlStripComponent(<Clock />, 'secondary');
    }
  }, [stage.state.loaded]);

  useEffect(() => {
    if (control.state?.controls) {
      // update constraints
      stage.setConstraints({ x: [0, '50%'], y: [0, '100%'] });
    } else {
      // reset constraints
      stage.setConstraints({ x: [0, '100%'], y: [0, '100%'] });
    }
  }, [control?.state?.controls]);

  useEffect(() => {
    document.addEventListener(GAME_STAGE_EVENTS.updateconstraints, (event) => {
      console.log('constraints updated', event);
    });
  }, []);

  return (
    <div className={`game-control-flex-wrap ${control.state?.controls ? ' show' : ' hide'}`}>
      <div className={`game-control-container`}>
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
                /**
                 * Any component can set the pressChar handler
                 * using the game control context when using the method
                 * toggleTranslator. See useGameControl.
                 *
                 * Eventually this should be Translator (renamed to Keypad's)
                 * context.
                 */
                const {
                  state: { onPressChar },
                } = control;
                if (onPressChar instanceof Function) {
                  onPressChar(char, binary);
                }
                control.onPressChar;
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
