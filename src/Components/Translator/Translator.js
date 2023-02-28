import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { characterToBinaryDict } from './binaryDict';
import './translator.css';

export default function Translator({ letterCase = 'lowercase', show, onPressLetter, onLoad }) {
  const translatorRef = useRef();

  const handleClickLetter = (letter, binary) => {
    if (onPressLetter instanceof Function) {
      onPressLetter(letter, binary);
    }
  };

  const handleLoad = async () => {
    console.log('onLoad');
    await gsap.fromTo(
      translatorRef.current,
      { opacity: 0, y: '+50%' },
      { opacity: 1, y: 0, duration: 1 }
    );
    if (onLoad instanceof Function) {
      onLoad();
    }
  };

  useEffect(() => {
    if (show) handleLoad();
  }, [show]);

  return (
    <div ref={translatorRef} className="translator-container" style={{ opacity: 0 }}>
      {Object.entries(characterToBinaryDict[letterCase]).map((entry, index) => {
        const [letter, binary] = entry;
        return (
          <React.Fragment key={binary}>
            <Letter onClick={handleClickLetter} letter={letter} binary={binary}></Letter>
            {letter == 'd' && <div className="break"></div>}
          </React.Fragment>
        );
      })}
    </div>
  );
}

const Letter = ({ onClick, letter, binary }) => {
  return (
    <div onClick={() => onClick(letter, binary)} key={binary} className="binary">
      <h3 className="letter">{letter}</h3>
      <h4 className="byte">{binary}</h4>
    </div>
  );
};
