export const peekAbooEntrance = async (c3po, speak, skippable) => {
  await skippable(
    c3po.animate(c3po.body, {
      rotate: "+30deg",
      x: "-70%",
      duration: 1.5,
    }),
  );
  // setTimeout(showTapTip, 1000);
  return skippable(speak("Oh, I say!"));
};
