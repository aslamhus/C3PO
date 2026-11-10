import { useContext, useEffect, useMemo } from "react";
import { GameSaveContext } from "../Context/context";
import SaveFile from "../SaveFile";
import SaveManager from "../SaveManager";
import { SAVE_ACTIONS } from "../Context/Reducer";
export const STORAGE_ITEM = "yasgames-star-wars";

import * as types from "../types";
import Player from "../../GamePlayer/Player";

/**
 * Use Save
 * @returns {types.UseSaveReturn}
 */
export default function useSave() {
  /**
   * @type {[Object,Function,types.saveManagerRef]}
   */
  const [state, dispatch, saveManagerRef] = useContext(GameSaveContext);
  const { saveFiles } = state;

  /**
   *
   * @param {types.SaveFiles} saveFiles
   */
  const saveToLocalStorage = (saveFiles) => {
    localStorage.setItem(STORAGE_ITEM, JSON.stringify(saveFiles));
  };

  const save = () => {
    const { current: saveManager } = saveManagerRef;
    const newSaveFiles = [...saveManager.getSaveFiles()];
    // update view
    dispatch({
      type: SAVE_ACTIONS.setSaveFiles,
      payload: newSaveFiles,
    });
    // update local storage
    saveToLocalStorage(newSaveFiles);
  };

  /**
   * Save Player
   *
   *
   * @param {Player} player
   * @param {boolean} overwrite - set to to true when updating player, false when creating player
   */
  const savePlayer = (player, overwrite = true) => {
    const { current: saveManager } = saveManagerRef;
    saveManager.save(new SaveFile(player), overwrite);
    save();
  };

  /**
   * Convenience function to create player (save with ovewrite set to false)
   * @param {*} player
   * @returns
   */
  const createPlayer = (player) => {
    return savePlayer(player, false);
  };

  /**
   * @param {SaveFile} saveFile
   */
  const removeSaveFile = (saveFile) => {
    saveManagerRef.current.removeSaveFile(saveFile);
    save();
  };

  const hasSaves = useMemo(
    () => Object.keys(saveFiles)?.length > 0,
    [saveFiles],
  );

  const findSaveFileForPlayerWithName = (name) => {
    const { current: saveManager } = saveManagerRef;
    return saveManager.findSaveDataForPlayer(new Player(name));
  };

  return {
    savePlayer,
    createPlayer,
    saveFiles,
    hasSaves,
    removeSaveFile,
    findSaveFileForPlayerWithName,
  };
}
