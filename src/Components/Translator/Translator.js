import React, { useRef, useState, useEffect } from 'react';
import Char from './Char/Char';
import { characterToBinaryDict } from './binaryDict';
import gsap from 'gsap';
import './translator.css';

export default function Translator({ charGroup = 'lowercase', show, onPressChar, onLoad }) {
  const translatorRef = useRef();

  const handlePressChar = (char, binary) => {
    if (onPressChar instanceof Function) {
      onPressChar(char, binary);
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
      {Object.entries(characterToBinaryDict[charGroup]).map((entry, index) => {
        const [char, binary] = entry;
        return (
          <React.Fragment key={binary}>
            <Char onClick={handlePressChar} char={char} binary={binary} />
            {char == 'd' && <div className="break"></div>}
          </React.Fragment>
        );
      })}
    </div>
  );
}
