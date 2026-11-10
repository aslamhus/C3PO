import React, { useState, useRef, useEffect } from "react";
import c3po from "@images/C-3P0.png";
import SpeechBubble from "../../SpeechBubble/SpeechBubble";
import Body from "./Body/Body";
import C3POAnimate from "./C3POAnimate";
import TatooineFromSpace from "../TatooineFromSpace";
import BinaryMessage from "../../Binary/BinaryMessage";
import { useC3PO } from "./useC3PO";
import { useGameStage } from "../../GameStage/hooks/useGameStage";
import EnergyBar from "../../UI/EnergyBar";
import { main } from "./game/main";
import "./c3po.css";
import TatooineBackground from "./TatooineBackground/TatooineBackground";
import R2D2 from "./R2D2/R2D2";
import useGameOptions from "../../GameOptions/hooks/useGameOptions";
import useGamePlayer from "../../GamePlayer/hooks/useGamePlayer";
import { CONTROL_STRIP_TYPE } from "../../GameControl/hooks/useGameControl";

const C3PO = React.forwardRef((props, ref) => {
  const stage = useGameStage();
  // get state, actions, game control, and sound control from useC3PO hook
  const {
    state,
    actions,
    control,
    sound,
    bodyClassNames,
    energyLevelClassName,
  } = useC3PO({ stage });

  const { player } = useGamePlayer();

  const {
    loaded,
    message,
    c3poState,
    showSpeechBubbleAnimationDuration,
    guessChar,
    showBinary,
    showTapToContinue,
    energy,
    isSpeaking,
    isTypingComplete,
  } = state;

  // handle game start by passing game state, actions, game control, and sound control to main game loop
  const startC3POGame = () =>
    main(state, actions, control, sound, stage, player);

  const [showTatooineFromSpace, setShowTatooineFromSpace] = useState(false);
  const [showTatooineDesert, setShowTatooineDesert] = useState(false);
  const [speechBubbleAnchor, setSpeechBubbleAnchor] = useState(null);
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
    c3poAnimateRef.current = new C3POAnimate(c3poRef, stage.getGameStage());
    actions.loadC3PO({
      c3poRef,
      c3poAnimateRef,
    });
  };

  useEffect(() => {
    if (loaded) {
      setSpeechBubbleAnchor(c3poRef.current.querySelector(".head"));
      startC3POGame();
    }
  }, [loaded]);

  return (
    <>
      {showTatooineDesert && <TatooineFromSpace ref={tatooineSpaceRef} />}
      {!showTatooineDesert && (
        <div className="c3po-container">
          <TatooineBackground className={energyLevelClassName}>
            {/* R2D2 Sprite hiding in the background */}
            {/* <R2D2 /> */}
          </TatooineBackground>
          {/* C3PO sprite */}
          <img src={c3po} className="c3po-reference"></img>
          <SpeechBubble
            anchor={speechBubbleAnchor}
            offset={{ x: 0, y: -100 }}
            showAnimationDuration={showSpeechBubbleAnimationDuration}
            enableTapToContinue={showTapToContinue}
          />
          <Body
            className={`${bodyClassNames} ${energyLevelClassName}`}
            ref={getC3PORef}
            style={{ opacity: c3poState != "hidden" ? 1 : 0 }}
            isSpeaking={isSpeaking}
          ></Body>
        </div>
      )}
    </>
  );
});
export default C3PO;
