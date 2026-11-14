export const exitStageLeft = async (c3po, duration = 0) => {
  return c3po.animate(c3po.body, {
    x: "-100%",
    y: "0",
    rotate: "0deg",
    duration,
    onComplete: () => {
      console.info("exit stage left complete");
    },
  });
};
