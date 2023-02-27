import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import binaryDict from './binaryDict';
import './translator.css';
export default function Translator({ show }) {
  const [letterCase, setLetterCase] = useState('lowercase');
  const translatorRef = useRef();
  useEffect(() => {
    if (show) {
      gsap.fromTo(
        translatorRef.current,
        { opacity: 0, y: '+50%' },
        { opacity: 1, y: 0, duration: 1 }
      );
    }
  }, [show]);

  /**
   * Note: this should be handled by view screen control group
   * @param {Event} event
   */
  const handleToggleUppercase = (event) => {
    const {
      target: { value },
    } = event;

    setLetterCase(letterCase == 'uppercase' ? 'lowercase' : 'uppercase');
  };

  return (
    <div ref={translatorRef} className="translator-container" style={{ opacity: 1 }}>
      {Object.entries(binaryDict[letterCase]).map((entry, index) => {
        const [letter, binary] = entry;
        return (
          <>
            <div key={binary} className="binary">
              <h3 className="letter">{letter}</h3>
              <h4 className="byte">{binary}</h4>
            </div>
            {letter == 'd' && <div className="break"></div>}
          </>
        );
      })}
      {/* <button onClick={handleToggleUppercase}>AZ</button> */}
    </div>
  );
}

// const
