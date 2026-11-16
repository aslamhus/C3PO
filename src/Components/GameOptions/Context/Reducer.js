import React from "react";

export const GAME_OPTIONS_ACTIONS = {
  setShowOptionsMenu: "setShowOptionsMenu",
};

export const initialState = {
  volume: 1,
  speed: 1,
  showOptionsMenu: false,
};

export const reducer = (state = initialState, action) => {
  const { options, payload, type } = action;
  switch (type) {
    case GAME_OPTIONS_ACTIONS.setShowOptionsMenu:
      return {
        ...state,
        showOptionsMenu: action.payload,
      };

    default:
      return initialState;
  }
};
