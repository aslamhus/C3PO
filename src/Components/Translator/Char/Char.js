import React, { useState } from 'react';
import SelectButton from '../../UI/Buttons/SelectButton';
import './char.css';

const Char = ({ onClick, char, binary }) => {
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
      className="translator-char"
      disabled={selected}
    >
      <h3 className="char">{char == ' ' ? 'space' : char}</h3>
      {/* <h4 className="byte">{binary}</h4> */}
    </SelectButton>
  );
};

export default Char;
