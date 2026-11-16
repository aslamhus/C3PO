import React from "react";
import SettingsButton from "./Components/SettingsButton";
import "./hud.scss";
import useGameOptions from "../../GameOptions/hooks/useGameOptions";
import { useGameSound } from "../../hooks/useGameSound";
import MuteButton from "./Components/MuteButton";

export default function HUD({ isMobile }) {
  const { setShowOptionsMenu } = useGameOptions();

  return (
    <>
      <div className="hud">
        <div className="hud-row header">
          <div style={{ display: "flex" }}>
            {isMobile && (
              <>
                <SettingsButton onClick={() => setShowOptionsMenu(true)} />
                <MuteButton />
              </>
            )}
          </div>
          <div></div>
        </div>
        <div className="hud-row" style={{ flexGrow: 1 }}></div>
        <div className="hud-row footer">
          <div>
            {/* <SettingsButton onClick={() => setShowOptionsMenu(true)} /> */}
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
