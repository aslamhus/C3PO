import React, { useContext, useRef, useEffect } from "react";
import BinaryMessage from "../../Binary/BinaryMessage";
import EnergyBar from "../../UI/EnergyBar";
import { C3POContext } from "./context/context";
import { C3PO_ACTIONS, C3POStates } from "./context/Reducer";
import { useTipModal } from "../../UI/Modals/TipModal/useTipModal";
import { getOppositeCase, hasChar } from "./utils";
import { useGameSound } from "../../hooks/useGameSound";
import { useGameControl } from "../../GameControl/hooks/useGameControl";
import { useAskQuestion } from "../../GameControl/AskQuestion/hooks/useAskQuestion";
import { useSpeak } from "../../SpeechBubble/useSpeak";

export const useC3PO = ({ stage }) => {
  const [state, dispatch] = useContext(C3POContext);

  const { ask } = useAskQuestion();
  const {
    speak,
    dismissSpeechBubble,
    state: { isSpeaking, isTypingComplete },
  } = useSpeak();
  // game control
  const control = useGameControl();

  const askQuestion = async ({ question, responses }) => {
    // set the game stage constraints for the control pad
    stage.setConstraints({ x: [0, "50%"], y: [0, "100%"] });

    await speak(question, { tapToContinue: false });
    if (!control.state.controls) {
      control.toggleControls(true);
    }
    return ask({ question, responses });
  };
  // game sound
  const { cueSoundFx, cueMusic, music, fx } = useGameSound();
  const isBinaryVisibleRef = useRef(false);

  const { showTip, hideTip } = useTipModal();

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

  const showBinary = () => {
    isBinaryVisibleRef.current = false;
    return new Promise((resolve, reject) => {
      dispatch({ type: C3PO_ACTIONS.showBinary });
      resolve(true);
      // this needs to set the custom view screen component instead, or use a useEffect to check if showBinary is true

      // let interval = setInterval(() => {
      //   if (isBinaryVisibleRef.current == true) {
      //     clearInterval(interval);
      //     resolve(true);
      //   }
      //   console.log('is binary visible?', isBinaryVisibleRef.current);
      // }, 100);
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
    c3po.stop();
    c3po.rest();
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
      handleIncorrectGuess(char, c3po);
    }
  };

  const handleCorrectGuess = (char, c3po, countCharsFound) => {
    // check if message is completely decoded -> game complete
    c3po.celebrate(3).then(() => {
      c3po.rest();
    });
    let increment = parseFloat(Number(countCharsFound) * 0.05);
    setEnergy(`+=${increment}`);
    let player = "Player";
    let phrases = [
      `Well done, Master ${player}!`,
      `I say!`,
      `I'm feeling better already`,
      `Thank the maker!`,
      `Oh, Excellent!`,
      `Hurray!`,
      `Oh, wonderful!`,
      `I'm impressed!`,
      `You're doing it!`,
      `Marvellous!`,
      `This is easy!`,
      `Bravo!`,
      `Good guessing!`,
      `Almost there!`,
      `I think we're going to make it!`,
    ];

    let randIndex = Math.floor(Math.random() * phrases.length);
    speak(<>{phrases[randIndex] ?? "Hmmm..."}</>, { tapToContinue: false });
    // let plural = countCharsFound > 1 ? "s" : "";
    // speak(
    //   <>
    //     You found {countCharsFound} <span className="letter-found">{char}</span>
    //     <span style={{ fontSize: "smaller" }}>{plural}</span>!
    //   </>,
    //   { tapToContinue: false },
    // );
  };

  const handleIncorrectGuess = async (char, c3po) => {
    // increment bad guesses
    setEnergy("-=0.1");
    const oppositeCase = getOppositeCase(char);
    const hasOppositeCase = hasChar(oppositeCase.char, state.message);
    c3po.fret();
    let survivalChance = Math.floor(Math.random() * 100) + 3000;
    let phrases = [
      `Oh, dear...`,
      `We're doomed`,
      `Low... battery... `,
      `I've got a bad feeling about this...`,
      `How did it come to this?`,
      `I blame R2.`,
      `I'm not long for this world...`,
      `I'm afraid not.`,
      `Oh...`,
      `Not quite.`,
      "Goodness...",
      "Hmm....",
      "Dear me.",
      "I feel faint...",
      `Our chances of survival are ${survivalChance} to 1!`,
    ];

    let randIndex = Math.floor(Math.random() * phrases.length);
    speak(<>{phrases[randIndex] ?? "Hmmm..."}</>, { tapToContinue: false });
    // await speak(
    //   <>
    //     No <span className="letter-not-found">{char}</span> could be found...
    //   </>,
    //   { tapToContinue: hasOppositeCase }
    // );
    if (hasOppositeCase) {
      hint(oppositeCase, c3po);
    }
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
  const handleGameOver = () => {
    control.endGame();
  };

  useEffect(() => {
    if (state.energy) {
      control.setControlStripComponent(
        <EnergyBar now={state.energy} />,
        "secondary",
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

  return {
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
      showTip,
      hideTip,
      setEnergy,
    },
    sound: {
      cueSoundFx,
      cueMusic,
      music,
      fx,
    },
  };
};
