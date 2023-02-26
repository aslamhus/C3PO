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
    x: '-80%',
    duration: 1.5,
  });
  c3po.wave();
  speak('Wazzzzzup');
};

export const exitStageLeft = async (c3po) => {
  return c3po.animate(c3po.body, { x: '-100%', duration: 0, y: '0' });
};
