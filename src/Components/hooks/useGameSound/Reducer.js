export const initialState = {
  musicGain: 1, // 0 - 2
  fxGain: 1,
};

export const actions = {
  setMusicGain: "setMusicGain",
  setFXGain: "setFXGain",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.setMusicGain:
      return {
        ...state,
        musicGain: action.payload,
      };
    case actions.setFXGain:
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
