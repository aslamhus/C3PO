import React, { useEffect, useRef, useState } from "react";
import spaceOverlay from "@images/space-overlay.jpg";
import spaceOverlay2 from "@images/space-overlay2.jpg";
import ConfirmButton from "../../UI/Buttons/ConfirmButton";
import { motion } from "framer-motion";
import SelectPlayer from "../../GamePlayer/Components/SelectPlayer";
import useGameOptions from "../../GameOptions/hooks/useGameOptions";
import { useGameSound } from "../../hooks/useGameSound";
import SpaceBackground from "./Components/SpaceBackground";
import "./game-start-screen.css";
import useGamePlayer from "../../GamePlayer/hooks/useGamePlayer";
import Player from "../../GamePlayer/Player";

export default function GameStartScreen({ onPressGameStart }) {
  const { player, setPlayer } = useGamePlayer();
  const { cueSoundFx, cueMusic, music } = useGameSound();
  const [showSelectPlayerModal, setShowSelectPlayerModal] = useState(false);

  const ref = useRef();

  /**
   * @param {Player} player
   */
  const handleSelectPlayer = (player) => {
    setPlayer(player);

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
      <div className="game-title">
        <h1>Star Wars</h1>
        <h2>Binary Decoder</h2>
        <SelectPlayer
          onSelectPlayer={handleSelectPlayer}
          show={showSelectPlayerModal}
          onClose={() => setShowSelectPlayerModal(false)}
          currentPlayer={player}
        />
        <ConfirmButton onClick={handleGameStart}>Start</ConfirmButton>
      </div>
    </motion.div>
  );
}
