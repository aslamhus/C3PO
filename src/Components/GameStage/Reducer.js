export const C3POStates = {
  REST: 'rest',
  HIDDEN: 'hidden',
  SHOW: 'show',
};

export const GAME_STAGE_VIEWS = {
  startScreen: 'startScreen',
  tatooine: 'tatooine',
  c3po: 'c3po',
};

export const GAME_STAGE_ACTIONS = {
  loaded: 'loaded',
  speak: 'speak',
  updateC3poState: 'updateC3poState',
  hideSpeechBubble: 'hideSpeechBubble',
  showSpeechBubble: 'showSpeechBubble',
  showBinary: 'showBinary',
  toggleGameStartScreen: 'toggleGameStartScreen',
  guessChar: 'guessChar',
  setGameStageView: 'setGameStageView',
};

export const initialState = {
  loaded: false,
  c3poState: C3POStates.HIDDEN,
  c3poRef: null,
  c3poAnimateRef: null,
  speech: '',
  showSpeechBubble: false,
  showSpeechBubbleAnimationDuration: 0.5,
  showBinary: false,
  showGameStartScreen: true,
  stageView: GAME_STAGE_VIEWS.startScreen,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'loaded':
      return {
        ...state,
        loaded: true,
        c3poRef: action.payload.c3poRef,
        c3poAnimateRef: action.payload.c3poAnimateRef,
      };
    case 'speak':
      return {
        ...state,
        speech: action.payload,
      };

    case 'updateC3poState':
      return {
        ...state,
        c3poState: C3POStates[action.payload],
      };
    case 'hideSpeechBubble':
      return {
        ...state,
        showSpeechBubble: false,
      };
    case 'showSpeechBubble':
      return {
        ...state,
        showSpeechBubble: true,
      };
    case 'showBinary':
      return {
        ...state,
        showBinary: true,
      };
    case 'toggleGameStartScreen':
      return {
        ...state,
        showGameStartScreen: action.payload,
      };
    case 'setGameStageView':
      return {
        ...state,
        stageView: action.payload,
      };
    case 'guessChar':
      return {
        ...state,
        guessChar: action.payload,
      };
    default:
      throw new Error('unrecognised dispatch type');
  }
};
