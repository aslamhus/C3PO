import { useGameStage } from '../GameStage/hooks/useGameStage';
import { useGameControl } from '../GameControl/hooks/useGameControl';
import { useGameSound } from './useGameSound';
import { useAskQuestion } from '../GameControl/AskQuestion/hooks/useAskQuestion';
import * as actions from '../GameControl/actions';
import { music } from './useGameSound';
import { GAME_STAGE_VIEWS } from '../GameStage/Reducer';

/**
 * useGame hook
 *
 * combines the context of GameStage and GameControl to
 * co-ordinate game actions between the view (GameStage) and the UI (GameControl)
 * the method "askQuestion", is an example of this co-ordination becuase
 * it combines the "speak" method from the view (where c-3po speak's the words of the question),
 * and the "ask" method form the ui (where the user is asked to respond to the question)
 *
 *
 */
export const useGame = () => {
  const stage = useGameStage();
  const control = useGameControl();
  const { playSound } = useGameSound();
  const { ask } = useAskQuestion();

  const testTranslator = async (c3po) => {
    stage.showC3PO();
    stage.showBinary();
    control.toggleTranslator(true);
    control.toggleControls(true);
  };

  const testAnimations = async (c3po) => {
    stage.showC3PO();
    /**
     * Note to self:
     * test both resting and celebrating
     */
    await c3po.rest(0);
    // c3po.walkToCenter(stage.getGameStage());
    c3po.celebrate();
    setTimeout(() => {
      // c3po.stop();
      c3po.fret();
    }, 1000);
  };

  const askQuestion = ({ question, responses }) => {
    stage.speak(question);
    return ask({ question, responses });
  };

  const beginGame = async () => {
    stage.setGameStageView(GAME_STAGE_VIEWS.c3po);
    playSound(music.jawaTheme);
    const { current: c3po } = stage.state.c3poAnimateRef;
    /**
     * Eventually, beginGame should toggle game stage view state.
     * i.e.  stage.setView(c3po);
     * when the stage view state is set, the relevant view component can begin its logic.
     * The game logic should be contained within the view, thus we can have
     * different games, or environemnts in the future.
     */
    // testTranslator(c3po);
    // return;

    await actions.exitStageLeft(c3po);
    stage.showC3PO();
    await actions.peekAbooEntrance(c3po, stage.speak);
    const identityConfirmed = await actions.questionIdentity(
      c3po,
      control.toggleControls,
      stage.speak,
      askQuestion,
      stage.dismissSpeechBubble
    );
    if (identityConfirmed) {
      await stage.speak('Thank goodness!', { wait: 2 });
      await stage.dismissSpeechBubble();
      await actions.wait(1);
      await actions.startGameInstruction(
        c3po,
        stage.getGameStage(),
        stage.speak,
        askQuestion,
        stage.dismissSpeechBubble,
        stage.showBinary
      );
      c3po.stop();
      c3po.rest();
      control.toggleTranslator(true);
      // showTranslator();
    } else {
      // end game.
    }
  };

  return { stage, control, playSound, beginGame };
};
