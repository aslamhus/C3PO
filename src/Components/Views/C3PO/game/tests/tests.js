import React from "react";
const speed = 0;

export const testBinaryKeyboard = async ({ state, actions, control }) => {
  const { message } = state;
  const { showBinary, guessChar } = actions;
  await testC3POAnimations({ state, actions, control });
  control.toggleControls(true);
  control.toggleKeypad(true, { onPressChar: guessChar });
};

export const testC3POAnimations = async ({ state, actions, control }) => {
  const { current: c3po } = state.c3poAnimateRef;

  await c3po.animate(c3po.body, { rotate: 0, duration: 0.5 * speed });

  await actions.showC3PO();

  // c3po.animate(c3po.body, {
  //   rotate: "+30deg",
  //   x: "-70%",
  //   duration: 1.5,
  // });
  await c3po.animate(c3po.body, { rotate: 0, duration: 0.5 * speed });

  await c3po.walk(-40, { steps: 9, duration: 3 * speed });

  await c3po.proposeIdea();
  await c3po.stop();
  await c3po.rest();
  c3po.think();
  return;
};

export const testSpeechBubbleAndKeypadToggle = async ({
  state,
  actions,
  control,
  stage,
}) => {
  const { speak, askQuestion, dismissSpeechBubble } = actions;
  const { current: c3po } = state.c3poAnimateRef;

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
};
