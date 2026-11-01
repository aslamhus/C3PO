import React, { useState, useEffect, useRef } from "react";
import {
  binaryToCharacter,
  characterToBinaryDict,
} from "../../ControlKeypad/binaryDict";
import { getTimeline, animateDecode } from "./animations";
import "./byte.css";
import classNames from "classnames";

export const Byte = React.forwardRef((props, ref) => {
  const {
    id,
    index,
    char,
    colors = ["#55e142", "#02914e", "#c3ff4c"],
    binaryCode,
    guessBinary,
    animationDelay = 0,
    onAnimationComplete,
    onBuildAnimationTimeline,
    onRemoveAnimationTimeline,
    onDecoded,
    decoded,
    wordFound = false,
    animationSpeed,
  } = props;

  const byteRef = useRef();
  const [isDecoded, setIsDecoded] = useState(decoded);
  const [decodedChar, setDecodedChar] = useState(
    decoded ? binaryToCharacter[guessBinary] : "",
  );
  const [animationComplete, setAnimationComplete] = useState(false);
  const [timeline, _setTimeline] = useState(null);
  const timelineRef = useRef(null);
  const setTimeline = (value) => {
    _setTimeline(value);
    timelineRef.current = value;
  };

  const byteClassNames = classNames(`byte`, {
    decoded: isDecoded || wordFound,
    "word-found": wordFound,
  });

  const buildAnimation = () => {
    const timeline = getTimeline(byteRef, colors, {
      duration: 0.3 * animationSpeed,
      delay: 0,
    });
    setTimeline(timeline);

    if (onBuildAnimationTimeline instanceof Function) {
      onBuildAnimationTimeline(id, timeline, char);
    }
  };

  const handleDecode = () => {
    if (!guessBinary || !binaryCode) return;
    if (guessBinary == binaryCode) {
      // success animation
      setDecodedChar(binaryToCharacter[guessBinary]);
      setIsDecoded(true);
      if (onDecoded instanceof Function) {
        onDecoded({ char, binaryCode, id });
      }
      return true;
    }
    return false;
  };

  const handleAnimationComplete = () => {
    const didDecode = handleDecode();
    setAnimationComplete(false);
    if (onAnimationComplete instanceof Function) {
      onAnimationComplete(id, binaryCode, didDecode);
    }
  };

  /**
   * When user guesses a binary code,
   * the guess animation begins. When it completes,
   * we check if the guess was correct in the handleDecode method.
   */
  useEffect(() => {
    if (guessBinary && !isDecoded) {
      setTimeout(() => {
        if (timeline) {
          timeline.eventCallback("onComplete", () =>
            setAnimationComplete(true),
          );
        }
      }, animationDelay * 1000);
    }
  }, [guessBinary]);

  useEffect(() => {
    if (animationComplete) {
      handleAnimationComplete();
    }
  }, [animationComplete]);

  useEffect(() => {
    if (isDecoded) return;
    buildAnimation();
  }, []);

  useEffect(() => {
    return () => {
      onRemoveAnimationTimeline(id, char, index);
    };
  }, [id]);
  return (
    <div
      id={id}
      ref={byteRef}
      className={byteClassNames}
      data-char={char}
      data-binary-code={binaryCode}
    >
      {isDecoded && !wordFound && (
        <p className="letter-found">{decodedChar ?? "??"}</p>
      )}
      {!isDecoded && !wordFound && <div>{binaryCode}</div>}
      {wordFound && <p className="word-found">{char}</p>}
    </div>
  );
});

export default Byte;
