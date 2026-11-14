import React, { useRef } from "react";
import { createPortal } from "react-dom";
import ScreenModal from "../ScreenModal/ScreenModal";
import useConfirm from "./useConfirm";
import "./custom-confirm.scss";
import useControlPad from "../../../ControlPad/hooks/useControlPad";
import FocusAttributeManager from "../../../ControlPad/FocusAttributeManager";

export default function ConfirmModal({ className }) {
  const { onConfirm, onCancel, confirmState, show } = useConfirm();
  const modalRef = useRef();
  const { setCurrentFocus, currentFocusRef, getFocusContext } = useControlPad(
    "ConfirmModal",
    {
      right() {
        setCurrentFocus(focusManagerRef.current.getPrevious());
      },
      left() {
        setCurrentFocus(focusManagerRef.current.getNext());
      },
      confirm() {
        currentFocusRef.current.click();
      },
      cancel() {
        onCancel();
      },
    },
    confirmState.show,
  );

  const focusManagerRef = useRef(
    new FocusAttributeManager(modalRef, getFocusContext()),
  );

  const Component = confirmState.show && (
    <ScreenModal
      show={true}
      className={`custom-confirm ${className || ""}`}
      overlay
      closeOnOverlayClick
      dismissible={false}
      onClose={onCancel}
      variant="auto"
      ref={modalRef}
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
          <button
            id="cc-btn-cancel"
            onClick={onCancel}
            data-focus={0}
            data-focus-context={getFocusContext()}
          >
            {confirmState?.options?.cancelValue || "Cancel"}
          </button>
          <button
            id="cc-btn-confirm"
            onClick={onConfirm}
            data-focus={1}
            data-focus-auto={true}
            data-focus-context={getFocusContext()}
          >
            {confirmState?.options?.confirmValue || "Confirm"}
          </button>
        </div>
      </ScreenModal.Body>
    </ScreenModal>
  );

  return Component;
}
