import React from "react";
import classNames from "classnames";
import ScreenModal from "../../../UI/Modals/ScreenModal/ScreenModal";
import useGameOptions from "../../hooks/useGameOptions";
import SoundOptions from "../SoundOptions";
import useSave from "../../../GameSave/hooks/useSave";
import useGamePlayer from "../../../GamePlayer/hooks/useGamePlayer";
import "./options-menu.scss";

export default function OptionsMenu() {
  const optionsMenuClassnames = classNames("options-menu");
  const { savePlayer } = useSave();
  const { player } = useGamePlayer();
  const saveOptionsOnClose = () => {
    savePlayer(player);
    setShowOptionsMenu(false);
  };
  const {
    state: { showOptionsMenu },
    setShowOptionsMenu,
  } = useGameOptions();

  return (
    <ScreenModal
      className={optionsMenuClassnames}
      show={showOptionsMenu}
      width="90%"
      height="90%"
      onClose={saveOptionsOnClose}
    >
      <ScreenModal.Header>
        <h2>Options</h2>
      </ScreenModal.Header>
      <ScreenModal.Body>
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <h2 style={{ textAlign: "center" }}>{player?.getName()}</h2>
            <SoundOptions />
          </div>
        </div>
      </ScreenModal.Body>
      <ScreenModal.Footer>
        <div className="screen-modal-card outline">
          <h4>Shortcuts</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "2rem",
            }}
          >
            <span>
              <em>F</em> - Full Screen
            </span>
            <span>
              <em>Spacebar</em> - Toggle Options
            </span>
          </div>
        </div>
        {/* <GameButton onClick={toggleFullScreen}>Full Screen</GameButton> */}
      </ScreenModal.Footer>
    </ScreenModal>
  );
}
