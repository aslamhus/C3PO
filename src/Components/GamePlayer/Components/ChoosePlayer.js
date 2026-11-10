import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import SplitButton from "react-bootstrap/SplitButton";
import ListGroup from "react-bootstrap/ListGroup";
import GameInput from "../../UI/Inputs/GameInput";
import GameButton from "../../UI/Buttons/GameButton";
import ConfirmModal from "../../UI/Modals/ConfirmModal/ConfirmModal";
import ConfirmContextProvider from "../../UI/Modals/ConfirmModal/context/ConfirmContextProvider";
import useConfirm from "../../UI/Modals/ConfirmModal/useConfirm";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";
export default function ChoosePlayer({
  saveFiles,
  onDeletePlayer,
  onSelectPlayer,
  currentPlayer,
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
            className={saveFileListItemClassnames}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={handleClick}
            style={{ display: "flex", alignItems: "center" }}
            active={isCurrentPlayer}
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
  return (
    <>
      <Dropdown
        title={"options"}
        autoClose={true}
        show={showDropdown}
        onToggle={handleToggle}
        onMouseDown={(event) => event.stopPropagation()}
        onMouseUp={(event) => event.stopPropagation()}
      >
        <Dropdown.Toggle
          variant="secondary"
          style={{ margin: 0 }}
          id="dropdown-custom"
          // onClick={handleClickDropdownToggle}
        />
        <Dropdown.Menu>
          <Dropdown.Item className="danger" onClick={handleClickDelete}>
            Delete
          </Dropdown.Item>
          <Dropdown.Item>See History</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
