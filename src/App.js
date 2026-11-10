import React, { useState } from "react";
import GameStage from "./Components/GameStage/GameStage.js";
import GameControl from "./Components/GameControl";
import TipModal from "./Components/UI/Modals/TipModal/TipModal.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fonts/starjedi/starjedi.css";
import "./styles/fonts.scss";
import "./styles/buttons.scss";
import "./styles/links.scss";
import "./styles/inputs.scss";
import "./styles/lists.scss";
import "./styles/dropdowns.scss";
import "./styles/app.scss";

export default function App() {
  const [clickToStart, setClickToStart] = useState(false);

  const handleClickStart = () => {
    setClickToStart(true);
  };
  return (
    <>
      {!clickToStart ? (
        <div className="click-to-start" onClick={handleClickStart}>
          <h1>Click to start</h1>
        </div>
      ) : (
        <div className="app">
          <GameStage></GameStage>
          <GameControl></GameControl>
          <TipModal />
        </div>
      )}
    </>
  );
}
