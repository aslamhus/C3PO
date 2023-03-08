import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useTipModal } from './useTipModal';
import { motion } from 'framer-motion';
import './tip-modal.css';

export default function TipModal() {
  const { state: tip } = useTipModal();
  if (!tip.show) {
    return null;
  }

  return (
    <motion.div className="tip-modal" style={tip.style}>
      {tip.content}
    </motion.div>
  );
}
