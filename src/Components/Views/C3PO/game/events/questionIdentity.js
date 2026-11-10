import React from "react";

export const questionIdentity = async (
  c3po,
  toggleControls,
  speak,
  askQuestion,
  dismissSpeechBubble,
  player,
) => {
  c3po.wave();
  const response = await askQuestion({
    question: (
      <>
        is that you, <span className="player">{player?.name}</span>?
      </>
    ),
    responses: [
      { title: "Yes", value: "Yes" },
      { title: "No", value: "No" },
    ],
  });
  toggleControls();
  if (response == "Yes") {
    await c3po.rest();
    return true;
  } else {
    await speak("Oh... Sorry to have disturbed you.");
    dismissSpeechBubble();
  }
  return false;
};
