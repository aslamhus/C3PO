import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import GameStageProvider from './Components/GameStage/GameStageProvider.js';
import GameControlContextProvider from './Components/GameControl/Context/GameControlContextProvider.js';
import AskQuestionProvider from './Components/GameControl/AskQuestion/Context/AskQuestionProvider.js';
const renderDiv = document.getElementById('render');
const root = createRoot(renderDiv);
root.render(
  <GameControlContextProvider>
    <GameStageProvider>
      <AskQuestionProvider>
        <App />
      </AskQuestionProvider>
    </GameStageProvider>
  </GameControlContextProvider>
);
