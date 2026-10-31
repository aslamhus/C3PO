import React from "react";
import { speed } from "@config";

export const startGameInstruction = async ({
  c3po,
  speak,
  askQuestion,
  dismissSpeechBubble,
  showBinary,
  toggleKeypad,
  player,
}) => {
  await c3po.animate(c3po.body, { rotate: 0, duration: 0.5 * speed });
  await c3po.animate(c3po.bodyParts.rightShoulder.arm, { rotate: "20deg" });
  await c3po.walk(-40, { steps: 9, duration: 3 * speed });
  // look around?
  await speak(
    <>
      <span style={{ color: "red" }}>{player?.name}</span>, I need your help to
      decode a message from <span style={{ color: "red" }}>Yasmine Chachi</span>
    </>,
  );
  await speak(
    <>
      Normally, I'd ask <span style={{ color: "blue" }}>R2D2 to help.</span>
    </>,
  );

  await speak("But I can't find him anywhere!");
  await speak("Oh, where has that troublesome rustbucket got to now!?");

  await dismissSpeechBubble();
  await c3po.proposeIdea();
  const response = await askQuestion({
    question: (
      <>
        <span style={{ color: "red" }}>Sylvan</span>, will you help me decode
        the message?
      </>
    ),
    responses: [
      { title: "Okay", value: "Okay" },
      { title: "No", value: "No" },
    ],
  });
  if (response == "Okay") {
    c3po.stop();
    c3po.rest();
    await speak("Thank the maker!");
    await showBinary();
    await speak(
      <>
        The code is written in
        <span style={{ color: "green", fontStyle: "italic" }}>binary</span>.
      </>,
      { tapToContinue: true },
    );

    c3po.think();

    await speak(
      <>
        Oh! My circuits are full of sand from walking around this dreadful
        desert!
      </>,
      { tapToContinue: true },
    );
    await speak(
      <>
        It seems my <span className="battery">battery</span> won't last much
        longer!
      </>,
      { tapToContinue: true },
    );

    await c3po.fret();
    // await wait(1 * speed);

    c3po.breathe();
    await speak(
      <>
        Please help me decode the message before my{" "}
        <span className="battery">battery</span> runs out!
      </>,
    );
    await toggleKeypad();
    await speak(
      <>
        We can decode the message by{" "}
        <span style={{ color: "green" }}>guessing the letters!</span>{" "}
      </>,
      { tapToContinue: true },
    );
    c3po.rest();
    await speak(
      <>
        You're my only hope, <span style={{ color: "red" }}>Sylvan</span>!
      </>,
      { tapToContinue: true },
    );
  }
};
