import React, { useState } from 'react';
import SelectButton from '../../UI/Buttons/SelectButton';
import './char.scss';

const Char = ({ onClick, char, binary, disabled = false }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = (event) => {
    if (onClick instanceof Function) {
      onClick(char, binary);
    }
    setSelected(true);
  };
  return (
    <SelectButton
      onClick={handleClick}
      key={binary}
      className="control-keypad-char"
      disabled={disabled}
    >
      {char == ' ' ? 'space' : char}
      {/* <h4 className="byte">{binary}</h4> */}
    </SelectButton>
  );
};

export default Char;
