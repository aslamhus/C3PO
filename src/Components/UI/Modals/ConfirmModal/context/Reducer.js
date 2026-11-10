export const SHOW_CONFIRM = 'SHOW_CONFIRM';
export const HIDE_CONFIRM = 'HIDE_CONFIRM';

export const initialState = {
  show: false,
  title: '',
  options: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CONFIRM:
      return {
        show: true,
        title: action.payload.title,
        options: action.payload.options,
      };
    case HIDE_CONFIRM:
      return initialState;
    default:
      return initialState;
  }
};
