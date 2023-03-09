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
  showTapToContinue: 'showTapToContinue',
  hideTapToContinue: 'hideTapToContinue',
  setEnergy: 'setEnergy',
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
  showTapToContinue: false,
  guesses: {},
  message: 'May the force be with you, Sylvan!',
  energy: 0.85,
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
      const [char, binary] = action.payload;
      return {
        ...state,
        guessChar: [char, binary],
        guesses: { ...state.guesses, [char]: binary },
      };

    case 'showTapToContinue':
      return {
        ...state,
        showTapToContinue: true,
      };
    case 'hideTapToContinue':
      return {
        ...state,
        showTapToContinue: false,
      };
    case 'setEnergy':
      let energy = action.payload;
      const [, increment, decrement, value] = energy.match(/(\+=)?(-=)?([0-9]*?\.[0-9]*)/);
      if (increment) {
        energy = parseFloat(state.energy) + parseFloat(value);
      } else if (decrement) {
        energy = parseFloat(state.energy) - parseFloat(value);
      }
      return {
        ...state,
        energy,
      };

    default:
      throw new Error(`unrecognised dispatch type ${action.type}`);
  }
};
