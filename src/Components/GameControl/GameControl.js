import React, { useEffect } from 'react';

import Clock from './Clock/Clock';
import Radar from './Radar';
import ControlStripGroup from './ControlStripGroup';
import ViewScreen from './ViewScreen/ViewScreen';
import AskQuestion from './AskQuestion/AskQuestion';
import ControlKeypad from '../ControlKeypad/ControlKeypad';
import { useGame } from '../hooks/useGame';
import { useKeypad } from '../ControlKeypad/useKeypad';
import './game-control.css';

/**
 *
 * GameControl
 *
 * @component
 */
export default function GameControl({ children }) {
  const { stage, control } = useGame();

  const keypad = useKeypad({
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
            {!control.state.showKeypad && <AskQuestion />}
            <ControlKeypad
              disabled={control.state.keypadDisabled}
              show={control.state.showKeypad}
              onLoad={keypad.handleLoad}
              disabledKeys={control.state?.disabledKeys}
              onPressChar={(char, binary) => {
                /**
                 * Any component can set the pressChar handler
                 * using the game control context when using the method
                 * toggleKeypad. See useGameControl.
                 *
                 * For instance, when you call toggleControls
                 * you can specify the onPressChar method:
                 *
                 * control.toggleKeypad(true, { onPressChar: myFunc });
                 *
                 * Eventually this should be handled by ControlKeypad's context.
                 */
                const {
                  state: { onPressChar },
                } = control;
                if (onPressChar instanceof Function) {
                  onPressChar(char, binary);
                }
                control.onPressChar;
                keypad.handlePressChar(char, binary);
              }}
              charGroup={keypad.charGroup}
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
