import React from "react";
import "./score-card.scss";

const ScoreCard = ({ level = 1.0, score = 0, children }) => {
  return (
    <div
      className="score-card"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding: "1rem",
        }}
      >
        <strong>Level {level.toFixed(1)}</strong>
        <div>Score {score}</div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default ScoreCard;
