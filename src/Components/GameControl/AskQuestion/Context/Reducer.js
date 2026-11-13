export const initialState = {
  show: false,
  question: "",
  responses: [],
};

export const ASK_QUESTION_ACTIONS = {
  ask: "ask",
  setShow: "setShow",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ASK_QUESTION_ACTIONS.ask:
      const { question, responses, promptDelay } = action.payload;
      return { ...state, show: true, question, responses, promptDelay };
    case ASK_QUESTION_ACTIONS.setShow:
      return {
        ...state,
        show: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
