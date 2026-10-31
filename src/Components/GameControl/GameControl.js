import React, { useEffect } from "react";

import Clock from "./Clock/Clock";
import Radar from "./Radar";
import ControlStripGroup from "./ControlStripGroup";
import ViewScreen from "./ViewScreen/ViewScreen";
import AskQuestion from "./AskQuestion/AskQuestion";
import ControlKeypad from "../ControlKeypad/ControlKeypad";
import { useGame } from "../hooks/useGame";
import OptionsMenu from "../GameOptions/Components/OptionsMenu/OptionsMenu";
import "./game-control.css";

/**
 * GameControl
 *
 * @component
 */
export default function GameControl({ children }) {
  const { stage, control } = useGame();

  const renderCustomViewScreenComponents = (components) => {
    if (!components || components.length == 0) return null;
    return components?.map((component, index) => {
      return React.cloneElement(component, { key: index });
    });
  };

  useEffect(() => {
    if (stage.state.loaded) {
      control.setControlStripComponent(<Clock />, "secondary");
    }
  }, [stage.state.loaded]);

  /**
   * Update game stage constraints when controls are toggled
   */
  useEffect(() => {
    if (control.state?.controls) {
      // update constraints

      stage.setConstraints({ x: [0, "50%"], y: [0, "100%"] });
    } else {
      // reset constraints
      stage.setConstraints({ x: [0, "100%"], y: [0, "100%"] });
    }
  }, [control?.state?.controls]);

  return (
    <>
      <OptionsMenu />
      <div
        className={`game-control-flex-wrap ${control.state?.controls ? " show" : " hide"}`}
      >
        <div className={`game-control-container`}>
          <div className="game-control-edge"></div>
          <div className="game-control">
            <div className="control-row">
              <ControlStripGroup className="shadow">
                {control.state?.primaryControlStripComponent}
              </ControlStripGroup>
              <Radar className="shadow" />
            </div>
            <ViewScreen on={control.state.viewScreen}>
              {/* Custom view screen components */}
              {renderCustomViewScreenComponents(
                control.state?.customViewScreenComponents,
              )}
              {/* Show Ask Question */}
              {!control.state.showKeypad && <AskQuestion />}
              {/* Show Keypad */}
              <ControlKeypad
                disabled={control.state.keypadDisabled}
                show={control.state.showKeypad}
                // onLoad={keypad.renderMenuButtons}
                charGroup={"lowercase"}
                disabledKeys={control.state?.disabledKeys}
                onPressChar={(char, binary) => {
                  /**
                   * Any component can set the pressChar handler
                   * using the game control context when using the method
                   * toggleKeypad. See useGameControl.
                   *
                   * For instance, when you call toggleControls
                   * you can specify the onPressChar method:
                   *
                   * control.toggleKeypad(true, { onPressChar: myFunc });
                   *
                   * Eventually this should be handled by ControlKeypad's context.
                   */
                  control.state?.onPressChar(char, binary);
                }}
              />
              {children}
            </ViewScreen>
            <div className="control-row">
              <Radar className="shadow" />
              <ControlStripGroup className="shadow">
                {control.state?.secondaryControlStripComponent}
              </ControlStripGroup>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
