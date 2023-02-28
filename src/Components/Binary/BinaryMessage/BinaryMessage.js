import React, { useEffect, useRef } from 'react';
import images from './images';
import gsap from 'gsap';
import { getBinaryCodeFromImageURL } from './utils';
import Byte from '../Byte/Byte';
import './binary-message.css';

export default function BinaryMessage({ show, guessLetter }) {
  const binaryRef = useRef();

  /**
   * Animate entrance of Translator
   */
  useEffect(() => {
    if (show) {
      gsap.fromTo(binaryRef.current, { opacity: 0, y: '+50%' }, { opacity: 1, y: 0, duration: 1 });
    }
  }, [show]);

  /**
   * Guess a letter
   */
  useEffect(() => {
    if (guessLetter) {
      const [letter, binary] = guessLetter;
      console.log('check for ', letter, binary);
    }
  }, [guessLetter]);

  return (
    <div ref={binaryRef} className="binary-message" style={{ opacity: 0 }}>
      {images.map((url, index) => {
        const binaryCode = getBinaryCodeFromImageURL(url);

        return (
          <Byte
            key={`binary-message-img-${url}`}
            src={url}
            id={`binary-message-${index}`}
            binaryCode={binaryCode}
            guessBinary={guessLetter?.[1]}
          />
        );
      })}
    </div>
  );
}
