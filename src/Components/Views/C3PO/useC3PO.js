import React, { useContext, useRef, useEffect, useMemo } from "react";
import BinaryMessage from "../../Binary/BinaryMessage";
import EnergyBar from "../../UI/EnergyBar";
import ScoreCard from "../../UI/ScoreCard/ScoreCard";
import { C3POContext } from "./context/context";
import { C3PO_ACTIONS, C3POStates } from "./context/Reducer";
import { useTipModal } from "../../UI/Modals/TipModal/useTipModal";
import { getOppositeCase, hasChar } from "./utils";
import { useGameSound } from "../../hooks/useGameSound";

import {
  CONTROL_STRIP_TYPE,
  useGameControl,
} from "../../GameControl/hooks/useGameControl";
import { useAskQuestion } from "../../GameControl/AskQuestion/hooks/useAskQuestion";
import { useSpeak } from "../../SpeechBubble/useSpeak";
import useGamePlayer from "../../GamePlayer/hooks/useGamePlayer";
import classNames from "classnames";
import { getEnergyLevel } from "../../UI/EnergyBar/energy-levels";

const C3POFeeling = {
  ["near-death"]: (energy) => energy <= 0.1 && energy > 0,
  dazed: (energy) => energy <= 0.25 && energy > 0.1,
  faint: (energy) => energy > 0.25 && energy < 0.5,
  normal: (energy) => energy >= 0.5 && energy < 0.7,
  well: (energy) => energy >= 0.7 && energy < 0.9,
  excellent: (energy) => energy >= 0.9,
};

export const useC3PO = ({ stage }) => {
  const [state, dispatch] = useContext(C3POContext);
  const lastPhraseRef = useRef();

  const { player } = useGamePlayer();
  const { ask } = useAskQuestion();
  const {
    speak,
    dismissSpeechBubble,
    state: { isSpeaking, isTypingComplete },
  } = useSpeak(state.c3poAnimateRef);
  // game control
  const control = useGameControl();

  const energyLevelClassName = classNames(
    `energy-level-${getEnergyLevel(state.energy)}`,
  );

  const bodyClassNames = classNames({
    faint: C3POFeeling.faint(state.energy),
    dazed: C3POFeeling.dazed(state.energy),
    ["near-death"]: C3POFeeling["near-death"](state.energy),
    ["game-over"]: state.energy <= 0,
  });

  const askQuestion = async ({ question, responses }) => {
    // set the game stage constraints for the control pad
    stage.setConstraints({ x: [0, "50%"], y: [0, "100%"] });
    await speak(question, { tapToContinue: true });
    if (!control.state.controls) {
      control.toggleControls(true);
    }
    return ask({ question, responses });
  };
  // game sound
  const { cueSoundFx, cueMusic, music, fx, trackManagerRef, pauseMusic } =
    useGameSound();
  const isBinaryVisibleRef = useRef(false);

  const loadC3PO = (refs) => {
    dispatch({
      type: C3PO_ACTIONS.load,
      payload: {
        c3poRef: refs.c3poRef,
        c3poAnimateRef: refs.c3poAnimateRef,
      },
    });
  };

  const showC3PO = () =>
    dispatch({ type: C3PO_ACTIONS.updateC3poState, payload: C3POStates.SHOW });

  const toggleSpeechBubble = (bool) =>
    dispatch({ type: C3PO_ACTIONS.toggleSpeechBubble, payload: bool });
  /**
   * TO DO: this needs to set the custom view screen component instead,
   * or use a useEffect to check if showBinary is true
   */
  const showBinary = () => {
    isBinaryVisibleRef.current = false;
    return new Promise((resolve, reject) => {
      dispatch({ type: C3PO_ACTIONS.showBinary });
      resolve(true);
    });
  };

  const setIsBinaryVisible = (bool) => (isBinaryVisibleRef.current = bool);

  /**
   *
   * @param {Number|String} value - can be set to value, or incremented (+=10) or decremented (-=15)
   * @returns
   */
  const setEnergy = (value) =>
    dispatch({ type: C3PO_ACTIONS.setEnergy, payload: value });

  const guessChar = (char, binary) => {
    dispatch({ type: C3PO_ACTIONS.guessChar, payload: [char, binary] });
    // console.log("guessChar", char, binary);
    control.disableKeys([char]);
  };

  const handleGuessAnimationStart = () => {
    const { current: c3po } = state.c3poAnimateRef;

    control.disableKeypad(true);
    c3po.rest();
    c3po.look("right");
    dismissSpeechBubble();
  };

  const handleGuessAnimationComplete = async (
    wasCorrect,
    countCharsFound,
    char,
    binary,
  ) => {
    const { current: c3po } = state.c3poAnimateRef;
    control.disableKeypad(false);
    if (wasCorrect) {
      handleCorrectGuess(char, c3po, countCharsFound);
    } else {
      handleIncorrectGuess(char, c3po, countCharsFound);
    }
  };

  const handleCorrectGuess = (char, c3po, countCharsFound) => {
    // check if message is completely decoded -> game complete

    if (char === " ") {
      countCharsFound /= 2;
    }
    let increment = parseFloat(Number(countCharsFound) * 0.025);
    const currentEnergy = state.energy + increment;
    setEnergy(`+=${increment}`);
    let phrases = [
      <>
        Well done, master <span className="player">{player.getName()}!</span>
      </>,
      `I believe in you!`,
      `Oh, excellent!`,
      `Hurray!`,
      `Oh, wonderful!`,
      `I'm impressed!`,
      `Bravo!`,
      `Good guessing!`,
    ];
    if (
      C3POFeeling["near-death"](currentEnergy) ||
      C3POFeeling.dazed(currentEnergy) ||
      C3POFeeling.faint(currentEnergy)
    ) {
      phrases = [
        `I was starting to worry!`,
        `I think we're going to make it!`,
        `Thank the maker!`,
        `I never doubted you!`,
        `I can see again!`,
        "Oh, oh, that's much better!",
      ];
    }
    if (
      C3POFeeling.well(currentEnergy) ||
      C3POFeeling.excellent(currentEnergy)
    ) {
      phrases = [
        `Almost there!`,
        `I wish R2 could see this!`,
        `You're quite clever...for a human being.`,
        "It's quite possible we're going to make it.",

        `This is easy!`,
      ];
    }
    c3po.celebrate(3);
    let phrase = getPhrase(phrases);
    speak(<>{phrase ?? "Hmmm..."}</>, { tapToContinue: false });
    // let plural = countCharsFound > 1 ? "s" : "";
    // speak(
    //   <>
    //     You found {countCharsFound} <span className="letter-found">{char}</span>
    //     <span style={{ fontSize: "smaller" }}>{plural}</span>!
    //   </>,
    //   { tapToContinue: false },
    // );
  };

  /**
   * Get C3PO phrase without repeating the last phrase
   * @param {*} phrases
   * @returns
   */
  const getPhrase = (phrases) => {
    let randIndex = Math.floor(Math.random() * phrases.length);
    let phrase = phrases[randIndex];
    while (phrase == lastPhraseRef.current) {
      randIndex = Math.floor(Math.random() * phrases.length);
      phrase = phrases[randIndex];
    }
    lastPhraseRef.current = phrase;
    return phrase;
  };

  const handleIncorrectGuess = async (char, c3po, countCharsFound) => {
    // increment bad guesses
    const energyDecrement = 0.1;
    const currentEnergy = state.energy - energyDecrement;
    setEnergy(`-=${energyDecrement}`);
    if (currentEnergy <= 0) return;
    // const oppositeCase = getOppositeCase(char);
    // const hasOppositeCase = hasChar(oppositeCase.char, state.message);
    const numberOfChars = state.message.length - countCharsFound;
    const allKeys = control.getKeys();
    const possibleKeysToGuess = allKeys.filter(
      (key) => !control.state.disabledKeys[key],
    ).length;
    const correctCharsDistinct = Object.keys(
      Array.from(state.message).reduce((acc, char) => {
        acc[char] = true;
        return acc;
      }, {}),
    );
    const energyLeft = (parseFloat(state.energy) - 0.1) * 10;
    const p =
      1 - (1 - correctCharsDistinct.length / possibleKeysToGuess) ** energyLeft;
    // numberOfChars * energyLeft / possibleKeysToGuess

    // let survivalChance = Math.floor(Math.random() * 100) + 3000;
    let survivalChance = p.toFixed(5);

    // actions
    if (currentEnergy <= 0.25) {
      c3po.dazed();
    } else {
      c3po.fret();
    }
    //phrases

    let phrases = [
      `Oh dear...`,
      `Oh, wonderful...`,
      `We're doomed.`,

      `I've got a bad feeling about this...`,
      `How did it come to this?`,
      `I blame R2.`,
      "Well, don't blame me.",
      `I'm not long for this world...`,

      "I seem to be made to suffer. It's my lot in life.",
      "Goodness...",

      `Our chances of survival are approximately ${survivalChance}!`,
    ];
    if (C3POFeeling.faint(currentEnergy)) {
      phrases = [
        `I'm afraid not.`,
        `Oh...`,
        `Not quite.`,
        "I need an oil bath....",
        "Sometimes I just don't understand human behaviour.",
        "Well, that's not right.",
        "Oh, my circuits...",
      ];
    }
    if (
      C3POFeeling["near-death"](currentEnergy) ||
      C3POFeeling.dazed(currentEnergy)
    ) {
      phrases = [
        `Low... battery... `,
        "I'm fading...",
        "I feel faint...",
        "ZZzzzzzppt---fs",
        "Everything is going rather grey...",
        "I'm not ready to die!",
        <>
          I feel sketchy, master{" "}
          <span className="player">{player.getName()}...</span>
        </>,
      ];
    }

    let phrase = getPhrase(phrases);

    speak(<>{phrase ?? "Hmmm..."}</>, { tapToContinue: false });
    // await speak(
    //   <>
    //     No <span className="letter-not-found">{char}</span> could be found...
    //   </>,
    //   { tapToContinue: hasOppositeCase }
    // );
    // if (hasOppositeCase) {
    //   hint(oppositeCase, c3po);
    // }
  };

  const hint = async (oppositeCase, c3po) => {
    // dismissSpeechBubble();
    await c3po.rest(0);
    await c3po.proposeIdea();
    speak(
      <>
        But I wonder if there's{" "}
        {oppositeCase.caseType == "lowercase" ? "a small" : "a big"}{" "}
        <span className="letter-not-found">{oppositeCase.char}</span>?
      </>,
      { tapToContinue: false },
    );
  };

  /**
   * End game and return to start screen
   */
  const handleGameOver = async () => {
    const { current: c3po } = state.c3poAnimateRef;
    console.log("GAME OVER");
    control.disableKeypad(true);
    // pauseMusic();
    cueMusic(music.tatooineEbonHawk);
    await c3po.collapse(cueSoundFx(fx.powerDown));
    setTimeout(() => {
      dispatch({ type: C3PO_ACTIONS.setGameOver, payload: true });
    }, 100);
  };

  const handleRestartGame = () => {
    dispatch({ type: C3PO_ACTIONS.restartGame });
  };

  useEffect(() => {
    if (state.energy != null && state.energy != undefined) {
      control.setControlStripComponent(
        <EnergyBar now={state.energy} />,
        CONTROL_STRIP_TYPE.TERTIARY,
        {
          overwrite: true,
        },
      );
    }
    if (state.energy <= 0) {
      // game over

      handleGameOver();
    }
  }, [state.energy]);

  useEffect(() => {
    const { current: c3po } = state.c3poAnimateRef || {};
    if (!c3po) return;
    // c3po energy animations
  }, [state.energy]);

  useEffect(() => {
    if (state.showBinary || state.guessChar) {
      control.setCustomViewScreenComponents([
        <BinaryMessage
          // show={showBinary}
          show={true}
          // onShow={() => actions.setIsBinaryVisible(true)}

          onShow={() => setIsBinaryVisible(true)}
          message={state.message}
          guessChar={state.guessChar}
          // onGuessAnimationStart={actions.handleGuessAnimationStart}
          // onGuessAnimationComplete={actions.handleGuessAnimationComplete}

          onGuessAnimationStart={handleGuessAnimationStart}
          onGuessAnimationComplete={handleGuessAnimationComplete}
        ></BinaryMessage>,
      ]);
    }
  }, [state.showBinary, state.guessChar]);

  useEffect(() => {
    control.setControlStripComponent(
      <ScoreCard></ScoreCard>,
      CONTROL_STRIP_TYPE.PRIMARY,
    );
  }, []);

  return {
    bodyClassNames,
    energyLevelClassName,
    state: {
      ...state,
      isSpeaking,
      isTypingComplete,
    },
    control,

    actions: {
      cueSoundFx,
      cueMusic,
      dismissSpeechBubble,
      showBinary,
      setIsBinaryVisible,
      guessChar,
      handleGuessAnimationComplete,
      handleGuessAnimationStart,
      loadC3PO,
      toggleSpeechBubble,
      getGameStage: stage.getGameStage,
      askQuestion,
      showC3PO,
      speak,
      askQuestion,
      setEnergy,
      handleRestartGame,
      handleGameOver,
    },
    sound: {
      cueSoundFx,
      cueMusic,
      music,
      fx,
    },
  };
};
