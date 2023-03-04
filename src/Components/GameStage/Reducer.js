export const GAME_STAGE_VIEWS = {
  startScreen: 'startScreen',
  c3po: 'c3po',
};

export const GAME_STAGE_ACTIONS = {
  setGameStageView: 'setGameStageView',
  toggleShowLoader: 'showLoader',
  setConstraints: 'setConstraints',
  load: 'load',
};

export const initialState = {
  stageView: GAME_STAGE_VIEWS.startScreen,
  loaded: false,
  gameStageRef: null,
  showLoader: false,
  constraints: { x: [0, '50%'], y: [0, '100%'] },
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

    case 'setConstraints':
      return {
        ...state,
        constraints: action.payload,
      };

    case 'load':
      return {
        ...state,
        loaded: true,
        gameStageRef: action.payload,
      };

    default:
      throw new Error('unrecognised dispatch type');
  }
};
