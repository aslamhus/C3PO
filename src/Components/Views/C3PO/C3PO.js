import React, { useState, useRef, useContext, useEffect } from 'react';
import c3po from '@images/C-3P0.png';
import SpeechBubble from '../../SpeechBubble/SpeechBubble';
import Body from './Body/Body';
import C3POAnimate from './C3POAnimate';
import TatooineFromSpace from '../TatooineFromSpace';
import tatooineDesert from '@images/backgrounds/tatooine.png';
import BinaryMessage from '../../Binary/BinaryMessage';
import gsap from 'gsap';
import { useC3PO } from './useC3PO';
import './c3po.css';

const C3PO = React.forwardRef((props, ref) => {
  const {
    state: {
      loaded,
      speech,
      c3poState,
      showSpeechBubble,
      showSpeechBubbleAnimationDuration,
      guessChar,
      showBinary,
    },
    startC3POGame,
    loadC3PO,
    toggleSpeechBubble,
    handleGuessAnimationStart,
    handleGuessAnimationComplete,
    getGameStage,
  } = useC3PO();

  const [speechBubblePositions, setSpeechBubblePositions] = useState({
    arrow: 'right',
    bubble: { left: '', right: '' },
  });
  const [showTatooineFromSpace, setShowTatooineFromSpace] = useState(false);
  const [showTatooineDesert, setShowTatooineDesert] = useState(false);
  const c3poRef = useRef();
  const c3poAnimateRef = useRef();
  const tatooineSpaceRef = useRef();

  /**
   * Get c3poRef, and dispatch loaded state
   *
   * @param {HTMLElement} el - the C3PO element
   */
  const getC3PORef = (el) => {
    if (loaded || !el) {
      return;
    }
    c3poRef.current = el;
    c3poAnimateRef.current = new C3POAnimate(c3poRef);
    loadC3PO({
      c3poRef,
      c3poAnimateRef,
    });
  };

  const setSpeechBubblePosition = (speechBubbleElement) => {
    const { current: c3po } = c3poAnimateRef;
    const bubbleBounds = speechBubbleElement.parentElement.getBoundingClientRect();
    const bodyBounds = c3po.body.getBoundingClientRect();
    const headBounds = c3po.bodyParts.head.head.getBoundingClientRect();
    const left = parseFloat(headBounds.x + headBounds.width / 3) + 'px';
    let top = parseFloat(bodyBounds.top - bubbleBounds.height);
    const constraintTop = 5;
    if (top < constraintTop) top = constraintTop;
    top = top + 'px';
    const gameStage = c3poRef.current.closest('.game-stage');
    const { width: stageWidth } = gameStage.getBoundingClientRect();
    let arrowPosition;
    if (headBounds.x < stageWidth / 2) {
      arrowPosition = 'left';
    }
    setSpeechBubblePositions({ arrow: arrowPosition, bubble: { left, top } });
  };

  const animateEntrance = async () => {
    return new Promise((resolve) => {
      const tl = gsap.timeline({ ease: false });
      const { current: space } = tatooineSpaceRef;
      let y = 0;
      let duration = 5;
      const gameStage = getGameStage();
      const img = space.querySelector('img');
      const bounds = img.getBoundingClientRect();
      console.log(`img height: ${bounds.height}, viewport height: ${window.innerHeight}`);
      if (bounds.height > window.innerHeight) {
        y = `${parseFloat(bounds.height - window.innerHeight) * -1}px`;
        duration += 5;
      }
      console.log('y', y);
      tl.set(gameStage, { backgroundColor: 'black' });
      tl.set(space, {
        y: '100%',
        opacity: 0,
      });

      tl.to(space, {
        y,
        opacity: 1,
        duration,
        onComplete: () => {
          resolve();
        },
      });
      tl.play();
    });
  };

  useEffect(() => {
    if (loaded) {
      console.log('startC3poGame', loaded);

      startC3POGame();
    }
  }, [loaded]);

  useEffect(() => {
    // animateEntrance().then(() => {
    //   setShowTatooineDesert(true);
    // });
  }, []);

  // const variants = {
  //   initial: {
  //     opacity: 0,
  //     y: '100%',
  //   },
  //   enter: {
  //     opacity: 1,
  //     y: '0',
  //     transition: { duration: 1 },
  //   },
  //   exit: {
  //     y: '-100%',
  //     opacity: 0,
  //     transition: { duration: 2 },
  //   },
  // };

  return (
    <>
      {showTatooineDesert && <TatooineFromSpace ref={tatooineSpaceRef} />}
      {!showTatooineDesert && (
        <div className="c3po-container" style={{ backgroundImage: `url(${tatooineDesert})` }}>
          <img src={c3po} className="c3po-reference"></img>
          <Body ref={getC3PORef} style={{ opacity: c3poState != 'hidden' ? 1 : 0 }}>
            <SpeechBubble
              show={showSpeechBubble}
              speech={speech}
              style={speechBubblePositions.bubble}
              arrowPosition={speechBubblePositions.arrow}
              onBeforeShowSpeechBubble={setSpeechBubblePosition}
              showAnimationDuration={showSpeechBubbleAnimationDuration}
              onShowSpeechBubble={() => toggleSpeechBubble(true)}
            />
          </Body>
        </div>
      )}
      <BinaryMessage
        show={showBinary}
        guessChar={guessChar}
        onGuessAnimationStart={handleGuessAnimationStart}
        onGuessAnimationComplete={handleGuessAnimationComplete}
      ></BinaryMessage>
    </>
  );
});
export default C3PO;
