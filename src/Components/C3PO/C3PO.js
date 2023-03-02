import React, { useState, useRef, useContext } from 'react';
import c3po from '../../../images/C-3P0.png';
import SpeechBubble from '../SpeechBubble/SpeechBubble';
import { GameStageContext } from '../GameStage/context';
import Body from './Body/Body';
import C3POAnimate from './C3POAnimate';
import './c3po.css';
import { GAME_STAGE_ACTIONS } from '../GameStage/Reducer';

const C3PO = React.forwardRef((props, ref) => {
  const [
    { loaded, speech, c3poState, showSpeechBubble, showSpeechBubbleAnimationDuration },
    dispatch,
  ] = useContext(GameStageContext);

  const [speechBubblePositions, setSpeechBubblePositions] = useState({
    arrow: 'right',
    bubble: { left: '', right: '' },
  });
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
      dispatch({
        type: GAME_STAGE_ACTIONS.loaded,
        payload: {
          c3poRef: c3poRef,
          c3poAnimateRef,
        },
      });
    }, 0);
  };

  const setSpeechBubblePosition = (speechBubbleElement) => {
    //

    const { current: c3po } = c3poAnimateRef;
    const bubbleBounds = speechBubbleElement.parentElement.getBoundingClientRect();
    const bodyBounds = c3po.body.getBoundingClientRect();
    const headBounds = c3po.bodyParts.head.head.getBoundingClientRect();
    const left = parseFloat(headBounds.x + headBounds.width / 3) + 'px';
    let top = parseFloat(bodyBounds.top - bubbleBounds.height);
    const constraintTop = 5;
    if (top < constraintTop) top = constraintTop;
    top = top + 'px';
    // console.log(
    //   `headBounds.y ${bodyBounds.y} headBounds.top ${bodyBounds.top} - bubbleBounds.height ${bubbleBounds.height}`
    // );
    // console.log('set speech bubble position', top);

    // add window event listenner to apply same computations on resize
    // move  speech arrow
    const gameStage = c3poRef.current.closest('.game-stage');
    const { width: stageWidth } = gameStage.getBoundingClientRect();
    let arrowPosition;
    if (headBounds.x < stageWidth / 2) {
      arrowPosition = 'left';
    }
    setSpeechBubblePositions({ arrow: arrowPosition, bubble: { left, top } });
  };

  return (
    <>
      <div className="c3po-container">
        <img src={c3po} className="c3po-reference"></img>
        <Body ref={getC3PORef} style={{ opacity: c3poState != 'hidden' ? 1 : 0 }}>
          <SpeechBubble
            show={showSpeechBubble}
            speech={speech}
            style={speechBubblePositions.bubble}
            arrowPosition={speechBubblePositions.arrow}
            onBeforeShowSpeechBubble={setSpeechBubblePosition}
            showAnimationDuration={showSpeechBubbleAnimationDuration}
            onShowSpeechBubble={() => dispatch({ type: GAME_STAGE_ACTIONS.showSpeechBubble })}
          />
        </Body>
      </div>

      {/* <BinaryMessage /> */}
    </>
  );
});
export default C3PO;
