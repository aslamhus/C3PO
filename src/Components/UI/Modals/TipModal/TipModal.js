import React, { useEffect } from 'react';
import { useTipModal } from './useTipModal';
import { motion } from 'framer-motion';
import './tip-modal.css';

export default function TipModal() {
  const { state: tip, hideTip } = useTipModal();

  useEffect(() => {
    document.addEventListener('click', hideTip);
    return () => {
      document.removeEventListener('click', hideTip);
    };
  }, []);

  if (!tip.show) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="tip-modal"
      style={tip?.style}
    >
      {tip.content}
    </motion.div>
  );
}
