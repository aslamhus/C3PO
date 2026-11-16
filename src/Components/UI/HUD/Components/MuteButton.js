import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faVolume,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import GameIconButton from "../../Buttons/GameIconButton";
import { useGameSound } from "../../../hooks/useGameSound";
import useGameOptions from "../../../GameOptions/hooks/useGameOptions";
import useSave from "../../../GameSave/hooks/useSave";
import useGamePlayer from "../../../GamePlayer/hooks/useGamePlayer";
export default function MuteButton({ ...props }) {
  const { isMuted, toggleMute } = useGameSound();

  const { savePlayer } = useSave();

  const { player } = useGamePlayer();
  return (
    <GameIconButton
      className="hud-button"
      title="toggle mute"
      onClick={() => {
        toggleMute();
        savePlayer(player);
      }}
      {...props}
    >
      <FontAwesomeIcon icon={!isMuted ? faVolume : faVolumeMute} />
    </GameIconButton>
  );
}
