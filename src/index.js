import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import GameStageProvider from './Components/GameStage/GameStageProvider.js';
import GameControlContextProvider from './Components/GameControl/Context/GameControlContextProvider.js';
import AskQuestionProvider from './Components/GameControl/AskQuestion/Context/AskQuestionProvider.js';
import TipProvider from './Components/UI/Modals/TipModal/context/TipProvider.js';
const renderDiv = document.getElementById('render');
const root = createRoot(renderDiv);
root.render(
  <GameControlContextProvider>
    <GameStageProvider>
      <AskQuestionProvider>
        <TipProvider>
          <App />
        </TipProvider>
      </AskQuestionProvider>
    </GameStageProvider>
  </GameControlContextProvider>
);
