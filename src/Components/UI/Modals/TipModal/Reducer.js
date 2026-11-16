export const TIP_ACTIONS = {
  show: "show",
  hide: "hide",
  setHasTimedOut: "setHasTimedOut",
};

export const initialState = {
  show: false,
  content: null,
  style: null,
  hasTimedOUt: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "show":
      let newState = {
        ...state,
        show: true,
        hasTimedOut: false,
        content: action?.payload?.component,
        ...(action.payload.options ?? {}),
      };

      return newState;

    case "hide":
      return {
        ...state,
        show: false,
      };

    case "setHasTimedOut":
      return {
        ...state,
        hasTimedOut: action.payload,
      };
  }
};
