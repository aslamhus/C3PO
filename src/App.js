import React, { useState, useEffect, useRef } from 'react';
import C3PO from './Components/C3PO/index.js';
import GameControl from './Components/GameControl';
import GameControlContextProvider from './Components/GameControl/Context/GameControlContextProvider';
import AskQuestionProvider from './Components/GameControl/AskQuestion/Context/AskQuestionProvider.js';
import './app.css';

export default function App() {
  const c3poRef = useRef();

  useEffect(() => {
    // animate
    // const c3po = new C3POAnimate(c3poRef);
    // c3po.reset();
    // c3po.breathe();
    // setTimeout(() => {
    //   c3po.reset(2).then(() => {
    //     c3po.wave();
    //     setTimeout(() => {
    //       setIsViewScreenOn(true);
    //       console.log('answer should fire first');
    //       // c3po.rest();
    //     }, 2000);
    //   });
    // }, 1000);
  }, []);

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
