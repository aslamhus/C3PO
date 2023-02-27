import React, { useRef } from 'react';
import C3PO from './Components/C3PO/index.js';
import GameStage from './Components/GameStage/GameStage.js';
import GameStageProvider from './Components/GameStage/GameStageProvider.js';
import GameControl from './Components/GameControl';
import GameControlContextProvider from './Components/GameControl/Context/GameControlContextProvider';
import AskQuestionProvider from './Components/GameControl/AskQuestion/Context/AskQuestionProvider.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts.css';
import './app.css';

export default function App() {
  return (
    <div className="c3po-app">
      <GameStageProvider>
        <GameStage>
          <C3PO></C3PO>
        </GameStage>
        <GameControlContextProvider>
          <AskQuestionProvider>
            <GameControl></GameControl>
          </AskQuestionProvider>
        </GameControlContextProvider>
      </GameStageProvider>
    </div>
  );
}
