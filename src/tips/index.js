import React from "react";
import tapGif from "@images/tap.gif";

export const tips = {
  clickToContinue: [
    <div>
      <img src={tapGif} />
    </div>,
    { style: { border: "" } },
  ],
  tapAnywhereToContinue: (
    <div>
      Tap anywhere to continue <img className="tap-gif-icon" src={tapGif} />
    </div>
  ),
};
