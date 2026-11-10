import { wait } from "@utils/global-game-actions";

export const peekAbooEntrance = async (c3po, speak, showTapTip) => {
  await c3po.animate(c3po.body, {
    rotate: "+30deg",
    x: "-70%",
    duration: 1.5,
  });
  setTimeout(showTapTip, 1000);
  await speak("Oh, I say!");

  await wait(0);
};
