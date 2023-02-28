import React, { useState, useEffect } from 'react';
import { binaryToCharacter } from '../../Translator/binaryDict';
import './byte.css';

export const Byte = ({ src, id, binaryCode, guessBinary }) => {
  const [isDecoded, setIsDecoded] = useState(false);
  const [decodedChar, setDecodedChar] = useState('');

  console.log(binaryToCharacter[guessBinary]);

  useEffect(() => {
    if (guessBinary == binaryCode) {
      setIsDecoded(true);
      setDecodedChar(binaryToCharacter[guessBinary]);
    }
  }, [guessBinary]);

  return (
    <div id={id} className={isDecoded ? 'decoded' : 'encoded'}>
      {decodedChar ? decodedChar : <img src={src}></img>}
    </div>
  );
};

export default Byte;
