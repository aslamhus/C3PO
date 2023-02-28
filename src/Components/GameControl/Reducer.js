import React from 'react';

export const GAME_CONTROL_ACTIONS = {
  toggleViewScreen: 'toggleViewScreen',
  toggleControls: 'toggleControls',
  toggleTranslator: 'toggleTranslator',
  setPrimaryControlStripComponent: 'setPrimaryControlStripComponent',
  setSecondaryControlStripComponent: 'setSecondaryControlStripComponent',
};

export const initialState = {
  state: 'initial',
  viewScreen: false,
  controls: false,
  showTranslator: false,
  primaryControlStripComponent: null,
  secondaryControlStripComponent: null,
};

export const reducer = (state = initialState, action) => {
  const { options, payload, type } = action;
  switch (type) {
    case 'toggleViewScreen':
      return {
        ...state,
        viewScreen: payload,
      };
    case 'toggleControls':
      return {
        ...state,
        controls: payload,
      };
    case 'toggleTranslator':
      return {
        ...state,
        showTranslator: payload,
      };

    case 'setPrimaryControlStripComponent':
    case 'setSecondaryControlStripComponent':
      const { primaryControlStripComponent } = state;
      const update = {};
      const component = options.overwrite ? (
        payload
      ) : (
        <>
          {primaryControlStripComponent}
          {payload}
        </>
      );
      if (action.type == 'setPrimaryControlStripComponent') {
        update.primaryControlStripComponent = component;
      } else {
        update.secondaryControlStripComponent = component;
      }
      return {
        ...state,
        ...update,
      };

    default:
      return initialState;
  }
};
