import React from "react";
import "./rotate-your-device.scss";
import useMediaQuery from "../../hooks/useMediaQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faRightLong,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

export default function RotateYourDevice() {
  const isLandscape = useMediaQuery("(orientation: landscape)");

  if (isLandscape) return;
  return (
    <div className="rotate-your-device">
      <div>
        <div id="mobile-phone"></div>
        <p>
          <FontAwesomeIcon icon={faRotateRight} />
        </p>
      </div>
    </div>
  );
}
