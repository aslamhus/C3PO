const C3PO = {
  REST: 'rest',
};

export const initialState = {
  loaded: false,
  c3poState: C3PO.REST,
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
  }
  return action;
};
