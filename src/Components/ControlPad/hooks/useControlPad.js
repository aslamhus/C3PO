import { useContext, useEffect, useId, useState } from "react";
import { ControlPadContext } from "../Context/context";
import { tabWalk } from "../utils";

/**
 * Use Control Pad
 *
 * Control pad is not opinionated. You could choose to tabwalk through focus indices,
 * or you could have an array of react refs you cycle through on up or down actions,
 * calling setCurrentFocus on each.
 *
 * @param {string} scopeName
 * @param {Object} inputHandlers
 * @param {boolean} isActive
 * @returns
 */
export default function useControlPad(scopeName, inputHandlers, isActive) {
  const [controlPadManagerRef, currentFocusRef] = useContext(ControlPadContext);
  const id = useId();
  const [uniqueScopeName] = useState(`${scopeName}-${id}`);

  /**
   * @param {HTMLElement} el
   * @returns
   */
  const setCurrentFocus = (el) => {
    if (!(el instanceof HTMLElement)) {
      console.warn("Failed to set current focus, element was not found", el);
      return;
    }
    currentFocusRef.current = el;
    el.focus();
  };

  const pop = () => {
    controlPadManagerRef.current.pop(uniqueScopeName, inputHandlers);
  };

  const push = () => {
    controlPadManagerRef.current.push(uniqueScopeName, inputHandlers);
  };

  const nextTab = () => {
    currentFocusRef.current = tabWalk(1);
  };

  const previousTab = () => {
    currentFocusRef.current = tabWalk(-1);
  };

  const getFocusContext = () => uniqueScopeName;

  useEffect(() => {
    if (isActive) {
      push();
    } else {
      pop();
    }
  }, [isActive]);

  useEffect(() => {
    return () => pop();
  }, []);

  return {
    nextTab,
    previousTab,
    setCurrentFocus,
    currentFocusRef,
    getFocusContext,
  };
}
