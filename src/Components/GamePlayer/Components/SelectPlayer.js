import React, { useRef } from "react";
import GameInput from "../../UI/Inputs/GameInput";
import InputGroup from "../../UI/Inputs/InputGroup/InputGroup";
import ControlStripGroup from "../../GameControl/ControlStripGroup";
import ScreenModal from "../../UI/Modals/ScreenModal/ScreenModal";
import GameButton from "../../UI/Buttons/GameButton";
import { fx, useGameSound } from "../../hooks/useGameSound";
export default function SelectPlayer({ onSelect, show, onClose }) {
  const formRef = useRef();

  const { cueSoundFx, cueMusic } = useGameSound();

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("formRef validity", formRef.current.checkValidity());
    const formData = new FormData(formRef.current);
    if (formRef.current.checkValidity()) {
      handleFormSuccess(formData);
    } else {
      handleFormError();
    }
  };

  /**
   *
   * @param {FormData} formData
   */
  const handleFormSuccess = (formData) => {
    // console.log("handleFormScucess", formData);
    const data = {};
    formData.forEach((value, key) => {
      // console.log(value, key);
      data[key] = value;
    });
    if (onSelect instanceof Function) {
      onSelect(data);
    }
  };

  const handleFormError = () => {
    const inputs = formRef.current.querySelectorAll("input");
    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        // console.log("valid?", input, input.checkValidity());
        // input.setCustomValidity("hi boo");
      }
    });
    cueSoundFx(fx.error);
  };

  const handleSelect = (event) => {
    event.preventDefault();
    formRef.current.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true }),
    );
  };

  return (
    <div>
      <ScreenModal
        show={show}
        style={{ top: "50%" }}
        width="500px"
        onClose={onClose}
      >
        <ScreenModal.Body>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h4>Enter name</h4>
            <InputGroup
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <GameInput
                type="text"
                name="name"
                placeholder=""
                minLength="3"
                required
                autoComplete="country"
              />
            </InputGroup>
            <GameButton onClick={handleSelect}>OK</GameButton>
          </form>
        </ScreenModal.Body>
      </ScreenModal>
    </div>
  );
}
