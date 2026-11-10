import React, { useCallback, useMemo } from "react";
import { debounce, throttle } from "lodash";

import Form from "react-bootstrap/Form";
import { useGameSound } from "../../hooks/useGameSound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolume,
  faVolumeHigh,
  faVolumeLow,
  faVolumeMedium,
  faVolumeMute,
  faVolumeOff,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";

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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <GainCard
          label="Music"
          gain={musicGain}
          name="music-gain"
          onChange={handleRangeChange}
        />
        <GainCard
          label="FX"
          gain={fxGain}
          name="fx-gain"
          onChange={handleRangeChange}
        />
      </div>{" "}
    </div>
  );
}

const GainCard = ({ label, gain, name, onChange }) => {
  return (
    <div
      className="screen-modal-card"
      style={{ flexBasis: "40%", flexGrow: 1 }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div>
          <Form.Label>{label}</Form.Label> <VolumeIcon gain={gain} />
        </div>
        {gain}
      </div>
      <Form.Range
        min={0}
        value={gain}
        step={0.01}
        max={2}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

const VolumeIcon = ({ gain }) => {
  const icon = useMemo(() => {
    let icon = faVolume;
    if (gain == 1) icon = faVolume;
    else if (gain == 0) icon = faVolumeXmark;
    else if (gain > 0 && gain < 0.75) icon = faVolumeLow;
    else if (gain >= 0.75 && gain < 1.5) icon = faVolumeMedium;
    else if (gain >= 1.5) icon = faVolumeHigh;

    return icon;
  }, [gain]);

  return <FontAwesomeIcon icon={icon} />;
};
