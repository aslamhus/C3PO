import React, { useState, useRef, useEffect } from "react";
import ScreenModal from "../../UI/Modals/ScreenModal/ScreenModal";
import { fx, useGameSound } from "../../hooks/useGameSound";
import CreatePlayer from "./CreatePlayer";
import useSave from "../../GameSave/hooks/useSave";
import ChoosePlayer from "./ChoosePlayer";
import GameButton from "../../UI/Buttons/GameButton";
import { AnimatePresence, motion } from "framer-motion";
import useControlPad from "../../ControlPad/hooks/useControlPad";
import FocusListManager from "../../ControlPad/FocusListManager";
import FocusAttributeManager from "../../ControlPad/FocusAttributeManager";

export default function SelectPlayer({
  currentPlayer,
  onSelectPlayer,
  show,
  onClose,
}) {
  const [portal, setPortal] = useState(null);

  const selectPlayerRef = useRef(null);

  const { setCurrentFocus, currentFocusRef, getFocusContext } = useControlPad(
    "SelectPlayer",
    {
      up() {
        const prev = focusManagerRef.current.getPrevious();
        console.log("prev", prev);
        setCurrentFocus(prev);
      },
      down() {
        const next = focusManagerRef.current.getNext();
        console.log("next", next);
        setCurrentFocus(next);
      },
      right() {
        const currentEl = focusManagerRef.current.activeEl;
        if (currentEl && currentEl.classList.contains("save-file")) {
          // get dropdown
          const dropdownToggle = currentEl.querySelector(".dropdown-toggle");
          console.log("set current focus, dropdown", dropdownToggle);
          setCurrentFocus(dropdownToggle);
        }
      },
      left() {
        const currentEl = focusManagerRef.current.activeEl;
        if (currentEl && currentEl.classList.contains(".dropdown-toggle")) {
          setCurrentFocus(currentEl.closest(".save-file"));
        }
      },
      confirm() {
        console.log("click", currentFocusRef.current);
        currentFocusRef.current.click();
      },
      cancel() {},
    },
    show && selectPlayerRef.current,
  );

  const focusManagerRef = useRef(
    new FocusAttributeManager(selectPlayerRef, getFocusContext()),
  );

  const ref = (el) => {
    if (!el) return;
    setPortal(el);
  };

  const { createPlayer, saveFiles, hasSaves, removeSaveFile, savePlayer } =
    useSave();
  const [showCreatePlayerModal, setShowCreatePlayerModal] = useState(false);

  const handleClickNewPlayer = (event) => {
    setShowCreatePlayerModal(true);
  };
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
              ref={selectPlayerRef}
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "stretch",
              }}
            >
              {/* Choose player gets data focus index starting at 0 */}
              <ChoosePlayer
                saveFiles={saveFiles}
                onDeletePlayer={removeSaveFile}
                onSelectPlayer={handleSelectPlayer}
                currentPlayer={currentPlayer}
                focusContext={getFocusContext()}
              />
              {/* Game button gets focus index  */}
              <GameButton
                data-focus={saveFiles.length}
                data-focus-context={getFocusContext()}
                onClick={handleClickNewPlayer}
              >
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
