import React from "react";
import { createPortal } from "react-dom";
import ScreenModal from "../ScreenModal/ScreenModal";
import useConfirm from "./useConfirm";
import "./custom-confirm.scss";

export default function ConfirmModal({ className }) {
  const { onConfirm, onCancel, confirmState, show } = useConfirm();

  const Component = confirmState.show && (
    <ScreenModal
      show={true}
      className={`custom-confirm ${className || ""}`}
      overlay
      closeOnOverlayClick
      dismissible={false}
      onClose={onCancel}
      variant="auto"
    >
      {/* Only show header if both title and body are specified */}
      {confirmState?.options?.body && (
        <ScreenModal.Header>
          <strong>{confirmState?.title}</strong>
        </ScreenModal.Header>
      )}
      <ScreenModal.Body>
        {/* If a title and body aren't specified, just show title in the body of the message */}
        {!confirmState?.options?.body && (
          <div className="confirm-body">{confirmState?.title}</div>
        )}
        {confirmState?.title && confirmState?.options?.body && (
          <div className="confirm-body">{confirmState?.options?.body}</div>
        )}
        <div className="custom-confirm-buttons-container">
          <button id="cc-btn-cancel" onClick={onCancel}>
            {confirmState?.options?.cancelValue || "Cancel"}
          </button>
          <button id="cc-btn-confirm" onClick={onConfirm}>
            {confirmState?.options?.confirmValue || "Confirm"}
          </button>
        </div>
      </ScreenModal.Body>
    </ScreenModal>
  );

  return Component;
}
