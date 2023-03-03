import React from 'react';
import spaceOverlay from '@images/space-overlay.jpg';
import spaceOverlay2 from '@images/space-overlay2.jpg';
import ConfirmButton from '../UI/Buttons/ConfirmButton';
import { motion } from 'framer-motion';
import './game-start-screen.css';

export default function GameStartScreen({ onPressGameStart }) {
  const variants = {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
      transition: { duration: 1 },
    },
    exit: {
      y: '-100%',
      opacity: 0,
      transition: { duration: 2 },
    },
  };
  const handleGameStart = (event) => {
    if (onPressGameStart instanceof Function) {
      onPressGameStart();
    }
  };

  return (
    <motion.div
      variants={variants}
      exit="exit"
      className="game-start-screen"
      initial="initial"
      animate="enter"
      transition={{ duration: 1 }}
    >
      <div className="space-overlay" style={{ backgroundImage: `url(${spaceOverlay})` }}></div>
      <div
        className="space-overlay distant-stars"
        style={{ backgroundImage: `url(${spaceOverlay2})` }}
      ></div>
      <div className="game-title">
        <h1>Star Wars</h1>
        <h2>Binary Decoder</h2>

        <ConfirmButton onClick={handleGameStart}>Start</ConfirmButton>
      </div>
    </motion.div>
  );
}
