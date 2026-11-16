import React, { useEffect, useState } from "react";
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
import "./styles/modals.scss";
import "./styles/app.scss";
import { toggleFullScreen } from "./Components/GameOptions/hooks/utils.js";
import detectMobile from "is-mobile";
import classNames from "classnames";
import RotateYourDevice from "./Components/UI/RotateYourDevice/RotateYourDevice.js";
import HUD from "./Components/UI/HUD/Hud.js";

export default function App() {
  const [clickToStart, setClickToStart] = useState(false);
  const [isMobile, setIsMobile] = useState(true || detectMobile());

  const appClassName = classNames("app", { ["is-mobile"]: isMobile });

  const handleClickStart = () => {
    setClickToStart(true);
  };

  return (
    <>
      <div className={appClassName}>
        {isMobile && <RotateYourDevice />}
        {!clickToStart ? (
          <div className="click-to-start" onClick={handleClickStart}>
            <h1>Click to start</h1>
          </div>
        ) : (
          <>
            <GameStage isMobile={isMobile}></GameStage>
            <GameControl isMobile={isMobile}></GameControl>
            <HUD isMobile={isMobile} />
            <TipModal />
          </>
        )}
      </div>
    </>
  );
}
