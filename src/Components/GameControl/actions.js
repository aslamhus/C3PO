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

export const peekAbooEntrance = async (c3poAnimateRef, speak) => {
  const { current: c3po } = c3poAnimateRef;
  c3po.wave();
  await c3po.animate(c3po.bodyParts.head.head, {
    rotate: '30deg',
    x: '+20px',
    duration: 5,
  });
  speak('Wazzzzzup');
};
