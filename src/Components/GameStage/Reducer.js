export const GAME_STAGE_VIEWS = {
  startScreen: 'startScreen',
  c3po: 'c3po',
};

export const GAME_STAGE_ACTIONS = {
  setGameStageView: 'setGameStageView',
  toggleShowLoader: 'showLoader',
};

export const initialState = {
  stageView: GAME_STAGE_VIEWS.startScreen,
  showLoader: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'setGameStageView':
      return {
        ...state,
        stageView: action.payload,
      };

    case 'toggleShowLoader':
      return {
        ...state,
        showLoader: action.payload,
      };

    default:
      throw new Error('unrecognised dispatch type');
  }
};
