import React from 'react';
import { TypeTextContext } from './context/context';
import { actions } from './context/reducer';

export const useTypeText = () => {
  const [state, dispatch] = React.useContext(TypeTextContext);
  /**
   * Note: isTypingRef is created in the TypeText component
   * so that all instance of useTypeText can share the same
   * ref value.
   */

  const setIsTyping = (isTyping) => {
    dispatch({
      type: actions.setIsTyping,
      payload: isTyping,
    });
  };

  const setIsTypingComplete = (isTypingComplete) => {
    dispatch({
      type: actions.setIsTypingComplete,
      payload: isTypingComplete,
    });
  };

  return {
    state,
    setIsTyping,
    setIsTypingComplete,
  };
};
