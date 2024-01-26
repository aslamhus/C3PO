import React, { useEffect, useState, useRef } from 'react';
import { useGameStage } from '../GameStage/hooks/useGameStage';
import { GAME_STAGE_EVENTS } from '../GameStage/events';
import { constraints } from '../GameStage/constraints';
import gsap from 'gsap';
import _debounce from 'lodash/debounce';
import * as textFit from '../../utils/textFit.min.js';
import { SpeechBubbleContext } from './context/context.js';
import { actions } from './context/Reducer.js';

export const useSpeechBubble = ({
  // show: initialShow, // initial show state

  anchor = null,
  offset = { x: 0, y: 0 },
  showAnimationDuration = 0.5,
  enableTapToContinue = true,
  onTypingStart = null,
  onTypingComplete = null,
  onBeforeShowSpeechBubble = null,
  onShowSpeechBubble = null,
}) => {
  const context = React.useContext(SpeechBubbleContext);
  const [
    { speech, bubbleText, show, showTapToContinue, isPrepared, arrowPosition, positions },
    dispatch,
  ] = context;

  const positionsRef = useRef(positions);
  const bubbleRef = useRef();

  const setShow = (value) => {
    dispatch({ type: actions.show, payload: value });
  };
  // const setShowTapToContinue = (value) => {
  //   console.log('useSpeechBubble setShowTapToContinue', value);
  //   dispatch({ type: actions.showTapToContinue, payload: value });
  // };

  /**
   * Bubble text is the internal state of the received speech.
   * It is set when speech is received.
   *
   * @param {*} value
   */
  const setBubbleText = (value) => {
    dispatch({ type: actions.setBubbleText, payload: value });
  };

  const setIsPrepared = (value) => dispatch({ type: actions.setIsPrepared, payload: value });

  const setArrowPosition = (value) => dispatch({ type: actions.setArrowPosition, payload: value });

  const setPositions = (value) => {
    positionsRef.current = value;
    dispatch({ type: actions.setPositions, payload: value });
  };

  const {
    doesElementBreakConstraints,
    getComputedConstraints,
    getPositionRelativeToGameStage,
    getGameStage,
  } = useGameStage();

  const findArrowPosition = () => {
    let arrowPosition;
    const { left: anchorLeft, width: anchorWidth, height } = getPositionRelativeToGameStage(anchor);
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
   *
   * @returns {Boolean} - whether constraints pass or not
   */
  const applyConstraints = () => {
    if (!bubbleRef.current) {
      throw new Error('failed to apply constraint, could not find bubble ref');
      return;
    }
    const breakConstraints = doesElementBreakConstraints(bubbleRef.current.parentElement);
    if (breakConstraints) {
      const { constraintsBroken, constraintBounds } = breakConstraints;
      console.error('broken constraints', constraintsBroken);
      const adjustedPosition = constraintsBroken.reduce((acc, constraint) => {
        if (constraint != 'width' && constraint != 'height') {
          acc[constraint] = `${constraintBounds[`${constraint}Percent`] * 100}%`;
          // calculate percent values
          const opposite = constraints[constraint].opposite;
          acc[opposite] = '';
        } else {
          // do something
        }
        return acc;
      }, {});

      setPositions({ ...positionsRef?.current, ...adjustedPosition });
      return false;
    }
    return true;
  };

  const parseSpeech = (speech) => ({ __html: speech });

  const hideBubble = async () => {
    await gsap.to(bubbleRef.current, { scale: 0, opacity: 0, duration: showAnimationDuration });
    setShow(false);
  };

  const showBubble = async () => {
    computeFontSize();
    await gsap.set(bubbleRef.current, { scale: 0 });
    // setting show to true will begin typing
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
    // setShowTapToContinue(false);
    setIsPrepared(false);
    // if bubble is already showing, hide it
    if (show) {
      // console.log('hiding bubble');
      await hideBubble();
    }
    // setting bubble text triggers the process showing the speech bubble
    setBubbleText(speech);
    setSpeechBubblePosition();
    if (onBeforeShowSpeechBubble instanceof Function) {
      onBeforeShowSpeechBubble(bubbleRef?.current);
    }
  };

  const checkConstraints = async () => {
    // set scale to 1 before applying onstraints so we can calculate actual size
    await gsap.set(bubbleRef.current, { scale: 1 });
    return applyConstraints();
  };

  const handleTypingStart = () => {
    // setIsSpeaking(true);
    if (onTypingStart instanceof Function) {
      // console.log('onTypingStart');
      onTypingStart();
    }
  };

  const handleTypingComplete = () => {
    // setIsSpeaking(false);
    if (onTypingComplete instanceof Function) {
      // console.log('onTypingComplete');
      onTypingComplete();
    }
    // if (enableTapToContinue) {
    //   setTimeout(() => {
    //     setShowTapToContinue(true);
    //   }, 200);
    // }
  };

  /**
   * 1. Receive new speech
   * - hide the bubble
   * - set is prepared to false
   * - set the bubble text
   * - set the position based on anchor
   * - fire 'onBeforeShowSpeechBubble'
   */
  useEffect(() => {
    if (!speech) return;
    // console.log('1. Receive new speech', speech);
    speech && prepareBubble();
  }, [speech]);

  /**
   * 2. Whenever positions are set/adjusted,
   * set the arrow position and check constraints. If constraints pass
   * set is prepared to true. This will be first triggered
   * by 'prepareBubble'. But if constraints are broken by
   * the position set in prepareBubble, we may need to set
   * the positions again, at which we will checkConstraintsAndArrowPosition
   */
  useEffect(() => {
    if (positions) {
      // console.log('2. Adjust positions');
      setArrowPosition(findArrowPosition());
      checkConstraints().then((pass) => {
        if (pass) setIsPrepared(true);
      });
    }
  }, [positions]);

  /**
   * 3. Show the speech bubble
   * - speech bubble is now rendered
   * - apply constraints
   * - set the scale to 0
   * - animate entrance
   */
  useEffect(() => {
    if (isPrepared) {
      // console.log('3. isPrepared - show the speech bubble');
      showBubble();
    }
  }, [isPrepared]);

  useEffect(() => {
    document.addEventListener(GAME_STAGE_EVENTS.updateconstraints, applyConstraints);
    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('updateconstraints', applyConstraints);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    bubbleRef,
    bubbleText,
    show,
    showTapToContinue,
    positions,
    arrowPosition,
    parseSpeech,
    handleTypingStart,
    handleTypingComplete,
  };
};
