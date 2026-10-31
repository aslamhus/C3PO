import React, { useEffect, useRef } from "react";

import { beginAnimation } from "../stars-animation";
export default function SpaceBackground() {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;
    beginAnimation(ref.current);
  }, []);
  return (
    <canvas
      id="space-ctx"
      width="1920"
      height="1080"
      style={{ width: "100%", height: "100%" }}
      ref={ref}
    ></canvas>
  );
}
