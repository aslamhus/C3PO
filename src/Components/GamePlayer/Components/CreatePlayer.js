import React, { useRef, useState } from "react";
import Player from "../Player";
import InputGroup from "../../UI/Inputs/InputGroup/InputGroup";
import GameInput from "../../UI/Inputs/GameInput";
import GameButton from "../../UI/Buttons/GameButton";
import InputError from "../../UI/Inputs/InputError/InputError";
import { useGameSound } from "../../hooks/useGameSound";

export default function CreatePlayer({ onCreate, onCancel, isCancelDisabled }) {
  const formRef = useRef();

  const { cueSoundFx, fx } = useGameSound();
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("formRef validity", formRef.current.checkValidity());
    const formData = new FormData(formRef.current);
    if (formRef.current.checkValidity()) {
      submitSuccess(formData);
    } else {
      submitError();
    }
  };

  /**
   *
   * @param {FormData} formData
   */
  const submitSuccess = (formData) => {
    // console.log("handleFormScucess", formData);
    const data = {};
    formData.forEach((value, key) => {
      // console.log(value, key);
      data[key] = value;
    });
    try {
      if (onCreate instanceof Function) {
        onCreate(Player.fromObject(data));
      }
    } catch (error) {
      console.error(error);
      const input = formRef.current.querySelector("input[name='name']");
      input.setCustomValidity(error.message);
      input.reportValidity();
    }
  };

  const submitError = () => {
    const inputs = formRef.current.querySelectorAll("input");
    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        // console.log("valid?", input, input.checkValidity());
        // input.setCustomValidity("hi boo");
        setError(input.validationMessage);
      }
    });

    cueSoundFx(fx.error);
  };

  const handleClickOkBtn = (event) => {
    event.preventDefault();
    formRef.current.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true }),
    );
  };

  const handleClickCancelBtn = (event) => {
    event.preventDefault();
    if (onCancel instanceof Function) {
      onCancel();
    }
  };
  return (
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
      <div style={{ display: "flex" }}>
        {!isCancelDisabled && (
          <GameButton onClick={handleClickCancelBtn} className="btn-secondary">
            Cancel
          </GameButton>
        )}
        <GameButton onClick={handleClickOkBtn}>OK</GameButton>
      </div>
    </form>
  );
}
