import { useGameStage } from '../GameStage/hooks/useGameStage';
import { useGameControl } from '../GameControl/hooks/useGameControl';
import { useGameSound } from './useGameSound';

/**
 * useGame hook
 *
 * combines the context of GameStage, GameControl, and GameSound to
 * co-ordinate game actions between the view (GameStage) and the UI (GameControl)
 *
 *
 */
export const useGame = () => {
  const stage = useGameStage();
  const control = useGameControl();
  const sound = useGameSound();

  return { stage, control, sound };
};
