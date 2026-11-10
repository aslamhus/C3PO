import gameEvents from "./events";
import { wait } from "@utils/global-game-actions";
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
export const main = async (state, actions, control, sound, stage, player) => {
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
    showTip,
    showBinary,
    guessChar,
    getGameStage,
    showC3PO,
  } = actions;
  const toggleKeypad = () =>
    control.toggleKeypad(true, { onPressChar: guessChar });

  cueMusic(music.jawaTheme);

  showC3PO();
  setTimeout(() => c3po.collapse(), 1000);
  return;
  // await c3po.proposeIdea();
  // c3po.removeSand();

  // testC3POAnimations({ state, actions, control });
  // return;
  await gameEvents.exitStageLeft(c3po);

  let skipQuestionIdentity = true,
    skipInstruction = true;
  // TODO: add skip function
  // showTip(<div onClick={null}>Skip</div>);

  if (!skipQuestionIdentity) {
    await gameEvents.peekAbooEntrance(c3po, speak);
    const identityConfirmed = await gameEvents.questionIdentity(
      c3po,
      control.toggleControls,
      speak,
      askQuestion,
      dismissSpeechBubble,
      player,
    );
    if (!identityConfirmed) {
      await gameEvents.exitStageLeft(c3po, 2);
      return control.endGame();
    }
    await speak("Thank goodness!");
    await dismissSpeechBubble();
  }

  if (!skipInstruction) {
    // begin game instruction
    await wait(1);
    await gameEvents.startGameInstruction({
      c3po,
      getGameStage: getGameStage(),
      speak,
      askQuestion,
      dismissSpeechBubble,
      showBinary,
      toggleKeypad,
      player,
    });
    // c3po.stop();
    c3po.rest();
  } else {
    // skip game instruction and move c3po to position
    showBinary();
    toggleKeypad();
    control.toggleControls(true);
    await c3po.animate(c3po.body, { rotate: 0, duration: 0 });
    await c3po.walk(-40, { steps: 9, duration: 0 });
  }
  // showKeypad();
};
