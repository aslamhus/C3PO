import React, { useState } from 'react';
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
    <button onClick={handleClick} key={binary} className="translator-char" disabled={selected}>
      <h3 className="char">{char == ' ' ? 'space' : char}</h3>
      {/* <h4 className="byte">{binary}</h4> */}
    </button>
  );
};

export default Char;
