import React, { useEffect, useRef, useState } from "react";
import spaceOverlay from "@images/space-overlay.jpg";
import spaceOverlay2 from "@images/space-overlay2.jpg";
import ConfirmButton from "../../UI/Buttons/ConfirmButton";
import { motion } from "framer-motion";
import SelectPlayer from "../../GamePlayer/Components/SelectPlayer";
import { useGameSound } from "../../hooks/useGameSound";
import SpaceBackground from "./Components/SpaceBackground";
import "./game-start-screen.css";
import useGamePlayer from "../../GamePlayer/hooks/useGamePlayer";
import Player from "../../GamePlayer/Player";
import C3POAssets from "../C3PO/assets";
import usePreload from "../../hooks/usePreload";

export default function GameStartScreen({ onPressGameStart, isMobile }) {
  const { player, setPlayer } = useGamePlayer();
  const { cueSoundFx, cueMusic, music } = useGameSound();
  const [showSelectPlayerModal, setShowSelectPlayerModal] = useState(false);
  const { preload, resolverRef } = usePreload(C3POAssets);
  const ref = useRef();

  /**
   * @param {Player} player
   */
  const handleSelectPlayer = async (player) => {
    setPlayer(player);
    await resolverRef.current;
    if (onPressGameStart instanceof Function) {
      onPressGameStart(player);
    }
  };

  const variants = {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
      transition: { duration: 1 },
    },
    exit: {
      y: "-100%",
      opacity: 0,
      transition: { duration: 0, ease: "linear" },
      // transition: { duration: 3, ease: 'linear' },
    },
  };
  const handleGameStart = (event) => {
    setShowSelectPlayerModal(true);
  };

  useEffect(() => {
    cueMusic(music.binarySunet);
  }, [ref.current]);

  useEffect(() => {
    preload();
  }, []);

  return (
    <motion.div
      variants={variants}
      exit="exit"
      className="game-start-screen"
      initial="initial"
      animate="enter"
    >
      <SpaceBackground />
      <div
        className="space-overlay"
        style={{ backgroundImage: `url(${spaceOverlay})` }}
      ></div>
      <div
        className="space-overlay distant-stars"
        style={{ backgroundImage: `url(${spaceOverlay2})` }}
      ></div>
      <div className="game-start-screen-title">
        <h1>Star Wars</h1>
        <h2>Binary Decoder</h2>
        <SelectPlayer
          onSelectPlayer={handleSelectPlayer}
          show={showSelectPlayerModal}
          onClose={() => setShowSelectPlayerModal(false)}
          currentPlayer={player}
        />
        <ConfirmButton autoFocus={true} onClick={handleGameStart}>
          Start
        </ConfirmButton>
      </div>
      {!isMobile && (
        <div className="game-start-screen-footer">
          -- Press <em>SPACEBAR</em> for options --
        </div>
      )}
    </motion.div>
  );
}
