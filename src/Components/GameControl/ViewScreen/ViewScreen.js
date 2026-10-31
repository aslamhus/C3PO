import React from "react";
import "./view-screen.scss";

export default function ViewScreen({ on, children }) {
  return (
    <div
      className={`
        control-view-screen shadow
        ${on ? "on" : ""}
        `}
    >
      {children}
    </div>
  );
}
