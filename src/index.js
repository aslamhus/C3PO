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
import GameSaveContextProvider from "./Components/GameSave/Context/GameSaveContextProvider.js";
import ControlPadContextProvider from "./Components/ControlPad/Context/ControlPadContextProvider.js";
const renderDiv = document.getElementById("render");
const root = createRoot(renderDiv);
root.render(
  <GameSaveContextProvider>
    <GamePlayerContextProvider>
      <GameSoundProvider>
        <ControlPadContextProvider>
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
        </ControlPadContextProvider>
      </GameSoundProvider>
    </GamePlayerContextProvider>
  </GameSaveContextProvider>,
);
