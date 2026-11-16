import React, { useEffect, useRef } from "react";
import { useTipModal } from "./useTipModal";
import { AnimatePresence, motion } from "framer-motion";
import "./tip-modal.scss";

export default function TipModal() {
  const { state: tip, hideTip } = useTipModal();

  const { show, content, style, clickToHide, hideTimeout, hasTimedOut } =
    tip ?? {};
  const timeoutRef = useRef();

  const handleClickOutsideTip = (event) => {
    const { target } = event;
    if (
      target.classList.contains("tip-modal") ||
      target.closest(".tip-modal")
    ) {
      hideTip();
    }
  };

  const handleTimeout = () => {
    hideTip({ hasTimedOut: true });
  };

  useEffect(() => {
    if (clickToHide) {
      document.addEventListener("click", handleClickOutsideTip);
    }
    return () => {
      document.removeEventListener("click", handleClickOutsideTip);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (hideTimeout) {
      timeoutRef.current = setTimeout(handleTimeout, hideTimeout);
    }
  }, [show]);

  useEffect(() => {
    console.log("hasTimedOut", hasTimedOut);
  }, [hasTimedOut]);

  return (
    <AnimatePresence custom={hasTimedOut}>
      {show && (
        <motion.div
          custom={hasTimedOut}
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          variants={{
            exit: (hasTimedOut) => {
              return {
                opacity: 0,
                y: "50%",
                transition: { duration: hasTimedOut ? 1 : 0 },
              };
            },
          }}
          exit="exit"
          transition={{ duration: 1 }}
          className="tip-modal"
          style={style}
        >
          <div className="tip-body">{content}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
