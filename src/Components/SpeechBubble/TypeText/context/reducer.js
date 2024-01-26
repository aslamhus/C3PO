export const initialState = {
  isTyping: false,
  isTypingComplete: false,
};

export const actions = {
  setIsTyping: 'setIsTyping',
  setIsTypingComplete: 'setIsTypingComplete',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.setIsTyping:
      return {
        ...state,
        isTyping: action.payload,
      };

    case actions.setIsTypingComplete:
      return {
        ...state,
        isTypingComplete: action.payload,
      };

    default:
      return state;
  }
};
