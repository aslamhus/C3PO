import React, { useEffect, useState, useRef } from 'react';
import { useGameStage } from '../GameStage/hooks/useGameStage';
import { GAME_STAGE_EVENTS } from '../GameStage/events';
import { reduceConstraintPositions } from './utils';
import { constraints } from '../GameStage/constraints';
import gsap from 'gsap';
import _debounce from 'lodash/debounce';
import * as textFit from '../../utils/textFit.min.js';
import './speech-bubble.css';

let speechResolve;
export const SpeechBubble = React.memo(
  ({
    show,
    speech,
    anchor,
    offset = { x: 0, y: 0 },
    showAnimationDuration = 0.5,
    onBeforeShowSpeechBubble,
    onShowSpeechBubble,
  }) => {
    const [bubbleText, setBubbleText] = useState('');
    const [_show, setShow] = useState(false);
    const [arrowPosition, setArrowPosition] = useState({ left: '25%' });
    const [positions, _setPositions] = useState(null);
    const positionsRef = useRef(positions);
    const bubbleRef = useRef();

    const setPositions = (value) => {
      positionsRef.current = value;
      _setPositions(value);
    };

    const {
      doesElementBreakConstraints,
      getComputedConstraints,
      getPositionRelativeToGameStage,
      getGameStage,
    } = useGameStage();

    const findArrowPosition = () => {
      let arrowPosition;
      const {
        left: anchorLeft,
        width: anchorWidth,
        height,
      } = getPositionRelativeToGameStage(anchor);
      const constraintBounds = getComputedConstraints();
      const bubbleContainerBounds = getPositionRelativeToGameStage(bubbleRef.current.parentElement);
      let arrowLeft = anchorLeft + anchorWidth - bubbleContainerBounds.left;
      // let arrowLeftPercent = (arrowLeft / bubbleContainerBounds.width) * 100;
      if (anchorLeft + anchorWidth < constraintBounds.width / 2) {
        arrowPosition = { left: arrowLeft + 'px' };
      } else {
        // later, the arrow should flip and adjust from the right
        arrowPosition = { left: arrowLeft + 'px' };
      }

      return arrowPosition;
    };

    const setSpeechBubblePosition = () => {
      if (!anchor) return;
      const { left, bottom, width, height } = getPositionRelativeToGameStage(anchor);
      const gameStageBounds = getGameStage().getBoundingClientRect();
      const leftPx = left + width / 2 + offset.x;
      const leftPercent = (leftPx / gameStageBounds.width) * 100;
      const bottomPx = bottom + height / 2 + offset.y * -1;
      const bottomPercent = (bottomPx / gameStageBounds.height) * 100;
      setPositions({
        left: `${leftPercent}%`,
        bottom: `${bottomPercent}%`,
        top: 'unset',
        right: 'unset',
        width: 'unset',
        height: 'unset',
      });
    };

    /**
     * Apply constraints
     *
     * Check for broken constraints, then apply the constraint bounds
     * to speech bubble. i.e., broken constraint is 'right', apply
     * right value of game stage constraint to speech bubble right.
     * Unset the opposite constraint of speech bubble, i.e. for right,
     * left would be unset.
     */
    const applyConstraints = async () => {
      const breakConstraints = doesElementBreakConstraints(bubbleRef.current.parentElement);
      if (breakConstraints) {
        const { constraintsBroken, constraintBounds } = breakConstraints;
        const adjustedPosition = constraintsBroken.reduce((acc, constraint) => {
          acc[constraint] = `${constraintBounds[`${constraint}Percent`] * 100}%`;
          // calculate percent values
          const opposite = constraints[constraint].opposite;
          if (opposite != 'width' && opposite != 'height') {
            acc[opposite] = '';
          }
          return acc;
        }, {});
        // console.log('previous position', positionsRef);
        // console.log('apply constraints => adjusted pos', adjustedPosition);
        setPositions({ ...positionsRef?.current, ...adjustedPosition });
      }
    };

    const parseSpeech = (speech) => ({ __html: speech });

    const hideBubble = async () => {
      await gsap.to(bubbleRef.current, { scale: 0, opacity: 0, duration: 0.5 });
      setShow(false);
    };

    const showBubble = async () => {
      // set scale to 1 before applying onstraints so we can calculate actual size
      await gsap.set(bubbleRef.current, { scale: 1 });
      applyConstraints();
      computeFontSize();
      await gsap.set(bubbleRef.current, { scale: 0 });
      setShow(true);
      await gsap.to(bubbleRef.current, { opacity: 1, scale: 1, duration: showAnimationDuration });
      if (onShowSpeechBubble instanceof Function) {
        onShowSpeechBubble(bubbleRef?.current);
      }
    };

    const computeFontSize = () => textFit(bubbleRef.current.querySelector('.speech'));

    const handleResize = React.useCallback(
      _debounce(() => {
        applyConstraints();
        computeFontSize();
      }, 50),
      []
    );
    const prepareBubble = async () => {
      if (!bubbleRef.current) {
        throw new Error('Speech bubble has not rendered');
      }
      if (show) {
        await hideBubble();
      }
      // setting bubble text triggers the process showing the speech bubble
      setBubbleText(speech);
      setSpeechBubblePosition();
      if (onBeforeShowSpeechBubble instanceof Function) {
        onBeforeShowSpeechBubble(bubbleRef?.current);
      }
    };

    /**
     * 1. Receive new speech
     * - hide the bubble
     * - set the bubble text
     * - set the position based on anchor
     * - fire 'onBeforeShowSpeechBubble'
     */
    useEffect(() => {
      if (speech) {
        console.log(`------------- ${speech}`);
        prepareBubble();
      }
    }, [speech]);

    /**
     * 2. Whenever positions are set/adjusted,
     * set the arrow position.
     */
    useEffect(() => {
      if (positions) {
        setArrowPosition(findArrowPosition());
      }
    }, [positions]);

    /**
     * 2. Show the speech bubble
     * - speech bubble is now rendered
     * - apply constraints
     * - set the scale to 0
     * - animate entrance
     */
    useEffect(() => {
      if (bubbleText) {
        showBubble();
      }
    }, [bubbleText]);

    /**
     * If parent show state differs from internal show state
     */
    useEffect(() => {
      if (show != _show) {
        show ? showBubble() : hideBubble();
      }
    }, [show]);

    useEffect(() => {
      document.addEventListener(GAME_STAGE_EVENTS.updateconstraints, applyConstraints);
      window.addEventListener('resize', handleResize);

      return () => {
        document.removeEventListener('updateconstraints', applyConstraints);
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return (
      <div className="speech-bubble-container" style={{ ...positions }}>
        <div
          ref={bubbleRef}
          className="speech-bubble"
          style={{
            transform: 'scale(1)',
            visibility: _show ? 'visible' : 'hidden',
          }}
        >
          <div className="speech" dangerouslySetInnerHTML={parseSpeech(bubbleText)}></div>
          <div className="bubble-arrow" style={{ ...arrowPosition }}></div>
        </div>
      </div>
    );
  }
);

export default SpeechBubble;
