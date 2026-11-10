export const initialState = {
  musicGain: 1, // 0 - 2
  fxGain: 1,
};

export const GAME_SOUND_ACTIONS = {
  setMusicGain: "setMusicGain",
  setFXGain: "setFXGain",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case GAME_SOUND_ACTIONS.setMusicGain:
      return {
        ...state,
        musicGain: action.payload,
      };
    case GAME_SOUND_ACTIONS.setFXGain:
      return {
        ...state,
        fxGain: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
