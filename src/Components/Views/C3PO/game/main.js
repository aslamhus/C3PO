import React from "react";
import gameEvents from "./events";
import { wait, createSkippable } from "@utils/global-game-actions";
import { tips } from "../../../../tips";
import {
  testBinaryKeyboard,
  testSpeechBubbleAndKeypadToggle,
  testC3POAnimations,
} from "./tests/tests";

/**
 * Main game loop for C3PO
 *
 * How do main game loops work?
 * Each Game has its own main hook, i.e. useC3PO.js.
 * This hook returns the game dependencies, specifically:
 * - state
 * - actions
 * - game control
 * - sound control
 *
 * These depencies are then passed to the main game loop.
 * The main game loop groups actions into events like "questionIdentity" or "startGameInstruction".
 * The events are composed of actions that are executed in a specific order.
 * Main function handles the execution of all the game events.
 *
 *
 * @param {Object} state - the c3po state
 * @param {Object} actions - all c3po action dependencies
 * @param {Object} control - the game control object
 * @param {Object} sound - the game sound object
 */
export const main = async ({
  state,
  actions,
  control,
  sound,
  stage,
  player,
  showTip,
  hideTip,
}) => {
  // testBinaryKeyboard({ state, actions, control });
  // return;
  // testSpeechBubbleAndKeypadToggle({ state, actions, control, stage });
  // return;
  const { cueSoundFx, cueMusic, music, fx } = sound;
  const { current: c3po } = state.c3poAnimateRef;

  const {
    speak,
    askQuestion,
    dismissSpeechBubble,
    showBinary,
    guessChar,
    getGameStage,
    showC3PO,
    handleGameOver,
  } = actions;
  // reset all previous state
  control.toggleKeypad(false);
  control.toggleControls(false);
  control.resetKeypad();
  await dismissSpeechBubble();
  cueMusic(music.jawaTheme);
  c3po.reset();
  showC3PO();

  // define show keypad with guess char as callback when pressing a key
  const showKeypad = () => {
    control.toggleKeypad(true, { onPressChar: guessChar });
  };

  let skippable = createSkippable();
  // begin
  await gameEvents.exitStageLeft(c3po, 0);

  showTip(<div onClick={() => skippable.skip()}>Skip</div>);
  try {
    await skippable(
      gameEvents.peekAbooEntrance(c3po, speak, skippable),
      "peakAboo",
    );

    let identityConfirmed = await skippable(
      gameEvents.questionIdentity(
        c3po,
        control.toggleControls,
        speak,
        askQuestion,
        dismissSpeechBubble,
        player,
        skippable,
      ),
    );

    if (!identityConfirmed) {
      // c3po.think();
      await gameEvents.exitStageLeft(c3po, 3);

      control.endGame();
      return;
    }
    await skippable(speak("Thank goodness!"));
    await skippable(dismissSpeechBubble());

    // begin game instruction
    await skippable(
      gameEvents.startGameInstruction({
        c3po,
        getGameStage: getGameStage(),
        speak,
        askQuestion,
        dismissSpeechBubble,
        showBinary,
        showKeypad,
        player,
        skippable,
        handleGameOver,
      }),
    );
  } catch (error) {
    if (error.name !== "AbortError" && error?.message != "Skipped") {
      throw error;
    }
    showBinary();
    showKeypad();
    dismissSpeechBubble();
    control.toggleControls(true);
    c3po.reset();
    c3po.animate(c3po.body, { rotate: 0, duration: 0 });
    c3po.walkTo(40, { steps: 0, duration: 0 });
  }
  // skip game instruction and move c3po to position

  // showKeypad();
};
