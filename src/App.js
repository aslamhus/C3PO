import React, { useRef } from 'react';
import C3PO from './Components/C3PO/index.js';
import GameControl from './Components/GameControl';
import GameControlContextProvider from './Components/GameControl/Context/GameControlContextProvider';
import AskQuestionProvider from './Components/GameControl/AskQuestion/Context/AskQuestionProvider.js';
import './app.css';

export default function App() {
  const c3poRef = useRef();

  return (
    <div className="c3po-app">
      <C3PO ref={c3poRef}></C3PO>
      <GameControlContextProvider>
        <AskQuestionProvider>
          <GameControl c3poRef={c3poRef}></GameControl>
        </AskQuestionProvider>
      </GameControlContextProvider>
    </div>
  );
}
