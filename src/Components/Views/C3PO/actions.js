import React from 'react';
export const speed = 0;

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

export const peekAbooEntrance = async (c3po, speak, showTapTip) => {
  await c3po.animate(c3po.body, {
    rotate: '+30deg',
    x: '-70%',
    duration: 1.5,
  });
  setTimeout(showTapTip, 1000);
  await speak(<>Oh I say!</>);

  await wait(0);
};

export const questionIdentity = async (
  c3po,
  toggleControls,
  speak,
  askQuestion,
  dismissSpeechBubble
) => {
  c3po.wave();
  const response = await askQuestion({
    question: (
      <>
        is that you, <span style={{ color: 'red' }}>Sylvan?</span>
      </>
    ),
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
  await c3po.animate(c3po.body, { rotate: 0, duration: 0.5 * speed });

  await c3po.walk(-40, { steps: 9, duration: 3 * speed });
  // look around?
  await speak(
    <>
      <span style={{ color: 'red' }}>Sylvan</span>, I need your help to decode a message from{' '}
      <span style={{ color: 'red' }}>Aslam Chacha</span>
    </>
  );
  await speak(
    <>
      Normally, I ask <span style={{ color: 'blue' }}>R2D2</span> to help me decode....
    </>
  );

  await speak(
    "But I can't find him anywhere! Oh where has that troublesome rustbucket gone to now...."
  );
  await dismissSpeechBubble();
  await c3po.proposeIdea();
  const response = await askQuestion({
    question: (
      <>
        <span style={{ color: 'red' }}>Sylvan</span>, will you help me decode the message?
      </>
    ),
    responses: [
      { title: 'Okay', value: 'Okay' },
      { title: 'No', value: 'No' },
    ],
  });
  if (response == 'Okay') {
    c3po.stop();
    c3po.rest();
    await speak('Fantastic!');
    await speak(
      <>
        The code is written in '<span style={{ color: 'green', fontStyle: 'italic' }}>binary</span>
        ', which is how computers talk to each other.
      </>,
      { tapToContinue: true }
    );
    await speak('Here is the secret message!', { tapToContinue: true });
    await showBinary();
    // await wait(2 * speed);
    c3po.think();
    await speak(
      <>
        My circuits are all full of sand from walking around{' '}
        <span style={{ color: 'gold' }}>Tattooine</span>.
      </>
    );
    await speak(
      <>
        I don't know how long my <span className="battery">battery</span> will last!
      </>
    );
    // await wait(1 * speed);
    await speak(
      <>
        Help me decode the message by <span style={{ color: 'green' }}>guessing the letters!</span>{' '}
      </>,
      { tapToContinue: true }
    );
    return speak(
      <>
        You're my only hope, <span style={{ color: 'red' }}>Sylvan</span>!
      </>,
      { tapToContinue: false }
    );
  }
};

export const wait = (duration) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration * 1000 * speed);
  });
};

export const exitStageLeft = async (c3po, duration = 0) => {
  return c3po.animate(c3po.body, { x: '-100%', y: '0', rotate: '0deg', duration });
};
