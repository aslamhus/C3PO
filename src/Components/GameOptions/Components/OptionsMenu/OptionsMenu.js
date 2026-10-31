import React from "react";
import classNames from "classnames";
import GameButton from "../../../UI/Buttons/GameButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faVolumeMute,
  faVolumeOff,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import ScreenModal from "../../../UI/Modals/ScreenModal/ScreenModal";
import useGameOptions from "../../hooks/useGameOptions";
import SoundOptions from "../SoundOptions";
import "./options-menu.scss";

export default function OptionsMenu() {
  const optionsMenuClassnames = classNames("options-menu");

  const {
    state: { showOptionsMenu },
  } = useGameOptions();

  return (
    <ScreenModal
      className={optionsMenuClassnames}
      show={showOptionsMenu}
      width="90%"
      height="90%"
    >
      <ScreenModal.Header>
        <h2>Options</h2>
      </ScreenModal.Header>
      <ScreenModal.Body>
        <SoundOptions />
        {/* <GameButton size="sm">
          <FontAwesomeIcon icon={faVolumeXmark} />
        </GameButton> */}
      </ScreenModal.Body>
    </ScreenModal>
  );
}
