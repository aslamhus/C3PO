export const SHOW_CONFIRM = 'SHOW_CONFIRM';
export const HIDE_CONFIRM = 'HIDE_CONFIRM';

export const initialState = {
  state: 'initial',
  viewScreen: false,
  controls: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'toggleViewScreen':
      return {
        ...state,
        viewScreen: action.payload,
      };
    case 'toggleControls':
      return {
        ...state,
        controls: action.payload,
      };
    default:
      return initialState;
  }
};
