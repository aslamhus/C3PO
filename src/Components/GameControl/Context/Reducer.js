import React from "react";

export const GAME_CONTROL_ACTIONS = {
  toggleViewScreen: "toggleViewScreen",
  toggleControls: "toggleControls",
  toggleKeypad: "toggleKeypad",
  setPrimaryControlStripComponent: "setPrimaryControlStripComponent",
  setSecondaryControlStripComponent: "setSecondaryControlStripComponent",
  setTertiaryControlStripComponent: "setTertiaryControlStripComponent",
  setCustomViewScreenComponents: "setCustomViewScreenComponents",
  addCustomViewScreenComponent: "addCustomViewScreenComponent",
  beginGame: "beginGame",
  endGame: "endGame",
  setDisabledKeys: "setDisabledKeys",
  setEnabledKeys: "setEnabledKeys",
  disableKeypad: "disableKeypad",
  resetKeypad: "resetKeypad",
};

export const initialState = {
  state: "initial",
  gameStart: false,
  viewScreen: false,
  controls: false,
  primaryControlStripComponent: null,
  secondaryControlStripComponent: null,
  tertiaryControlStripComponent: null,
  onPressChar: null,
  disabledKeys: {},
  showKeypad: false,
  keypadDisabled: false,
  customViewScreenComponents: [],
};

export const reducer = (state = initialState, action) => {
  const { options, payload, type } = action;
  switch (type) {
    case "beginGame":
      return {
        ...state,
        gameStart: true,
      };
    // end game and reset state
    case "endGame":
      return initialState;
    case "toggleViewScreen":
      return {
        ...state,
        viewScreen: payload,
      };
    case "toggleControls":
      return {
        ...state,
        controls: payload,
      };
    case "toggleKeypad":
      const [bool, options] = payload;
      return {
        ...state,
        showKeypad: bool,
        onPressChar: options?.onPressChar,
      };

    case "setPrimaryControlStripComponent":
    case "setSecondaryControlStripComponent":
    case "setTertiaryControlStripComponent":
      const {
        primaryControlStripComponent,
        secondaryControlStripComponent,
        tertiaryControlStripComponent,
      } = state;
      const update = {};
      const overwrite = action?.options?.overwrite ?? false;
      switch (action?.type) {
        case GAME_CONTROL_ACTIONS.setPrimaryControlStripComponent:
          update.primaryControlStripComponent = (
            <ControlStripComponent
              component={payload}
              prevComponent={primaryControlStripComponent}
              overwrite={overwrite}
            />
          );

          break;
        case GAME_CONTROL_ACTIONS.setSecondaryControlStripComponent:
          update.secondaryControlStripComponent = (
            <ControlStripComponent
              component={payload}
              prevComponent={secondaryControlStripComponent}
              overwrite={overwrite}
            />
          );
          break;
        case GAME_CONTROL_ACTIONS.setTertiaryControlStripComponent:
          update.tertiaryControlStripComponent = (
            <ControlStripComponent
              component={payload}
              prevComponent={tertiaryControlStripComponent}
              overwrite={overwrite}
            />
          );
          break;
      }

      return {
        ...state,
        ...update,
      };

    case "setEnabledKeys":
    case "setDisabledKeys":
      const newDisabledKeys = action.payload.reduce((acc, value) => {
        acc[value] = action.type == "setEnabledKeys" ? false : true;
        return acc;
      }, {});
      return {
        ...state,
        disabledKeys: { ...state.disabledKeys, ...newDisabledKeys },
      };

    case GAME_CONTROL_ACTIONS.resetKeypad:
      return {
        ...state,
        keypadDisabled: false,
        disabledKeys: {},
      };

    case "disableKeypad":
      return {
        ...state,
        keypadDisabled: action.payload,
      };

    case "setCustomViewScreenComponents":
      return {
        ...state,
        customViewScreenComponents: payload,
      };

    case "addCustomViewScreenComponent":
      return {
        ...state,
        customViewScreenComponents: [
          ...state.customViewScreenComponents,
          payload,
        ],
      };

    default:
      return initialState;
  }
};

const ControlStripComponent = ({ overwrite, component, prevComponent }) => {
  return (
    <>
      {overwrite ? (
        component
      ) : (
        <>
          {prevComponent}
          {component}
        </>
      )}
    </>
  );
};
