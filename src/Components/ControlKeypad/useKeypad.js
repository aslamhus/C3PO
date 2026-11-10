import React, { useEffect, useRef, useState } from "react";
import MenuButton from "../UI/Buttons/MenuButton/MenuButton";
import gsap from "gsap";
import { CONTROL_STRIP_TYPE } from "../GameControl/hooks/useGameControl";

/**
 * Note on useKeypad imperative sneakiness.
 *
 * Becuase we are adding the letter case toggle button to
 * the parent GameControl component while maintaining the state of the
 * toggle button inside a child component (ControlKeypad),
 * the button in the parent context does not have access to the child component's state.
 * So we have to update the button every time the state is changed manually
 * so that its onclick handler sets the correct case.
 *
 * Why did we do this? Because we don't want to clutter GameControl's
 * controlStrip jsx with unecessary logic. There is probably a better way to do this
 * that balances clutter and sticks to a functional programming paradigm.
 *  But for now we are using this imperative trick.
 *
 */
export const useKeypad = (props) => {
  const { show, onPressChar, onLoad, disabled, setControlStripComponent } =
    props;
  const [loaded, setLoaded] = useState(false);
  const [charGroup, _setCharGroup] = useState("uppercase");
  const charGroupRef = useRef(charGroup);
  const keypadRef = useRef();

  const setCharGroup = (value) => {
    _setCharGroup(value);
    charGroupRef.current = value;
  };

  /**
   * Render control strip with keypad menu buttons
   */
  const renderControlStripComponent = (charGroup) => {
    setControlStripComponent(
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          gap: "0.5rem",
        }}
      >
        <MenuButton
          // className={charGroup == 'uppercase' || charGroup == 'lowercase' ? 'active' : ''}
          // onClick={toggleLetterCase}
          active={charGroup == "uppercase"}
          onClick={() => setCharGroup("uppercase")}
        >
          {/* {charGroup == 'lowercase' ? 'AZ' : 'az'} */}
          A-Z
        </MenuButton>
        <MenuButton
          active={charGroup == "numbers"}
          onClick={() => setCharGroup("numbers")}
        >
          123
        </MenuButton>
        <MenuButton
          className={charGroup == "punctuation" ? "active" : ""}
          onClick={() => setCharGroup("punctuation")}
        >
          #+=
        </MenuButton>
      </div>,
      CONTROL_STRIP_TYPE.SECONDARY,
    );
  };
  const renderMenuButtons = () => renderControlStripComponent(charGroup);

  const toggleLetterCase = () => {
    const newCase =
      charGroupRef.current == "uppercase" ? "lowercase" : "uppercase";
    setCharGroup(newCase);
  };

  const handlePressChar = (char, binary) => {
    if (onPressChar instanceof Function) {
      onPressChar(char, binary);
    }
  };

  const handleLoad = async () => {
    await gsap.fromTo(
      keypadRef.current,
      { opacity: 0, y: "+50%" },
      { opacity: 1, y: 0, duration: 1 },
    );
    renderMenuButtons();
    if (onLoad instanceof Function) {
      onLoad();
    }
  };

  useEffect(() => {
    if (show) {
      handleLoad();
    }
  }, [show]);

  useEffect(() => {
    // handleLoad();
    if (charGroup && show) {
      renderMenuButtons();
    }
  }, [charGroup]);

  return { charGroup, disabled, handlePressChar, keypadRef };
};
