import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import SplitButton from "react-bootstrap/SplitButton";
import ListGroup from "react-bootstrap/ListGroup";
import GameInput from "../../UI/Inputs/GameInput";
import GameButton from "../../UI/Buttons/GameButton";
import ConfirmModal from "../../UI/Modals/ConfirmModal/ConfirmModal";
import ConfirmContextProvider from "../../UI/Modals/ConfirmModal/context/ConfirmContextProvider";
import useConfirm from "../../UI/Modals/ConfirmModal/useConfirm";
import useControlPad from "../../ControlPad/hooks/useControlPad";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";
import FocusListManager from "../../ControlPad/FocusListManager";
import FocusAttributeManager from "../../ControlPad/FocusAttributeManager";

export default function ChoosePlayer({
  saveFiles,
  onDeletePlayer,
  onSelectPlayer,
  currentPlayer,
  focusContext,
}) {
  return (
    <>
      <ConfirmContextProvider>
        <ListGroup
          className="save-files"
          style={{
            maxHeight: "350px",
            overflow: "scroll",
            paddingBottom: "70px",
          }}
        >
          {saveFiles?.length &&
            saveFiles.map((saveFile, index) => {
              return (
                <SaveFileListItem
                  key={`file-${index}`}
                  focusContext={focusContext}
                  saveFile={saveFile}
                  onDeletePlayer={onDeletePlayer}
                  onSelectPlayer={onSelectPlayer}
                  index={index}
                  isCurrentPlayer={
                    currentPlayer?.getName() == saveFile.player.getName()
                  }
                />
              );
            })}
        </ListGroup>
      </ConfirmContextProvider>
    </>
  );
}

const SaveFileListItem = ({
  saveFile,
  onDeletePlayer,
  index,
  onSelectPlayer,
  isCurrentPlayer,
  autoFocus,
  focusContext,
}) => {
  const [active, setActive] = useState(false);
  const name = saveFile.player.getName();

  const handleMouseDown = (event) => {
    setActive(true);
  };

  const handleMouseUp = (event) => {
    setActive(false);
  };

  const handleClick = (event) => {
    if (onSelectPlayer instanceof Function) {
      onSelectPlayer(saveFile.player);
    }
  };

  const handleDropdownToggle = (show) => {
    setActive(show);
  };

  const saveFileListItemClassnames = classNames("save-file", {
    active: active,
  });

  return (
    <>
      <AnimatePresence>
        <motion.div
          role="button"
          exit={{ background: "red", opacity: 0, delay: 2 }}
          transition={{
            exit: { delay: 2, duration: 0.3 }, // Delays the exit animation by 0.5s
          }}
        >
          <ListGroup.Item
            as="div"
            data-focus={index}
            data-focus-context={focusContext}
            className={saveFileListItemClassnames}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={handleClick}
            style={{ display: "flex", alignItems: "center" }}
            tabIndex={-1}

            // active={isCurrentPlayer}
          >
            <strong style={{ flexGrow: 1 }}>{name}</strong>
            <div style={{ flexBasis: "30%", fontSize: "smaller" }}>
              Level {saveFile.player.getLevel().toFixed(1)}
            </div>
            <div>
              <DropdownMenu
                saveFile={saveFile}
                onDeletePlayer={onDeletePlayer}
                index={index}
                onDropdownToggle={handleDropdownToggle}
              />
            </div>
          </ListGroup.Item>
        </motion.div>
      </AnimatePresence>

      <ConfirmModal />
    </>
  );
};

const DropdownMenu = ({
  saveFile,
  onDeletePlayer,
  index,
  onDropdownToggle,
}) => {
  const { confirm: customConfirm } = useConfirm();

  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);
  // const focusListRef = useRef(new FocusListManager());

  // const setFocusList = () => {
  //   const items = dropdownRef.current.querySelectorAll(".dropdown-item");
  //   focusListRef.current.setList(items);
  // };

  const { setCurrentFocus, currentFocusRef, getFocusContext } = useControlPad(
    "DropdownMenu",
    {
      up() {
        setCurrentFocus(focusManagerRef.current.getPrevious());
      },
      down() {
        setCurrentFocus(focusManagerRef.current.getNext());
      },
      confirm() {
        currentFocusRef.current.click();
      },
      cancel() {
        console.log("cancel dropdown");
        setShowDropdown(false);
      },
    },
    showDropdown,
  );

  const focusManagerRef = useRef(
    new FocusAttributeManager(dropdownRef, getFocusContext()),
  );

  const handleToggle = (show, { originalEvent, source }) => {
    originalEvent.stopPropagation();
    originalEvent.preventDefault();
    setShowDropdown(show);
    onDropdownToggle(show, { originalEvent, source });
  };

  const handleClickDelete = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const didConfirm = await customConfirm(
      <>
        Are you sure you want to <span className="danger">delete</span> the
        player, <em>{saveFile.player.getName()}</em>?
      </>,
    );

    if (didConfirm && onDeletePlayer instanceof Function) {
      onDeletePlayer(saveFile, index);
    }
  };

  const handleSeeHistory = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  // useEffect(() => {
  //   if (!dropdownRef.current || !showDropdown) return;
  //   setFocusList();
  // }, [dropdownRef.current, showDropdown]);

  useEffect(() => {}, []);
  return (
    <>
      <Dropdown
        title={"options"}
        autoClose={"outside"}
        show={showDropdown}
        onToggle={handleToggle}
        onMouseDown={(event) => event.stopPropagation()}
        onMouseUp={(event) => event.stopPropagation()}
        ref={dropdownRef}
      >
        <Dropdown.Toggle
          variant="secondary"
          style={{ margin: 0 }}
          id="dropdown-custom"
        />
        <Dropdown.Menu>
          <Dropdown.Item
            data-focus={2}
            data-focus-context={getFocusContext()}
            className="danger"
            onClick={handleClickDelete}
          >
            Delete
          </Dropdown.Item>
          <Dropdown.Item
            data-focus={1}
            data-focus-context={getFocusContext()}
            onClick={handleSeeHistory}
          >
            See History
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
