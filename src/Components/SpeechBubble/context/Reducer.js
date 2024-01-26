export const initialState = {
  show: false,
  speech: '',
  bubbleText: '',
  anchor: null,
  offset: { x: 0, y: 0 },
  showAnimationDuration: 0.5,
  showTapToContinue: false,
  tapToContinue: false,
  isPrepared: false,
  arrowPosition: { left: '25%' },
  positions: null,
  enableTapToContinue: true,
  onTypingStart: null,
  onTypingComplete: null,
  onBeforeShowSpeechBubble: null,
  onShowSpeechBubble: null,
};

export const actions = {
  speak: 'speak',
  show: 'show',
  showTapToContinue: 'showTapToContinue', // the visible state of the showTapToContinue
  setTapToContinue: 'setTapToContinue', // option to show tap to continue
  setBubbleText: 'setBubbleText',
  setIsPrepared: 'setIsPrepared',
  setArrowPosition: 'setArrowPosition',
  setPositions: 'setPositions',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.show:
      return {
        ...state,
        show: action.payload,
      };
    /**
     * Set the speech bubble text
     * Payload is words
     */
    case actions.speak:
      return {
        ...state,
        speech: action.payload,
      };

    case actions.showTapToContinue:
      console.log('reduceer action -> showTapToContinue', action.payload);
      return {
        ...state,
        showTapToContinue: action.payload,
      };

    case actions.setTapToContinue:
      return {
        ...state,
        tapToContinue: action.payload,
      };

    case actions.setBubbleText:
      return {
        ...state,
        bubbleText: action.payload,
      };

    case actions.setIsPrepared:
      return {
        ...state,
        isPrepared: action.payload,
      };

    case actions.setArrowPosition:
      return {
        ...state,
        arrowPosition: action.payload,
      };

    case actions.setPositions:
      return {
        ...state,
        positions: action.payload,
      };

    default:
      return state;
  }
};
