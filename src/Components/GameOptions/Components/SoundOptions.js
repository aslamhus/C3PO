import React from "react";

import Form from "react-bootstrap/Form";
import { useGameSound } from "../../hooks/useGameSound";

export default function SoundOptions() {
  const { setMusicGain, setFXGain, musicGain, fxGain } = useGameSound();

  const handleRangeChange = (event) => {
    const { target } = event;

    switch (target.name) {
      case "music-gain":
        setMusicGain(target.value);
        break;
      case "fx-gain":
        setFXGain(target.value);
        break;
    }
  };
  return (
    <div>
      <h3>Volume</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ flexBasis: "50%" }}>
          <Form.Label>Music </Form.Label>
          <Form.Range
            min={0}
            value={musicGain}
            step={0.01}
            max={2}
            name="music-gain"
            onChange={handleRangeChange}
          />
        </div>
        <div style={{ flexBasis: "50%" }}>
          <Form.Label>Sound FX</Form.Label>
          <Form.Range
            min={0}
            value={fxGain}
            step={0.01}
            max={2}
            name="fx-gain"
            onChange={handleRangeChange}
          />
        </div>
      </div>{" "}
    </div>
  );
}
