const speed = 0;
const testAction = () => {
  setTimeout(() => {
    setTimeout(() => {
      toggleControls(true);
      setTimeout(() => toggleViewScreen(true), 500);
    }, 1500);
    askQuestion({
      question:
        'Serioiusy long message here. Can you help me figure out the CSS? Thanks! I really appreciate it.',
      responses: [
        { title: 'Yes', value: true },
        { title: 'No', value: false },
      ],
      promptDelay: 2.2,
    }).then(handleResponse);
  }, 2000);
};

export const peekAbooEntrance = async (c3po, speak) => {
  await c3po.animate(c3po.body, {
    rotate: '+30deg',
    x: '-70%',
    duration: 1.5,
  });
  await speak('Oh I say! ');
  await wait(0);
};

export const questionIdentity = async (
  c3po,
  toggleControls,
  speak,
  askQuestion,
  dismissSpeechBubble
) => {
  setTimeout(() => {
    toggleControls(true);
  }, 2500);
  c3po.wave();
  const response = await askQuestion({
    question: `is that you, <span style="color:red">Sylvan?</span>`,
    responses: [
      { title: 'Yes', value: 'Yes' },
      { title: 'No', value: 'No' },
    ],
  });
  if (response == 'Yes') {
    await c3po.rest();
    return true;
  } else {
    speak('Oh... Sorry to have disturbed you.');
    await wait(2 * speed);
    dismissSpeechBubble();
    await exitStageLeft(c3po, 3);
  }
  return false;
};

export const startGameInstruction = async (
  c3po,
  gameStage,
  speak,
  askQuestion,
  dismissSpeechBubble,
  showBinary
) => {
  await c3po.animate(c3po.body, { rotate: 0, duration: 0.5 });
  await c3po.walk(-20, { steps: 9, duration: 3 });
  // look around?
  await speak(
    "<span style='color:red;'>Sylvan</span>, I need your help to decode a message from <span style='color:red; '>Aslam Chacha</span>.",
    { wait: 3 * speed }
  );
  await speak("Normally, I ask <span style='color:blue;'>R2D2</span> to help me decode....", {
    wait: 3 * speed,
  });

  await speak(
    "But I can't find him anywhere! Oh where has that troublesome rustbucket gone to now....",
    { wait: 5 * speed }
  );
  await dismissSpeechBubble();
  await c3po.proposeIdea();
  const response = await askQuestion({
    question: "<span style='color:red;'>Sylvan</span>, will you help me decode the message?",
    responses: [
      { title: 'Okay', value: 'Okay' },
      { title: 'No', value: 'No' },
    ],
  });
  if (response == 'Okay') {
    c3po.stop();
    c3po.rest();
    await speak('Fantastic!', { wait: 2 * speed });
    await speak(
      "It's written in <span style='color:green; font-style:italic'>binary</span>, otherwise known as computer language.",
      { wait: 3 * speed }
    );
    await showBinary();
    await wait(2 * speed);
    await dismissSpeechBubble();
    await wait(1 * speed);
    await speak(
      "My circuits are all full of sand from walking around <span style='color:gold; font-style:italic'>Tattooine</span>, so my processor is a bit slow."
    );

    c3po.think();
    await wait(6 * speed);
    return speak(
      "Help me decode the message by <span style='color:green; font-style:italic'>guessing the letters!</span> You're my only hope, <span style='color:red;'>Sylvan</span>!"
    );
  }
};

export const wait = (duration) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration * 1000);
  });
};

export const exitStageLeft = async (c3po, duration = 0) => {
  return c3po.animate(c3po.body, { x: '-100%', y: '0', rotate: '0deg', duration });
};
