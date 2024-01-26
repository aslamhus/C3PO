import React, { useReducer } from 'react';
import { SpeechBubbleContext } from './context';
import { initialState, reducer } from './Reducer';
import TypeTextProvider from '../TypeText/context/TypeTextProvider';

export default function SpeechBubbleProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    // Type Text Provider and Speech Bubble Provider are nested
    <TypeTextProvider>
      <SpeechBubbleContext.Provider value={[state, dispatch]}>
        {children}
      </SpeechBubbleContext.Provider>
    </TypeTextProvider>
  );
}
