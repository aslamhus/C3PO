import React, { useState, useEffect, useRef } from 'react';
import { binaryToCharacter, characterToBinaryDict } from '../../Translator/binaryDict';
import gsap from 'gsap';
import './byte.css';

export const Byte = React.forwardRef((props, ref) => {
  const { src, id, binaryCode, guessBinary } = props;
  // console.log(
  //   Object.keys(characterToBinaryDict).reduce((acc, value) => {
  //     if (characterToBinaryDict[value] instanceof Object) {
  //       Object.entries(characterToBinaryDict[value]).forEach((entry) => {
  //         const [letter, binary] = entry;
  //         acc[binary] = letter;
  //       });
  //     }
  //     return acc;
  //   }, {})
  // );
  const [isDecoded, setIsDecoded] = useState(false);
  const [decodedChar, setDecodedChar] = useState('');

  const handleDecode = async () => {
    setDecodedChar(binaryToCharacter[guessBinary]);
    // const bounds = ref.current.getBoundingClientRect();
    // await gsap.fromTo(
    //   ref.current,
    //   {
    //     width: `${bounds.width}px`,
    //   },
    //   {
    //     // width: '10px',
    //     duration: 0.5,
    //     delay: 0.5,
    //     onStart: () => {
    //       ref.current.className = 'decoded';
    //     },
    //   }
    // );
    setIsDecoded(true);
  };

  console.log(binaryToCharacter[guessBinary]);

  useEffect(() => {
    if (guessBinary == binaryCode) {
      // success animation

      handleDecode(guessBinary);
    }
  }, [guessBinary]);

  return (
    <div id={id} ref={ref} className={isDecoded ? 'decoded' : ''}>
      {decodedChar ? <p>{decodedChar}</p> : <img src={src}></img>}
    </div>
  );
});

export default Byte;
