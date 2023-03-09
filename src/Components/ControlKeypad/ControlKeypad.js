import React from 'react';
import Char from './Char/Char';
import { characterToBinaryDict } from './binaryDict';
import { useKeypad } from './useKeypad';
import { useGameControl } from '../GameControl/hooks/useGameControl';
import './control-keypad.css';

export default function ControlKeypad(props) {
  const { setControlStripComponent } = useGameControl();

  const { charGroup, disabled, handlePressChar, keypadRef } = useKeypad({
    ...props,
    setControlStripComponent,
  });

  return (
    <div
      ref={keypadRef}
      className={`
    control-keypad-container
    ${disabled ? 'keypad-disabled' : ''}
    `}
      style={{ opacity: 0 }}
    >
      {Object.entries(characterToBinaryDict[charGroup]).map((entry, index) => {
        const [char, binary] = entry;
        return (
          <React.Fragment key={binary}>
            <Char
              onClick={handlePressChar}
              char={char}
              binary={binary}
              disabled={props.disabledKeys?.[char]}
            />
            {char == 'd' && <div className="break"></div>}
          </React.Fragment>
        );
      })}
    </div>
  );
}
