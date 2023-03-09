import React from 'react';

export const GAME_CONTROL_ACTIONS = {
  toggleViewScreen: 'toggleViewScreen',
  toggleControls: 'toggleControls',
  toggleKeypad: 'toggleKeypad',
  setPrimaryControlStripComponent: 'setPrimaryControlStripComponent',
  setSecondaryControlStripComponent: 'setSecondaryControlStripComponent',
  beginGame: 'beginGame',
};

export const initialState = {
  state: 'initial',
  gameStart: false,
  viewScreen: false,
  controls: false,
  showKeypad: false,
  primaryControlStripComponent: null,
  secondaryControlStripComponent: null,
  onPressChar: null,
};

export const reducer = (state = initialState, action) => {
  const { options, payload, type } = action;
  switch (type) {
    case 'beginGame':
      console.log('begin game reducer action');
      return {
        ...state,
        gameStart: true,
      };
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
    case 'toggleKeypad':
      const [bool, options] = payload;
      return {
        ...state,
        showKeypad: bool,
        onPressChar: options?.onPressChar,
      };

    case 'setPrimaryControlStripComponent':
    case 'setSecondaryControlStripComponent':
      const { primaryControlStripComponent } = state;
      const update = {};
      const component = options?.overwrite ? (
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
