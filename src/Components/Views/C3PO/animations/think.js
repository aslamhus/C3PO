import gsap from "gsap";
export const createThinkTimeline = (bodyParts) => {
  const { leftShoulder, rightShoulder } = bodyParts;
  const thinkTimeline = gsap.timeline();
  thinkTimeline.set(leftShoulder.joint, { x: 0, y: 0, rotate: "0deg" });
  thinkTimeline.to(leftShoulder.joint, { rotate: "5deg", duration: 0.1 }, 0);
  thinkTimeline.to(
    leftShoulder.arm,
    { rotate: "-20deg", y: "-12px", scale: 0.9, duration },
    0,
  );

  thinkTimeline.to(
    leftShoulder.mainArm,
    { scale: 1, x: "-10px", y: "-20px", duration: 0 },
    0,
  );

  thinkTimeline.to(
    leftShoulder.forearm,
    { scale: 0.9, scale: 1, rotate: "20deg", duration: 0 },
    0,
  );
  thinkTimeline.addLabel("leftShouldEnd", ">");
  thinkTimeline.to(rightShoulder.joint, { rotate: "-30deg" }, 0);
  /** RIGHT FOREARM CHANGE */
  thinkTimeline.to(
    rightShoulder.forearm,
    { left: "42%", bottom: "-8%", x: "-10px", y: "-5px" },
    0,
  );
  thinkTimeline.to(rightShoulder.mainArm, { rotate: "21deg" }, 0);

  thinkTimeline.to(
    rightShoulder.arm,
    { rotate: "-50deg", x: "20px", scale: 1.2 },
    0,
  );
  thinkTimeline.to(
    rightShoulder.mainArm,
    { rotate: "30deg", y: "-10px", x: "-15px" },
    0,
  );
  thinkTimeline.to(rightShoulder.forearm, { rotate: "50deg" }, 0);
  thinkTimeline.to(rightShoulder.hand, { scale: 0.8, x: "5px", y: "5px" }, 0);
  thinkTimeline.addLabel("raiseArm", ">");
  /** head scratch */
  const headScratchTimeline = gsap.timeline({ yoyo: true, repeat: -1 }, 0);
  headScratchTimeline.to(
    rightShoulder.forearm,
    { rotation: "+=1", duration: 0.5 },
    0,
  );
  headScratchTimeline.to(
    rightShoulder.hand,
    { rotation: "+=2", duration: 0.5 },
    0,
  );
  headScratchTimeline.to(
    rightShoulder.forearm,
    { rotation: "-=1", duration: 0.5 },
    0.5,
  );
  headScratchTimeline.to(
    rightShoulder.hand,
    { rotation: "-=2", duration: 0.5 },
    0.5,
  );
  headScratchTimeline.to(rightShoulder.hand, { opacity: 1, duration: 2 });
  thinkTimeline.add(headScratchTimeline, "raiseArm");
  return thinkTimeline;
};
