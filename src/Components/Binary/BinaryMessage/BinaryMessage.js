import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Byte from "../Byte/Byte";
import { useGameSound } from "../../hooks/useGameSound";
import { fx } from "../../hooks/useGameSound";
import { getByteDataFromMessage } from "./utils";
import "./binary-message.css";
import { useGameControl } from "../../GameControl/hooks/useGameControl";

const animationSpeed = 0.5;

export default function BinaryMessage({
  message,
  decoded = [false, true, false, true, true, true],
  show,
  onShow,
  guessChar,
  onGuessAnimationStart,
  onGuessAnimationComplete,
}) {
  const [byteData, setByteData] = useState([]);
  const binaryRef = useRef();
  const masterTimelineRef = useRef(
    gsap.timeline({
      paused: true,
      onComplete: handleGuessAnimationComplete,
      onStart: handleGuessAnimationStart,
    }),
  );
  const childTimelinesRef = useRef([]);
  const { cueSoundFx, cueMusic } = useGameSound();
  const control = useGameControl();

  /**
   * Guess
   *
   * setting guess state in child <Byte/> component
   * begins animations
   *
   * @param {string} binary - the binary code of the guess letter,
   * to match agains the byte
   * */
  const guess = (guessChar) => {
    const [char, binary] = guessChar;
    let delay = 0,
      delayIncrement = 0.05 * animationSpeed,
      guessWasCorrect = false,
      countCharsFound = 0;

    const { current: masterTl } = masterTimelineRef;
    // clear animation timeline
    masterTl.clear();
    setByteData((prev) => {
      let bits = prev.map((data, index) => {
        // if not decoded add to animation timeline

        if (data.binary == binary) {
          countCharsFound++;
          guessWasCorrect = true;
        }
        data.guess = binary;

        return data;
      });

      return bits;
    });
    childTimelinesRef.current.forEach(([childTl, id, char]) => {
      // console.log("play animation for", char, { timelinesChar: char });
      childTl.play();
      childTl.progress(0);
      masterTl.add(childTl, delay);
      delay += delayIncrement;
    });

    cueSoundFx(fx.binaryDecoder);
    masterTl.eventCallback("onStart", () =>
      handleGuessAnimationStart(guessWasCorrect, countCharsFound, char, binary),
    );

    masterTl.eventCallback("onComplete", () =>
      handleGuessAnimationComplete(
        guessWasCorrect,
        countCharsFound,
        char,
        binary,
      ),
    );
    masterTl.play(0);
  };

  const handleCharDecoded = ({ char, binaryCode, id }) => {
    setByteData((prev) => {
      return prev.map((data) => {
        if (data.binary == binaryCode) {
          data.decoded = true;
        }
        return data;
      });
    });
  };

  const connectFullWords = (byteData) => {
    const bits = [];
    let foundWord = false;
    byteData.forEach((bit, index) => {
      if (bit.char == " " || bit.char == "." || bit.char == "!") {
        // go backward until you hit another space or first char
        let prev = index - 1;
        let decoded = false;
        while (prev > -1 && byteData[prev].char != " ") {
          decoded = byteData[prev].decoded;
          if (!decoded) {
            break;
          }
          prev--;
        }
        if (decoded) {
          foundWord = true;
          const decodedWord = byteData.slice(prev + 1, index);
          const fullWord = decodedWord.map((d) => d.char).join(" ");
          bits.splice(decodedWord.length * -1);
          bits.push({
            wordFound: true,
            char: fullWord,
            decoded: true,
          });
        }
      }

      bits.push(bit);
    });
    if (foundWord) {
      // force all to rerender
      // setByteData([...bits.map((b) => ({ ...b, key: crypto.randomUUID() }))]);
      setByteData(bits);
    }
  };

  const handleGuessAnimationComplete = (wasCorrect, char, binary) => {
    if (onGuessAnimationComplete instanceof Function) {
      onGuessAnimationComplete(wasCorrect, char, binary);
    }
    if (!wasCorrect) {
      cueSoundFx(fx.error);
    }
    connectFullWords(byteData);
  };

  const handleGuessAnimationStart = () => {
    if (onGuessAnimationStart instanceof Function) {
      onGuessAnimationStart();
    }
  };

  const onChildAnimationComplete = (id, binary, didDecode) => {
    if (didDecode) {
      cueSoundFx(fx.success);
    }
  };

  const addByteAnimationToTimeline = (id, timeline, char) => {
    // console.log("add child timeline", id, char);
    childTimelinesRef.current.push([timeline, id, char]);
  };

  const removeByteAnimationTimeline = (id, char) => {
    childTimelinesRef.current = childTimelinesRef.current.filter(
      ([timeline, _id]) => {
        return _id != id;
      },
    );
    // console.log("----> new timeline", childTimelinesRef.current);
  };

  /**
   * Animate entrance of binary message
   */
  useEffect(() => {
    if (show) {
      gsap.fromTo(
        binaryRef.current,
        { opacity: 0, y: "+50%" },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          onComplete: () => {
            if (onShow instanceof Function) {
              onShow();
            }
          },
        },
      );
    }
  }, [show]);

  /**
   * Guess a character
   */
  useEffect(() => {
    if (guessChar) {
      guess(guessChar);
    }
  }, [guessChar]);

  useEffect(() => {
    const data = getByteDataFromMessage(message.toUpperCase(), decoded);
    const preDecodedChars = data
      .filter((bit) => bit.decoded)
      .map((bit) => bit.char);

    setByteData(data);
    if (preDecodedChars.length) {
      // control.disableKeys(preDecodedChars);
    }
  }, [message]);

  return (
    <div ref={binaryRef} className="binary-message" style={{ opacity: 0 }}>
      <div className="binary-message-scroll-container">
        {byteData.map((data, index) => {
          return (
            <React.Fragment
              key={`binary-message-img-${data?.binary}-${index}-${data.key ?? index}`}
            >
              <Byte
                // src={data.url}

                {...data}
                id={`binary-message-${index}`}
                index={index}
                binaryCode={data.binary}
                guessBinary={data.guess}
                char={data.char}
                wordFound={data?.wordFound}
                animationDelay={data.animationDelay}
                onAnimationComplete={onChildAnimationComplete}
                onBuildAnimationTimeline={addByteAnimationToTimeline}
                onRemoveAnimationTimeline={removeByteAnimationTimeline}
                onDecoded={handleCharDecoded}
                animationSpeed={animationSpeed}
              />
              {/* {index > 1 && (index + 1) % columnCount == 0 && (
              <div style={{ flexBasis: '100%', height: 0, width: 0 }}></div>
            )} */}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
