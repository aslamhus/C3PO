import React, { useState, useRef, useEffect } from "react";
import ScreenModal from "../../UI/Modals/ScreenModal/ScreenModal";
import { fx, useGameSound } from "../../hooks/useGameSound";
import CreatePlayer from "./CreatePlayer";
import useSave from "../../GameSave/hooks/useSave";
import ChoosePlayer from "./ChoosePlayer";
import GameButton from "../../UI/Buttons/GameButton";
import { AnimatePresence, motion } from "framer-motion";

export default function SelectPlayer({
  currentPlayer,
  onSelectPlayer,
  show,
  onClose,
}) {
  const { cueSoundFx, cueMusic } = useGameSound();
  const [portal, setPortal] = useState(null);

  const ref = (el) => {
    if (!el) return;
    setPortal(el);
  };

  const { createPlayer, saveFiles, hasSaves, removeSaveFile, savePlayer } =
    useSave();
  const [showCreatePlayerModal, setShowCreatePlayerModal] = useState(false);

  const handleCreateNewPlayer = (player) => {
    createPlayer(player);
    onSelectPlayer(player);
  };

  const handleSelectPlayer = (player) => {
    savePlayer(player);
    onSelectPlayer(player);
  };

  const handleCloseModal = () => {
    setShowCreatePlayerModal(false);
    if (onClose instanceof Function) {
      onClose();
    }
  };

  return (
    <div>
      <ScreenModal
        show={show}
        style={{ top: "50%" }}
        width="500px"
        onClose={handleCloseModal}
        ref={ref}
      >
        <ScreenModal.Header>
          <h3>Choose Player</h3>
        </ScreenModal.Header>
        <ScreenModal.Body>
          {hasSaves && !showCreatePlayerModal && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "stretch",
              }}
            >
              <ChoosePlayer
                saveFiles={saveFiles}
                onDeletePlayer={removeSaveFile}
                onSelectPlayer={handleSelectPlayer}
                currentPlayer={currentPlayer}
              />
              <GameButton onClick={() => setShowCreatePlayerModal(true)}>
                New Player
              </GameButton>
            </div>
          )}
          {(showCreatePlayerModal || !hasSaves) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              // exit={{ opacity: 0 }}
            >
              <CreatePlayer
                onCreate={handleCreateNewPlayer}
                onCancel={() => setShowCreatePlayerModal(false)}
                isCancelDisabled={!hasSaves}
              />
            </motion.div>
          )}
        </ScreenModal.Body>
      </ScreenModal>
    </div>
  );
}
