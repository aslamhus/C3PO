import React, { useState, useEffect, useRef } from "react";
import {
  binaryToCharacter,
  characterToBinaryDict,
} from "../../ControlKeypad/binaryDict";
import { getTimeline, animateDecode } from "./animations";
import "./byte.css";
import classNames from "classnames";
import gsap from "gsap";

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

  const buildGuessAnimation = () => {
    const timeline = getTimeline(byteRef, colors, {
      duration: 0.3 * animationSpeed,
      delay: 0,
    });
    setTimeline(timeline);

    if (onBuildAnimationTimeline instanceof Function) {
      onBuildAnimationTimeline(id, timeline, char);
    }
  };

  const removeGuessAnimation = () => onRemoveAnimationTimeline(id, char, index);

  const startDecodeSuccessAnimation = () => {
    const tl = gsap.timeline({
      paused: true,
      yoyo: 1,
    });
    tl.add(gsap.set(byteRef.current, { background: "red", color: "black" }, 0));
    tl.add(gsap.to(byteRef.current, { scale: 2, duration: 0.25 }));
    tl.add(
      gsap.to(byteRef.current, {
        scale: 1,
        duration: 0.25,
        background: "inherit",
      }),
    );
    tl.timeScale(1.2);
    tl.play();
  };
  const handleDecode = () => {
    // if (!guessBinary || !binaryCode) return;
    if (guessBinary == binaryCode) {
      // success animation
      startDecodeSuccessAnimation();
      setDecodedChar(char);
      setIsDecoded(true);

      if (onDecoded instanceof Function) {
        onDecoded({ char, binaryCode, id });
      }
      return true;
    }
    return false;
  };

  const startWordFoundAnimation = () => {
    return;
    const tl = gsap.timeline({
      paused: true,
      yoyo: 1,
    });
    tl.add(
      gsap.set(byteRef.current, { background: "green", color: "black" }, 0),
    );
    tl.add(
      gsap.to(byteRef.current, {
        scale: 1,
        border: "2px solid green",
        duration: 0.25,
      }),
    );
    tl.add(
      gsap.to(byteRef.current, {
        scale: 1,
        duration: 0.25,
        background: "inherit",
      }),
    );
    tl.timeScale(1.2);
    tl.play();
  };

  const handleGuessAnimationComplete = () => {
    const didDecode = handleDecode();
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
          timeline.eventCallback("onComplete", handleGuessAnimationComplete);
        }
      }, animationDelay * 1000);
    }
  }, [guessBinary]);

  useEffect(() => {
    if (decoded) {
      removeGuessAnimation();
    }
  }, [decoded]);

  useEffect(() => {
    if (wordFound) {
      startWordFoundAnimation();
    }
  }, [wordFound]);

  useEffect(() => {
    if (isDecoded) return;
    buildGuessAnimation();
    return () => {
      removeGuessAnimation();
    };
  }, []);

  return (
    <div
      id={id}
      ref={byteRef}
      className={byteClassNames}
      data-char={char}
      data-binary-code={binaryCode}
    >
      {isDecoded && !wordFound && (
        <p className="letter-found">{char ?? "??"}</p>
      )}
      {!isDecoded && !wordFound && <div>{binaryCode}</div>}
      {wordFound && <p className="word-found">{char}</p>}
    </div>
  );
});

export default Byte;
