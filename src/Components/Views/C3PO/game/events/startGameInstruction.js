import React from "react";
import { speed } from "@config";
import { wait } from "@utils/global-game-actions";

export const startGameInstruction = async ({
  c3po,
  speak,
  askQuestion,
  dismissSpeechBubble,
  showBinary,
  showKeypad,
  player,
  skippable,
  handleGameOver,
}) => {
  console.log(c3po.mainTimeline.timeline);
  await skippable(
    c3po.animate(c3po.body, { rotate: 0, duration: 0.5 * speed }),
  );
  await skippable(
    c3po.animate(c3po.bodyParts.rightShoulder.arm, { rotate: "20deg" }),
  );
  await c3po.walkTo(20, { steps: 9, duration: 3 * speed });
  // look around?
  let yas = "Princess Yasmine";
  if (player.getName() === "SYLVAN" || player.getName() === "DEXTER") {
    yas = "Yasmine Chachi";
  }
  await skippable(
    speak(
      <>
        <span style={{ color: "red" }}>{player?.name}</span>, I need your help
        to decode a message from <span style={{ color: "red" }}>{yas}</span>
      </>,
    ),
  );
  await skippable(
    speak(
      <>
        Normally, I'd ask <span className="R2D2-key-word">R2D2</span> for help.
      </>,
    ),
  );

  await skippable(speak("But I can't find him anywhere!"));
  await skippable(
    speak("Oh, where has that troublesome rustbucket got to now!?"),
  );

  await skippable(dismissSpeechBubble());
  await skippable(c3po.proposeIdea());
  const response = await skippable(
    askQuestion({
      question: (
        <>
          <span className="player">{player.getName()}</span>, will you help me
          decode the message?
        </>
      ),
      responses: [
        { title: "Okay", value: "Okay" },
        { title: "No", value: "No" },
      ],
    }),
  );
  if (response == "Okay") {
    return explainGame({
      c3po,
      speak,
      showBinary,
      showKeypad,
      player,
      skippable,
    });
  }
  await dismay({ c3po, speak });
  return handleGameOver();
};

const dismay = async ({ c3po, speak }) => {
  c3po.reset();
  await c3po.rest(0.5);
  speak("We're doomed...", { tapToContinue: false });
  await wait(3);
  return;
};

const explainGame = async ({
  c3po,
  speak,
  showBinary,
  showKeypad,
  player,
  skippable,
}) => {
  // c3po.stop();
  c3po.rest();
  await skippable(speak("Thank the maker!"));
  await skippable(showBinary());
  await skippable(
    speak(
      <>
        The code is written in{" "}
        <span style={{ color: "green", fontStyle: "italic" }}>binary</span>.
      </>,
      { tapToContinue: true },
    ),
  );

  skippable(c3po.removeSand());

  await skippable(
    speak(
      <>
        Oh! My circuits are full of sand from walking around{" "}
        <span style={{ className: "tatooine" }}>Tatooine</span>!
      </>,
      { tapToContinue: true },
    ),
  );
  await skippable(
    speak(
      <>
        It seems my <span className="battery">battery</span> won't last much
        longer!
      </>,
      { tapToContinue: true },
    ),
  );
  // remove sand now

  await skippable(c3po.fret());
  // await wait(1 * speed);

  c3po.breathe();
  await skippable(
    speak(
      <>
        Please help me decode the message before my{" "}
        <span className="battery">battery</span> runs out!
      </>,
    ),
  );
  await showKeypad();
  c3po.look("right");
  await skippable(
    speak(
      <>
        We can decode the message by{" "}
        <span style={{ color: "green" }}>guessing the letters!</span>{" "}
      </>,
      { tapToContinue: true },
    ),
  );
  c3po.rest();
  c3po.look("straight");
  await skippable(
    speak(
      <>
        You're my only hope, <span className="player">{player.getName()}</span>!
      </>,
      { tapToContinue: true },
    ),
  );

  return c3po.rest();
};
