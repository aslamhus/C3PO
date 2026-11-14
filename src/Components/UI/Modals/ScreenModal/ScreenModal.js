import React, { useEffect, useState, useRef } from "react";
import ScreenModalBody from "./Components/ScreenModalBody";
import ScreenModalFooter from "./Components/ScreenModalFooter";
import ScreenModalHeader from "./Components/ScreenModalHeader";
import classNames from "classnames";
import gsap from "gsap";
import "./screen-modal.scss";
import { createPortal } from "react-dom";
import { useGameStage } from "../../../GameStage/hooks/useGameStage";

const renderChildren = (children) => {
  let elements = {
    [ScreenModalHeader.name]: [],
    [ScreenModalBody.name]: [],
    [ScreenModalFooter.name]: [],
  };

  React.Children.forEach(children, (child) => {
    if (elements.hasOwnProperty(child?.type?.name)) {
      elements[child.type.name].push(child);
    }
  });
  return (
    <>
      {elements[ScreenModalHeader.name] ?? [].map((Element) => <Element />)}
      {elements[ScreenModalBody.name] ?? [].map((Element) => <Element />)}
      {elements[ScreenModalFooter.name] ?? [].map((Element) => <Element />)}
    </>
  );
};

/**
 * Screen Modal
 *
 * @typedef {object} ScreenModalProps
 * @property {string} show
 * @property {string} className
 * @property {Function} onShow
 * @property {Function} onClose
 * @property {boolean} overlay
 * @property {boolean} closeOnOverlayClick
 * @property {boolean} animate
 * @property {boolean} closeAllMenusOnOverlayClick
 * @property {number} width
 * @property {number} height
 * @property {HTMLElement} portal
 *
 *
 *
 */
const ScreenModal = React.forwardRef(
  /**
   * @param {ScreenModalProps} props
   * @param {React.RefObject} ref
   * @returns {JSX.Element}
   */
  function ScreenModal(
    {
      show: _controlledShow,
      className,
      onClose,
      onShow,
      children,
      overlay = true,
      closeOnOverlayClick = true,
      closeAllMenusOnOverlayClick = false,
      width,
      height,
      animate = true,
      portal, // add it to any container (defaults to gamestage)
    },
    forwardRef,
  ) {
    const [show, setShow] = useState(_controlledShow ?? false);
    const [mounted, setMounted] = useState(false);
    const ref = useRef();

    const getOverlay = () => ref.current;
    const getWrapper = () => ref.current?.firstElementChild;
    const getScreenModalContainer = () =>
      ref.current?.firstElementChild.firstElementChild;
    const screenModalClassName = classNames(
      "screen-modal screen-modal-dialog",
      className,
      {
        "screen-modal-show": show,
        "screen-modal-overlay": overlay,
      },
    );

    const handleShow = (event) => {
      animateIn();
      gameStage.blur();
      if (onShow instanceof Function) {
        onShow();
      }
    };

    const handleClose = () => {
      animateOut();
      unblurGameStage();
      if (onClose instanceof Function) {
        onClose();
      }
    };

    const handleClickOverlay = (event) => {
      const { target } = event;
      if (!target.classList.contains("screen-modal-overlay")) return;
      event.preventDefault();

      if (!closeAllMenusOnOverlayClick) {
        event.stopPropagation();
      }
      if (!event.target.classList.contains("screen-modal-dialog")) return;
      if (overlay && closeOnOverlayClick) {
        setShow(false);
      }
    };

    const unblurGameStage = () => {
      // only unblur game stage if all the modals with an overlay are hidden
      const modals = document.body.querySelectorAll(
        ".screen-modal[data-has-overlay='true'][data-show='true']",
      );
      if (!modals?.length) {
        gameStage.unBlur();
      }
    };

    const gameStage = useGameStage();

    const animateIn = () => {
      gsap.set(getWrapper(), { overflowY: "hidden" });
      gsap.to(getOverlay(), {
        opacity: 1,
        pointerEvents: "all",
      });
      gsap.to(getWrapper(), {
        height: height ?? "auto",
        pointerEvents: "all",
        opacity: 1,
        duration: 0.5,
        onComplete: () => {
          gsap.set(getWrapper(), {
            overflowY: "scroll",
          });
        },
      });
    };

    const animateOut = () => {
      gsap.set(getWrapper(), { overflowY: "hidden" });
      gsap.to(getOverlay(), {
        opacity: 0,

        pointerEvents: "none",
      });
      gsap.to(getWrapper(), {
        opacity: 1,
        duration: 0.2,
        height: "0",
        pointerEvents: "none",
      });
    };

    const resetAnimation = () => {
      gsap.set(getOverlay(), {
        opacity: 0,
        pointerEvents: "none",
      });

      gsap.set(getWrapper(), {
        height: 0,
        pointerEvents: "none",
      });
      gsap.set(getWrapper(), { overflowY: "hidden" });
    };

    useEffect(() => {
      // if (!mounted) return;
      if (show) {
        console.log("show");
        handleShow();
      } else {
        handleClose();
      }
    }, [show]);

    useEffect(() => {
      setShow(_controlledShow);
    }, [_controlledShow]);

    useEffect(() => {
      if (!gameStage.state.loaded) return;
      if (ref.current) {
        resetAnimation();
        if (show) {
          animateIn();
        }
      }
    }, [ref.current, gameStage.state.loaded]);

    useEffect(() => {
      return () => {
        unblurGameStage();
      };
    }, []);

    if (!gameStage.state.loaded) return null;

    return (
      <>
        {show &&
          createPortal(
            <div
              className={screenModalClassName}
              ref={ref}
              onClick={handleClickOverlay}
              data-has-overlay={overlay}
              data-show={show}
            >
              {/* Animate the height of the screen modal wrapper, not the modal container
          this allows us to add padding to the container. If padding is given to the height
          animated wrapper, it will still be visible even with height 0 */}
              <div
                className="screen-modal-wrapper"
                style={{ width: width ?? "auto", height: height ?? "auto" }}
              >
                <div
                  className="screen-modal-container"
                  style={{ height: "100%" }}
                  ref={forwardRef}
                >
                  {renderChildren(children)}
                </div>
              </div>
            </div>,

            portal ?? document.querySelector(".app"),
          )}
      </>
    );
  },
);

ScreenModal.Header = ScreenModalHeader;
ScreenModal.Body = ScreenModalBody;
ScreenModal.Footer = ScreenModalFooter;

export default ScreenModal;
