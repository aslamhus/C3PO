export const C3POStates = {
  REST: 'rest',
  HIDDEN: 'hidden',
  SHOW: 'show',
};

export const initialState = {
  loaded: false,
  c3poState: C3POStates.HIDDEN,
  c3poRef: null,
  c3poAnimateRef: null,
  speech: '',
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
  }
  return action;
};
