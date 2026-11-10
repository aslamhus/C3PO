import React from "react";
import Player from "../Player";

export const DEFAULT_PLAYER_NAME = "GUEST";

export const GAME_PLAYER_ACTIONS = {
  setPlayer: "setPlayer",
};

export const initialState = {
  players: {},
  player: new Player(DEFAULT_PLAYER_NAME),
};

export const reducer = (state = initialState, action) => {
  const { options, payload, type } = action;
  switch (type) {
    case GAME_PLAYER_ACTIONS.setPlayer:
      return {
        ...state,
        player: action.payload,
      };

    default:
      return initialState;
  }
};
