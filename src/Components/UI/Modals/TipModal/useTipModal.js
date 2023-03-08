import React from 'react';
import { TipContext } from './context/context';
import { TIP_ACTIONS } from './Reducer';

export const useTipModal = () => {
  const [state, dispatch] = React.useContext(TipContext);

  /**
   *Show tip
   * @param {React.Component} component - optional component to set as content
   */
  const showTip = (component, options) => {
    const { style } = options;
    dispatch({ type: TIP_ACTIONS.show, payload: { component, style } });
  };

  const hideTip = () => dispatch({ type: TIP_ACTIONS.hide });

  return {
    state,
    showTip,
    hideTip,
  };
};
