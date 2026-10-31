import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import GameStageProvider from "./Components/GameStage/GameStageProvider.js";
import GameControlContextProvider from "./Components/GameControl/Context/GameControlContextProvider.js";
import AskQuestionProvider from "./Components/GameControl/AskQuestion/Context/AskQuestionProvider.js";
import TipProvider from "./Components/UI/Modals/TipModal/context/TipProvider.js";
import GameOptionsContextProvider from "./Components/GameOptions/Context/GameOptionsContextProvider.js";
import GameSoundProvider from "./Components/hooks/useGameSound/GameSoundProvider.js";
import GamePlayerContextProvider from "./Components/GamePlayer/Context/GamePlayerContextProvider.js";
const renderDiv = document.getElementById("render");
const root = createRoot(renderDiv);
root.render(
  <GameSoundProvider>
    <GamePlayerContextProvider>
      <GameControlContextProvider>
        <GameStageProvider>
          <GameOptionsContextProvider>
            <AskQuestionProvider>
              <TipProvider>
                <App />
              </TipProvider>
            </AskQuestionProvider>
          </GameOptionsContextProvider>
        </GameStageProvider>
      </GameControlContextProvider>
    </GamePlayerContextProvider>
  </GameSoundProvider>,
);
