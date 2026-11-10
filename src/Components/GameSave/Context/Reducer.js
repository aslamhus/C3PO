import React from "react";
import Player from "../../GamePlayer/Player";
import SaveFile from "../SaveFile";
import SaveManager from "../SaveManager";

export const SAVE_ACTIONS = {
  setSaveFiles: "setSaveFiles",
};

export const initialState = {
  saveFiles: [],
};

export const reducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case SAVE_ACTIONS.setSaveFiles:
      return {
        ...state,
        saveFiles: payload,
      };

    default:
      return initialState;
  }
};
