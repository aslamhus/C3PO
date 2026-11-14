import React from "react";
import { skippable, wait } from "@utils/global-game-actions";

export const questionIdentity = async (
  c3po,
  toggleControls,
  speak,
  askQuestion,
  dismissSpeechBubble,
  player,
  skippable,
) => {
  c3po.wave();
  const response = await skippable(
    askQuestion({
      question: (
        <>
          is that you, <span className="player">{player?.name}</span>?
        </>
      ),
      responses: [
        { title: "Yes", value: "Yes" },
        { title: "No", value: "No", autoFocus: true },
      ],
    }),
  );

  toggleControls(false);
  if (response == "Yes") {
    await c3po.rest();
    return true;
  }
  c3po.think();
  c3po.look("left");
  await speak("Oh... Sorry to have disturbed you.");

  await c3po.fret();
  await wait(1);
  await c3po.look("right");

  await c3po.look("left");
  await dismissSpeechBubble();
  await c3po.look("right");
  // clear wave otherwise the c3po timeline will not progress
  c3po.mainTimeline.clear();
  return false;
};
