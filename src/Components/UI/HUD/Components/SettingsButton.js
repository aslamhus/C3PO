import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import GameIconButton from "../../Buttons/GameIconButton";
export default function SettingsButton({ ...props }) {
  return (
    <GameIconButton className="hud-button" title="settings" {...props}>
      <FontAwesomeIcon icon={faGear} />
    </GameIconButton>
  );
}
