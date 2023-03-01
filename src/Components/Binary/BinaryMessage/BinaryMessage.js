import React, { useEffect, useRef } from 'react';
import images from './images';
import gsap from 'gsap';
import { getBinaryCodeFromImageURL } from './utils';
import Byte from '../Byte/Byte';
import './binary-message.css';

export default function BinaryMessage({ show, guessChar }) {
  const binaryRef = useRef();
  const columnCount = 4;

  const guessAnimation = () => {
    const elements = binaryRef.current.querySelectorAll('div');
    let delay = 0;
    let duration = 0.3;
    let countColumns = 1;
    let decodedCharsPerRow = 0;
    elements.forEach((el) => {
      if (el.classList.contains('decoded')) {
        decodedCharsPerRow++;
        if (decodedCharsPerRow >= 4) {
          console.log('div', el);
        }
        return;
      }
      const tl = gsap.timeline({ delay });
      const colors = ['#2bc016', '#26a96c', '#32936f'];
      // reverse array without repeating last color.
      colors.push(...[...colors].reverse().slice(1), 'transparent');
      colors.forEach((color) => tl.to(el, { backgroundColor: color, duration }));

      tl.play();
      delay += 0.01;
      countColumns++;
      if (countColumns > 4) {
        countColumns = 1;
        decodedCharsPerRow = 0;
      }
    });
  };

  /**
   * Animate entrance of Translator
   */
  useEffect(() => {
    if (show) {
      gsap.fromTo(binaryRef.current, { opacity: 0, y: '+50%' }, { opacity: 1, y: 0, duration: 1 });
    }
  }, [show]);

  /**
   * Guess a character
   */
  useEffect(() => {
    if (guessChar) {
      guessAnimation();
      const [char, binary] = guessChar;
      /**
       *
       * let delay = 0.5;
       * for (bytes of binaryMessage){
       *    animate(decode,{delay : 0.5})
       *  }
       */
      console.log('check for ', char, binary);
    }
  }, [guessChar]);

  return (
    <div ref={binaryRef} className="binary-message" style={{ opacity: 0 }}>
      {images.map((url, index) => {
        const binaryCode = getBinaryCodeFromImageURL(url);

        return (
          <React.Fragment key={`binary-message-img-${url}`}>
            <Byte
              src={url}
              id={`binary-message-${index}`}
              binaryCode={binaryCode}
              guessBinary={guessChar?.[1]}
            />
            {index > 1 && (index + 1) % columnCount == 0 && (
              <div style={{ flexBasis: '100%', height: 0, width: 0 }}></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
