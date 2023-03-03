export const C3POStates = {
  REST: 'rest',
  HIDDEN: 'hidden',
  SHOW: 'show',
};

export const C3PO_ACTIONS = {
  load: 'load',
  speak: 'speak',
  updateC3poState: 'updateC3poState',
  toggleSpeechBubble: 'toggleSpeechBubble',
  showBinary: 'showBinary',
  guessChar: 'guessChar',
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
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'load':
      return {
        ...state,
        c3poRef: action.payload.c3poRef,
        c3poAnimateRef: action.payload.c3poAnimateRef,
        loaded: true,
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
    case 'toggleSpeechBubble':
      return {
        ...state,
        showSpeechBubble: action.payload,
      };

    case 'showBinary':
      return {
        ...state,
        showBinary: true,
      };

    case 'guessChar':
      return {
        ...state,
        guessChar: action.payload,
      };
    default:
      throw new Error(`unrecognised dispatch type ${action.type}`);
  }
};
