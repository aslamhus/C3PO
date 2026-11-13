import React from "react";
import { skippable } from "@utils/global-game-actions";

export const questionIdentity = async (
  c3po,
  toggleControls,
  speak,
  askQuestion,
  dismissSpeechBubble,
  player,
  skippable,
) => {
  skippable(c3po.wave());
  const response = await skippable(
    askQuestion({
      question: (
        <>
          is that you, <span className="player">{player?.name}</span>?
        </>
      ),
      responses: [
        { title: "Yes", value: "Yes" },
        { title: "No", value: "No" },
      ],
    }),
  );

  toggleControls();
  if (response == "Yes") {
    await c3po.rest();
    return true;
  }
  await speak("Oh... Sorry to have disturbed you.");

  await dismissSpeechBubble();

  return false;
};
