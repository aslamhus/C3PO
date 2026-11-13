import React from "react";
import { TipContext } from "./context/context";
import { TIP_ACTIONS } from "./Reducer";

export const useTipModal = () => {
  const [state, dispatch] = React.useContext(TipContext);

  /**
   *Show tip
   * @param {React.Component} component - optional component to set as content
   */
  const showTip = (component, options = { style: {} }) => {
    dispatch({ type: TIP_ACTIONS.show, payload: { component, ...options } });
  };

  /**
   * @param {Event} event
   */
  const hideTip = (event) => {
    const { target } = event;
    if (
      target.classList.contains("tip-modal") ||
      target.closest(".tip-modal")
    ) {
      console.log("hide tip", target);
      dispatch({ type: TIP_ACTIONS.hide });
    }
  };

  return {
    state,
    showTip,
    hideTip,
  };
};
