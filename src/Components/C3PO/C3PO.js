import React, { useEffect, useState, useRef, useContext } from 'react';
import c3po from '../../../images/C-3P0.png';
import BinaryMessage from '../Binary/BinaryMessage';
import SpeechBubble from '../SpeechBubble/SpeechBubble';
import { GameStageContext } from '../GameStage/context';
import Body from './Body/Body';
import './c3po.css';
import C3POAnimate from './C3POAnimate';

const C3PO = React.forwardRef((props, ref) => {
  const [{ loaded, speech, c3poState }, dispatch] = useContext(GameStageContext);
  const c3poRef = useRef();
  const c3poAnimateRef = useRef();
  let loadTimeout;

  /**
   * Get c3poRef, and dispatch loaded state
   *
   * @param {HTMLElement} el - the C3PO element
   */
  const getC3PORef = (el) => {
    if (loaded || !el) {
      return;
    }
    if (loadTimeout) {
      clearTimeout(loadTimeout);
    }
    c3poRef.current = el;
    c3poAnimateRef.current = new C3POAnimate(c3poRef);
    setTimeout(() => {
      console.log('dispatch');
      dispatch({
        type: 'loaded',
        payload: {
          c3poRef: ref,
          c3poAnimateRef,
        },
      });
    }, 1000);
  };

  return (
    <>
      <div className="c3po-container">
        <img src={c3po} className="c3po-reference"></img>
        <Body ref={getC3PORef} style={{ opacity: c3poState != 'hidden' ? 1 : 0 }}>
          <SpeechBubble speech={speech} />
        </Body>
      </div>

      {/* <BinaryMessage /> */}
    </>
  );
});
export default C3PO;
