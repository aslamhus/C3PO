export const TIP_ACTIONS = {
  show: 'show',
  hide: 'hide',
};

export const initialState = {
  show: false,
  content: null,
  style: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'show':
      let newState = { ...state, show: true };
      // console.log('action', action);
      if (action?.payload?.component) {
        newState.content = action.payload.component;
      }
      if (action?.payload?.style) {
        newState.style = action.payload.style;
      }
      return newState;
    case 'hide':
      return {
        ...state,
        show: false,
      };
  }
};
