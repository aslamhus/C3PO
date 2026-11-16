import React from "react";
import { TipContext } from "./context/context";
import { TIP_ACTIONS } from "./Reducer";

export const useTipModal = () => {
  const [state, dispatch] = React.useContext(TipContext);

  /**
   *Show tip
   * @param {React.Component} component - optional component to set as content
   */
  const showTip = (
    component,
    options = { style: {}, clickToHide: false, hideTimeout: 1500 },
  ) => {
    dispatch({ type: TIP_ACTIONS.show, payload: { component, options } });
  };

  const hideTip = (options = { hasTimedOut: false }) => {
    dispatch({ type: TIP_ACTIONS.hide });
    if (options?.hasTimedOut) {
      dispatch({ type: TIP_ACTIONS.setHasTimedOut, payload: true });
    }
  };

  return {
    state,
    showTip,
    hideTip,
  };
};
