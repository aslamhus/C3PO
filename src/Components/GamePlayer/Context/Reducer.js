import React from "react";

export const GAME_PLAYER_ACTIONS = {
  setPlayerName: "setPlayerName",
};

export const initialState = {
  player: null,
};

export const reducer = (state = initialState, action) => {
  const { options, payload, type } = action;
  switch (type) {
    case GAME_PLAYER_ACTIONS.setPlayerName:
      return {
        ...state,
        player: {
          ...state.player,
          name: action.payload,
        },
      };

    default:
      return initialState;
  }
};
