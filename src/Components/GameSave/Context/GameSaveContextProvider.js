import React, { useEffect, useReducer, useRef } from "react";
import { GameSaveContext } from "./context";
import { initialState, reducer, SAVE_ACTIONS } from "./Reducer";
import SaveManager from "../SaveManager";
import { STORAGE_ITEM } from "../hooks/useSave";

/**
 * @typedef {Object} saveManagerRef
 * @property {SaveManager} current
 */

export default function GameSaveContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  /**
   * @type {saveManagerRef} saveManagerRef
   */
  const saveManagerRef = useRef(new SaveManager());

  const getLocalStorageSaveData = () => {
    let data = null;
    try {
      data = JSON.parse(localStorage.getItem(STORAGE_ITEM));
    } catch (error) {
      console.error(error);
    }
    return data;
  };

  /**
   * Set/replace the save data from local storage and/or database
   */
  const fetchSaveData = async () => {
    saveManagerRef.current = SaveManager.fromObject(getLocalStorageSaveData());
    dispatch({
      type: SAVE_ACTIONS.setSaveFiles,
      payload: saveManagerRef.current.getSaveFiles(),
    });
  };

  useEffect(() => {
    fetchSaveData();
  }, []);

  return (
    <GameSaveContext.Provider value={[state, dispatch, saveManagerRef]}>
      {children}
    </GameSaveContext.Provider>
  );
}
