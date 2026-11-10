import gsap from "gsap";

export const createProposeIdeaTimeline = (bodyParts) => {
  const { leftShoulder, rightShoulder } = bodyParts;
  const proposeTl = gsap.timeline({
    onComplete: () => {
      resolve(true);
    },
  });
  // reset values
  proposeTl.set(rightShoulder.joint, { scaleY: 1 });
  //timelines
  proposeTl.to(
    leftShoulder.joint,
    { scaleY: -1, rotate: "10deg", duration: 0.1 },
    0,
  );
  proposeTl.to(leftShoulder.arm, { rotate: "-20deg", scale: 0.9, duration }, 0);
  proposeTl.to(
    leftShoulder.forearm,
    { scaleX: 1, scale: 0.9, rotate: "20deg", duration },
    0,
  );
  proposeTl.addLabel("leftShouldEnd", ">");
  proposeTl.to(rightShoulder.joint, { rotate: "-20deg" }, 0);
  proposeTl.to(rightShoulder.arm, { rotate: "3deg", x: "0px", scale: 1.2 }, 0);
  proposeTl.to(
    rightShoulder.forearm,
    { rotate: "70deg", x: "-10px", y: "-10px" },
    0,
  );
  proposeTl.to(rightShoulder.hand, { scale: 0.8, x: "5px" }, 0);
  proposeTl.addLabel("raiseArm", ">");
  /** head scratch */

  proposeTl.play();
  return proposeTl;
};
